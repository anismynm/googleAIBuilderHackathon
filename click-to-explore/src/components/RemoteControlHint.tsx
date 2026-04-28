import React from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { AppMode } from '../types';

interface Props {
  activeKey: string | null;
  mode: AppMode;
}

export const RemoteControlHint: React.FC<Props> = ({ activeKey, mode }) => {
  const getKeyClass = (keyName: string) => {
    const base = "flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200";
    const isActive = activeKey === keyName;
    if (isActive) return `${base} bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.8)]`;
    return `${base} bg-gray-800/80 text-gray-400 border border-gray-600`;
  };

  let hintText = "";
  let hintSubText = "";

  switch (mode) {
    case AppMode.HOME:
      hintText = "Select Content";
      hintSubText = "Press OK to play";
      break;
    case AppMode.WATCHING:
      hintText = "SceneExplore";
      hintSubText = "Press OK when prompted";
      break;
    case AppMode.EXPLORING:
      hintText = "Exploration";
      hintSubText = "Press OK to exit";
      break;
  }

  return (
    <div className="absolute bottom-10 right-10 flex flex-col items-center gap-4 bg-black/60 p-6 rounded-3xl backdrop-blur-md border border-white/10 z-50">
      <div className="text-center mb-2">
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
          {hintText}
        </p>
        <p className="text-sm text-white font-medium">
          {hintSubText}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div />
        <div className={getKeyClass('ArrowUp')}><ArrowUp size={20} /></div>
        <div />
        
        <div className={getKeyClass('ArrowLeft')}><ArrowLeft size={20} /></div>
        <div className={getKeyClass('Enter')}>
          <span className="text-[10px] font-bold">OK</span>
        </div>
        <div className={getKeyClass('ArrowRight')}><ArrowRight size={20} /></div>
        
        <div />
        <div className={getKeyClass('ArrowDown')}><ArrowDown size={20} /></div>
        <div />
      </div>
    </div>
  );
};
