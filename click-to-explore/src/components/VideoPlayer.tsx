import React, { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { MOCK_SCENE } from '../constants';

interface Props {
  onExploreClick: () => void;
  isActive: boolean;
  activeContent: 'panibottle' | 'harrypotter';
}

export const VideoPlayer: React.FC<Props> = ({ onExploreClick, isActive, activeContent }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [hasExplored, setHasExplored] = useState(false);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeCheckInterval = useRef<NodeJS.Timeout | null>(null);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);

  // Handle pausing when not active, and resuming when returning
  useEffect(() => {
    if (!isActive) {
      if (activeContent === 'panibottle' && playerRef.current && playerRef.current.pauseVideo) {
        playerRef.current.pauseVideo();
      } else if (activeContent === 'harrypotter' && localVideoRef.current) {
        localVideoRef.current.pause();
      }
    } else if (isActive && hasExplored) {
      if (activeContent === 'panibottle' && playerRef.current && playerRef.current.playVideo) {
        playerRef.current.playVideo();
      } else if (activeContent === 'harrypotter' && localVideoRef.current) {
        localVideoRef.current.play();
      }
      setShowPopup(false); // Hide the popup since we already explored
    }
  }, [isActive, hasExplored, activeContent]);

  // Handle Play/Pause/Unmute on Enter key or click
  useEffect(() => {
    const handleInteraction = (e?: KeyboardEvent | MouseEvent) => {
      if (e instanceof KeyboardEvent && e.key !== 'Enter') return;
      if (showPopup) return; // Allow popup to handle its own interaction
      
      if (activeContent === 'panibottle' && playerRef.current && playerRef.current.getPlayerState) {
        const state = playerRef.current.getPlayerState();
        if (state === 1) { // 1 = playing
          playerRef.current.pauseVideo();
        } else {
          playerRef.current.unMute();
          playerRef.current.playVideo();
        }
      } else if (activeContent === 'harrypotter' && localVideoRef.current) {
        if (!localVideoRef.current.paused) {
          localVideoRef.current.pause();
        } else {
          localVideoRef.current.muted = false;
          localVideoRef.current.play();
        }
      }
    };

    window.addEventListener('keydown', handleInteraction);
    return () => window.removeEventListener('keydown', handleInteraction);
  }, [showPopup, activeContent]);

  // Local video time check (for Harry Potter)
  useEffect(() => {
    if (activeContent !== 'harrypotter') return;
    
    const interval = setInterval(() => {
      if (localVideoRef.current && !hasExplored && !showPopup) {
        if (localVideoRef.current.currentTime >= 3) {
          localVideoRef.current.pause();
          setShowPopup(true);
        }
      }
    }, 100);
    return () => clearInterval(interval);
  }, [activeContent, hasExplored, showPopup]);

  // YouTube player init
  useEffect(() => {
    if (activeContent !== 'panibottle') return;

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
      if (!containerRef.current || containerRef.current.tagName === 'IFRAME' || containerRef.current.id !== '') return;
      
      // 렌더링 된 div가 확실한지 식별
      containerRef.current.id = 'yt-player-container';
      
      playerRef.current = new (window as any).YT.Player(containerRef.current, {
        videoId: '6RD1vy0mnvo',
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 1,
          mute: 1, // 브라우저 자동재생 정책 우회를 위해 음소거로 시작
          controls: 0,
          start: 615, // Start at 10:15
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3
        },
        events: {
          onReady: (event: any) => {
            event.target.playVideo();
            
            // Start checking the time to pause at 10:18 (618 seconds)
            timeCheckInterval.current = setInterval(() => {
              if (playerRef.current && playerRef.current.getCurrentTime) {
                const currentTime = playerRef.current.getCurrentTime();
                if (currentTime >= 618) {
                  playerRef.current.pauseVideo();
                  setShowPopup(true);
                  if (timeCheckInterval.current) {
                    clearInterval(timeCheckInterval.current);
                  }
                }
              }
            }, 100);
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

  return (
    <div className="absolute inset-0 bg-black overflow-hidden" onClick={() => {
      if (activeContent === 'panibottle' && playerRef.current && playerRef.current.getPlayerState) {
        const state = playerRef.current.getPlayerState();
        if (state === 1) { // 1 = playing
          playerRef.current.pauseVideo();
        } else {
          playerRef.current.unMute();
          playerRef.current.playVideo();
        }
      } else if (activeContent === 'harrypotter' && localVideoRef.current) {
        if (!localVideoRef.current.paused) {
          localVideoRef.current.pause();
        } else {
          localVideoRef.current.muted = false;
          localVideoRef.current.play();
        }
      }
    }}>
      {/* Video Content */}
      <div className="absolute inset-0">
        <div 
          style={{ 
            display: activeContent === 'panibottle' ? 'block' : 'none', 
            width: '100vw', 
            height: '100vh', 
            transform: 'scale(1.2)', 
            pointerEvents: 'none' 
          }}
        >
          <div ref={containerRef} />
        </div>
        {activeContent === 'harrypotter' && (
          <video 
            ref={localVideoRef}
            src="/videos/explore-video2.mp4"
            className="w-full h-full object-cover"
            autoPlay
            muted={true}
          />
        )}
      </div>
      
      {/* TV UI Overlay */}
      <div className="absolute top-10 left-10 flex items-center gap-4">
        <div className="bg-blue-600 text-white font-bold text-xl px-3 py-1 rounded shadow-lg">
          TV+
        </div>
        <div className="text-white drop-shadow-md">
          <h2 className="text-2xl font-bold">{activeContent === 'panibottle' ? MOCK_SCENE.title : '해리포터와 마법사의 돌'}</h2>
          <p className="text-gray-200">Live Broadcast</p>
        </div>
      </div>

      {/* Grandiose SceneExplore Suggestion Popup */}
      {showPopup && (
        <div 
          className="absolute top-10 right-10 flex items-center gap-4 bg-gradient-to-r from-blue-900/80 via-indigo-900/80 to-purple-900/80 backdrop-blur-xl p-3 pr-6 rounded-full border border-indigo-400/30 shadow-[0_8px_32px_rgba(0,0,0,0.5)] cursor-pointer group hover:bg-indigo-900/90 transition-all duration-300 animate-[slideIn_0.5s_ease-out_forwards]" 
          onClick={() => {
            setHasExplored(true);
            onExploreClick();
          }}
        >
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2.5 rounded-full shadow-lg group-hover:shadow-[0_0_15px_rgba(168,85,247,0.6)] transition-shadow">
            <Sparkles size={20} className="text-white animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-lg leading-tight flex items-center gap-2 drop-shadow-md">
              AI 공간 탐험
              <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full border border-white/30 backdrop-blur-sm tracking-wider">
                GENIE 3
              </span>
            </span>
            <span className="text-gray-300 text-xs mt-0.5 font-medium">
              Press <span className="font-bold text-black bg-white px-1.5 py-0.5 rounded mx-0.5 text-[10px]">OK</span> to start
            </span>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          0% { opacity: 0; transform: translateX(20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

