import React, { useState, useEffect, useCallback } from 'react';
import { AppMode } from './types';
import { HomeMenu } from './components/HomeMenu';
import { VideoPlayer } from './components/VideoPlayer';
import { ExploreVideoPlayer } from './components/ExploreVideoPlayer';
import { CreatorDashboard } from './components/CreatorDashboard';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.HOME);
  const [activeContent, setActiveContent] = useState<'panibottle' | 'harrypotter'>('panibottle');

  // 실제 리모컨 입력을 처리하기 위한 키보드 이벤트 리스너
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const key = e.key;
    
    // B2B 데모용 숨겨진 단축키: 'd'를 누르면 제작사 대시보드로 이동
    if (key === 'd' || key === 'D') {
      setMode(prev => prev === AppMode.DASHBOARD ? AppMode.HOME : AppMode.DASHBOARD);
      return;
    }

    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'Escape'].includes(key)) {
      return;
    }

    e.preventDefault();

    if (key === 'Enter') {
      if (mode === AppMode.HOME) {
        setMode(AppMode.WATCHING);
      } else if (mode === AppMode.WATCHING) {
        setMode(AppMode.EXPLORING);
      } else if (mode === AppMode.EXPLORING) {
        // 탐험 모드에서 Enter(OK)를 누르면 시청 모드로 복귀
        setMode(AppMode.WATCHING);
      }
    } else if (key === 'Escape') {
      if (mode === AppMode.EXPLORING) setMode(AppMode.WATCHING);
      else if (mode === AppMode.WATCHING) setMode(AppMode.HOME);
      else if (mode === AppMode.DASHBOARD) setMode(AppMode.HOME);
    }
  }, [mode]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden font-sans select-none">
      
      {/* State Machine Rendering */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${mode === AppMode.HOME ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
        {mode === AppMode.HOME && <HomeMenu onSelect={(contentId) => { setActiveContent(contentId); setMode(AppMode.WATCHING); }} />}
      </div>

      <div className={`absolute inset-0 transition-opacity duration-500 ${mode === AppMode.WATCHING ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
        <VideoPlayer isActive={mode === AppMode.WATCHING} onExploreClick={() => setMode(AppMode.EXPLORING)} activeContent={activeContent} />
      </div>

      <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${mode === AppMode.EXPLORING ? 'opacity-100 z-20' : 'opacity-0 z-0 pointer-events-none'}`}>
        {mode === AppMode.EXPLORING && <ExploreVideoPlayer onExit={() => setMode(AppMode.WATCHING)} activeContent={activeContent} />}
      </div>

      <div className={`absolute inset-0 transition-opacity duration-500 ${mode === AppMode.DASHBOARD ? 'opacity-100 z-30' : 'opacity-0 z-0 pointer-events-none'}`}>
        {mode === AppMode.DASHBOARD && <CreatorDashboard onClose={() => setMode(AppMode.HOME)} />}
      </div>

      {/* B2B Demo Hint */}
      {mode === AppMode.HOME && (
        <div className="absolute bottom-4 left-4 text-gray-600 text-xs font-mono">
          Press 'D' for B2B Creator Dashboard
        </div>
      )}
    </div>
  );
};

export default App;
