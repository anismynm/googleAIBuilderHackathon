import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles, ShoppingBag, Activity } from 'lucide-react';

interface Props {
  onExit: () => void;
}

export const ExploreVideoPlayer: React.FC<Props> = ({ onExit }) => {
  const [transitionState, setTransitionState] = useState<'entering' | 'ready'>('entering');
  const [showCommerce, setShowCommerce] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeCheckInterval = useRef<NodeJS.Timeout | null>(null);

  // 로딩 화면 대신 2D -> 3D 전환 연출 (1.5초)
  useEffect(() => {
    const t = setTimeout(() => {
      setTransitionState('ready');
      if (playerRef.current && playerRef.current.playVideo) {
        playerRef.current.playVideo();
      }
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  // YouTube IFrame API Load & Init
  useEffect(() => {
    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      
      (window as any).onYouTubeIframeAPIReady = initPlayer;
    } else {
      initPlayer();
    }

    function initPlayer() {
      if (!containerRef.current) return;
      
      playerRef.current = new (window as any).YT.Player(containerRef.current, {
        videoId: '6RD1vy0mnvo',
        playerVars: {
          autoplay: 0, // Wait for transition before playing
          controls: 0,
          start: 618, // Resume exactly from 10:18
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3
        },
        events: {
          onReady: (event: any) => {
            // Player ready. We'll wait for the 1.5s timeout to play.
            
            // Check time for commerce popup (e.g. 4 seconds after 10:18 => 622s)
            timeCheckInterval.current = setInterval(() => {
              if (playerRef.current && playerRef.current.getCurrentTime) {
                const currentTime = playerRef.current.getCurrentTime();
                if (currentTime >= 622 && !showCommerce) {
                  setShowCommerce(true);
                }
              }
            }, 500);
          },
        }
      });
    }

    return () => {
      if (timeCheckInterval.current) {
        clearInterval(timeCheckInterval.current);
      }
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, []);

  // 리모컨(키보드) 입력 처리
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (transitionState === 'entering') return; // 전환 연출 중에는 조작 방지

    // Enter(OK)를 눌렀을 때의 동작 시나리오
    if (e.key === 'Enter') {
      if (showCommerce) {
        alert('상품 상세 정보 또는 구매 화면으로 이동합니다!');
      } else {
        if (playerRef.current) {
          if (isPaused) {
            playerRef.current.playVideo();
            setIsPaused(false);
          } else {
            playerRef.current.pauseVideo();
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
      <div className="relative w-full h-full flex items-center justify-center pointer-events-none overflow-hidden">
        {/* YouTube Video iframe Container */}
        <div ref={containerRef} style={{ width: '100vw', height: '100vh', transform: 'scale(1.2)' }} />
        
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



      {/* Q2. BM: T-Commerce UI */}
      <div className={`absolute right-10 top-1/2 -translate-y-1/2 w-72 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl transition-all duration-700 transform z-40 ${showCommerce ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0 pointer-events-none'}`}>
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-pink-500 rounded-full animate-ping opacity-50" />
        <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-pink-500 rounded-full shadow-[0_0_10px_#ec4899]" />
        
        <div className="flex items-center gap-2 mb-3 text-pink-400">
          <ShoppingBag size={16} />
          <span className="text-xs font-bold tracking-wider">DISCOVERED ITEM</span>
        </div>
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
