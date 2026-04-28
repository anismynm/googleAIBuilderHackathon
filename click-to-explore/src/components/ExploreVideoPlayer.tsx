import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ShoppingBag, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface Props {
  onExit: () => void;
  activeContent: 'panibottle' | 'harrypotter';
}

export const ExploreVideoPlayer: React.FC<Props> = ({ onExit, activeContent }) => {
  const [transitionState, setTransitionState] = useState<'entering' | 'ready'>('entering');
  const [showCommerce, setShowCommerce] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeDirections, setActiveDirections] = useState<('up' | 'down' | 'left' | 'right')[]>([]);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  // 로딩 화면 대신 2D -> 3D 전환 연출 (1.5초)
  useEffect(() => {
    const t = setTimeout(() => {
      setTransitionState('ready');
      if (videoRef.current) {
        videoRef.current.play().catch(e => console.error("Auto-play prevented:", e));
      }
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  // 커머스 팝업 타이머 및 자동 D-pad 애니메이션
  useEffect(() => {
    if (transitionState !== 'ready') return;
    
    const interval = setInterval(() => {
      if (videoRef.current) {
        const currentTime = videoRef.current.currentTime;
        
        // 4초가 지나면 팝업 표시
        if (currentTime >= 0 && !showCommerce) {
          setShowCommerce(true);
        }

        // 영상 타임라인에 맞춘 자동 방향키 모션 (가상의 시나리오)
        const newDirs: ('up' | 'down' | 'left' | 'right')[] = [];
        if (activeContent === 'panibottle') {
          if (currentTime >= 7 && currentTime <= 11) newDirs.push('right');
          if (currentTime >= 14 && currentTime <= 18) newDirs.push('left');
          if (currentTime >= 21 && currentTime <= 26) newDirs.push('up');
          if (currentTime >= 26 && currentTime <= 27) {
            newDirs.push('up');
            newDirs.push('right');
          }
        }

        setActiveDirections(newDirs);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [transitionState, showCommerce]);

  // 리모컨(키보드) 입력 처리
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (transitionState === 'entering') return;

    if (e.key === 'Enter') {
      if (showCommerce) {
        alert('상품 상세 정보 또는 구매 화면으로 이동합니다!');
      } else {
        if (videoRef.current) {
          if (isPaused) {
            videoRef.current.play();
            setIsPaused(false);
          } else {
            videoRef.current.pause();
            setIsPaused(true);
          }
        }
      }
    }
  }, [transitionState, showCommerce, isPaused]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden">
      
      {/* Main Video Content */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black">
        {/* 로컬 비디오 플레이어 */}
        <video 
          ref={videoRef}
          src={activeContent === 'panibottle' ? "/videos/explore-video.mp4" : "/videos/explore-video3.mp4"}
          className="w-full h-full object-cover"
          autoPlay
          muted={true} // 브라우저 자동 재생 정책을 위해 true로 설정
          onEnded={onExit} // 영상 재생 완료 시 자동 종료
        />
        
        {/* Scanning Effect over Video during transition */}
        {transitionState === 'entering' && (
          <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 shadow-[0_0_30px_rgba(34,211,238,1)] animate-[scan_1.5s_ease-in-out_forwards]" />
        )}
      </div>
      
      {/* Top Left: Status Indicator */}
      <div className={`absolute top-10 left-10 flex flex-col gap-2 transition-opacity duration-1000 delay-500 ${transitionState === 'entering' ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
          <div className={`w-2 h-2 rounded-full ${isPaused ? 'bg-yellow-500' : 'bg-red-500 animate-pulse'}`} />
          <span className="text-white font-medium tracking-wide">
            {isPaused ? 'EXPLORATION PAUSED' : 'AI WORLD EXPLORATION'}
          </span>
        </div>
      </div>

      {/* Top Right: Exit Button */}
      <button 
        onClick={onExit}
        className={`absolute top-10 right-10 flex items-center gap-2 bg-black/60 hover:bg-black/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 transition-all duration-300 z-50 group cursor-pointer ${transitionState === 'entering' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <X size={20} className="text-white group-hover:rotate-90 transition-transform duration-300" />
        <span className="text-white font-bold tracking-wide">탐험 종료</span>
      </button>

      {/* Bottom Left: D-Pad Controller Overlay */}
      <div className={`absolute bottom-12 left-12 flex flex-col items-center gap-1 z-50 transition-opacity duration-1000 delay-500 ${transitionState === 'entering' ? 'opacity-0' : 'opacity-100'}`}>
        <div className="text-white/80 text-xs font-bold mb-2 tracking-widest uppercase bg-black/40 px-2 py-1 rounded">AUTO NAVIGATOR</div>
        
        {/* Up Button */}
        <div className={`w-12 h-12 flex items-center justify-center rounded-lg border-2 transition-all duration-200 ${activeDirections.includes('up') ? 'bg-white text-black border-white scale-90 shadow-[0_0_15px_rgba(255,255,255,0.8)]' : 'bg-black/50 text-white/50 border-white/20 backdrop-blur-md'}`}>
          <ChevronUp size={28} />
        </div>
        
        <div className="flex gap-1">
          {/* Left Button */}
          <div className={`w-12 h-12 flex items-center justify-center rounded-lg border-2 transition-all duration-200 ${activeDirections.includes('left') ? 'bg-white text-black border-white scale-90 shadow-[0_0_15px_rgba(255,255,255,0.8)]' : 'bg-black/50 text-white/50 border-white/20 backdrop-blur-md'}`}>
            <ChevronLeft size={28} />
          </div>
          
          {/* Center OK Button */}
          <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-black/80 border-2 border-white/50 backdrop-blur-md">
            <span className="text-white text-[10px] font-black">OK</span>
          </div>
          
          {/* Right Button */}
          <div className={`w-12 h-12 flex items-center justify-center rounded-lg border-2 transition-all duration-200 ${activeDirections.includes('right') ? 'bg-white text-black border-white scale-90 shadow-[0_0_15px_rgba(255,255,255,0.8)]' : 'bg-black/50 text-white/50 border-white/20 backdrop-blur-md'}`}>
            <ChevronRight size={28} />
          </div>
        </div>
        
        {/* Down Button */}
        <div className={`w-12 h-12 flex items-center justify-center rounded-lg border-2 transition-all duration-200 ${activeDirections.includes('down') ? 'bg-white text-black border-white scale-90 shadow-[0_0_15px_rgba(255,255,255,0.8)]' : 'bg-black/50 text-white/50 border-white/20 backdrop-blur-md'}`}>
          <ChevronDown size={28} />
        </div>
      </div>

      {/* Q2. BM: T-Commerce UI */}
      <div className={`absolute right-10 top-1/2 -translate-y-1/2 w-72 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl transition-all duration-700 transform z-40 ${showCommerce ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0 pointer-events-none'}`}>
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-pink-500 rounded-full animate-ping opacity-50" />
        <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-pink-500 rounded-full shadow-[0_0_10px_#ec4899]" />
        
        <div className="flex items-center gap-2 mb-3 text-pink-400">
          <ShoppingBag size={16} />
          <span className="text-xs font-bold tracking-wider">DISCOVERED ITEM</span>
        </div>
        
        {activeContent === 'panibottle' ? (
          <>
            <div className="w-full h-32 bg-gray-800 rounded-lg mb-4 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=400&auto=format&fit=crop" alt="Travel Backpack" className="w-full h-full object-cover" />
            </div>
            <h4 className="text-white font-bold text-lg leading-tight">시그니처 여행용 배낭</h4>
            <p className="text-gray-400 text-sm mt-1">AI가 감지한 영상 속 추천 아이템</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xl font-bold text-white">₩129,000</span>
              <button className="bg-white text-black px-4 py-2 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors animate-pulse">
                OK 눌러 구매
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="w-full h-32 bg-gray-800 rounded-lg mb-4 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop" alt="Magic Broomstick" className="w-full h-full object-cover" />
            </div>
            <h4 className="text-white font-bold text-lg leading-tight">님부스 2000 빗자루</h4>
            <p className="text-gray-400 text-sm mt-1">AI가 감지한 영상 속 추천 아이템</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xl font-bold text-white">₩350,000</span>
              <button className="bg-white text-black px-4 py-2 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors animate-pulse">
                OK 눌러 구매
              </button>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};
