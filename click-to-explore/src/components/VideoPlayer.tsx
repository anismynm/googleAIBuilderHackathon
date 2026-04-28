import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { MOCK_SCENE } from '../constants';

interface Props {
  onExploreClick: () => void;
}

export const VideoPlayer: React.FC<Props> = ({ onExploreClick }) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Simulate watching the video for 3 seconds, then show suggestion popup
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 bg-black">
      {/* Simulated Video Frame (No longer dims or pauses when popup appears) */}
      <div 
        className="w-full h-full bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${MOCK_SCENE.baseImageUrl})` }}
      />
      
      {/* TV UI Overlay */}
      <div className="absolute top-10 left-10 flex items-center gap-4">
        <div className="bg-blue-600 text-white font-bold text-xl px-3 py-1 rounded">
          TV+
        </div>
        <div className="text-white drop-shadow-md">
          <h2 className="text-2xl font-bold">{MOCK_SCENE.title}</h2>
          <p className="text-gray-200">Live Broadcast</p>
        </div>
      </div>

      {/* SceneExplore Suggestion Popup (Top Right) */}
      {showPopup && (
        <div className="absolute top-10 right-10 flex items-center gap-4 bg-gradient-to-r from-gray-900/90 to-black/90 backdrop-blur-xl p-3 pr-6 rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] animate-in slide-in-from-right-8 fade-in duration-500 cursor-pointer" onClick={onExploreClick}>
          <div className="bg-blue-600 p-3 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]">
            <Sparkles size={20} className="text-white animate-pulse" />
          </div>
          <div className="flex flex-col mr-2">
            <span className="text-white font-bold text-base leading-tight flex items-center gap-2">
              SceneExplore 
              <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30">AI</span>
            </span>
            <span className="text-gray-400 text-sm">Press OK to explore</span>
          </div>
        </div>
      )}
    </div>
  );
};
