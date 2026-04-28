import React, { useState, useEffect, useCallback } from 'react';
import { Position, SceneData, InteractiveObject } from '../types';
import { AgentOverlay } from './AgentOverlay';
import { MOCK_SCENE } from '../constants';

interface Props {
  pan: Position;
  isGenerating: boolean;
}

export const ExplorationView: React.FC<Props> = ({ pan, isGenerating }) => {
  const [activeObject, setActiveObject] = useState<InteractiveObject | null>(null);

  // Simulate finding objects based on camera center
  useEffect(() => {
    // Very rough simulation: if pan is near a certain area, show an object
    // In a real app, this would be based on 3D raycasting or screen-space coordinates
    const normalizedPanX = pan.x / 800; // -1 to 1 roughly
    const normalizedPanY = pan.y / 800;

    let found = null;
    
    // Mock logic to trigger objects based on pan position
    if (normalizedPanX < -0.3 && normalizedPanY > 0.2) {
      found = MOCK_SCENE.objects.find(o => o.id === 'obj-1') || null; // Driftwood
    } else if (normalizedPanX > 0.2 && normalizedPanX < 0.5 && Math.abs(normalizedPanY) < 0.2) {
      found = MOCK_SCENE.objects.find(o => o.id === 'obj-2') || null; // Jacket
    } else if (normalizedPanX > 0.6 && normalizedPanY < -0.2) {
      found = MOCK_SCENE.objects.find(o => o.id === 'obj-3') || null; // Lighthouse
    }

    setActiveObject(found);
  }, [pan]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {/* The "World" - scaled up to allow panning */}
      <div 
        className="absolute inset-[-50%] w-[200%] h-[200%] transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(1.2)`,
          backgroundImage: `url(${MOCK_SCENE.baseImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Mock Hotspots in the world */}
        {MOCK_SCENE.objects.map((obj) => (
          <div 
            key={obj.id}
            className="absolute w-32 h-32 rounded-full border-2 border-white/30 bg-white/5 flex items-center justify-center"
            style={{
              left: `${obj.x}%`,
              top: `${obj.y}%`,
              transform: 'translate(-50%, -50%)',
              boxShadow: activeObject?.id === obj.id ? '0 0 30px rgba(255,255,255,0.5)' : 'none',
              transition: 'box-shadow 0.3s ease'
            }}
          >
            {activeObject?.id === obj.id && (
              <div className="w-4 h-4 bg-white rounded-full animate-ping" />
            )}
          </div>
        ))}
      </div>

      {/* AI Generation Visual Effects */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${isGenerating ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Edge blur to simulate generating new areas */}
        <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />
        {/* Scanlines */}
        <div className="absolute inset-0 scanlines opacity-30" />
        {/* Noise overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20 mix-blend-overlay" />
      </div>

      {/* UI Overlays */}
      <div className="absolute top-10 left-10 flex flex-col gap-2">
        <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-white font-medium tracking-wide">EXPLORATION MODE</span>
        </div>
        
        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5 w-fit">
          <span className="text-xs text-gray-300">Powered by</span>
          <span className="text-sm font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Genie 3</span>
          <span className="text-xs text-gray-400 mx-1">×</span>
          <span className="text-sm font-bold text-green-400">RealWonder</span>
        </div>
      </div>

      {/* Generating Status Indicator */}
      <div className={`absolute top-10 right-1/2 transform translate-x-1/2 transition-all duration-300 ${isGenerating ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div className="bg-blue-500/20 border border-blue-500/50 text-blue-300 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 backdrop-blur-md">
          <svg className="animate-spin h-4 w-4 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Auto-regressive World Generation...
        </div>
      </div>

      <AgentOverlay activeObject={activeObject} />
    </div>
  );
};
