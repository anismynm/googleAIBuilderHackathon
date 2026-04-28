import React from 'react';
import { Sparkles, ShoppingBag, Info, Activity } from 'lucide-react';
import { InteractiveObject } from '../types';

interface Props {
  activeObject: InteractiveObject | null;
}

export const AgentOverlay: React.FC<Props> = ({ activeObject }) => {
  if (!activeObject) return null;

  const getIcon = () => {
    switch (activeObject.type) {
      case 'commerce': return <ShoppingBag className="text-pink-400" size={24} />;
      case 'physics': return <Activity className="text-green-400" size={24} />;
      default: return <Info className="text-blue-400" size={24} />;
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-20 bg-black/80 border border-white/20 rounded-xl p-4 w-80 backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-white/10 rounded-lg">
          {getIcon()}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={14} className="text-blue-400" />
            <span className="text-xs text-blue-400 font-semibold tracking-wider uppercase">Gemini Agent</span>
          </div>
          <h3 className="text-lg font-bold text-white leading-tight">{activeObject.label}</h3>
          <p className="text-sm text-gray-300 mt-1">{activeObject.description}</p>
          
          {activeObject.price && (
            <div className="mt-3 pt-3 border-t border-white/10 flex justify-between items-center">
              <span className="text-xl font-bold text-white">{activeObject.price}</span>
              <button className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors">
                Buy Now
              </button>
            </div>
          )}
          
          {activeObject.type === 'physics' && (
            <div className="mt-3 pt-3 border-t border-white/10">
               <p className="text-xs text-green-400 flex items-center gap-1">
                 <Activity size={12} /> RealWonder Physics Active
               </p>
               <p className="text-xs text-gray-400 mt-1">Press OK to interact</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
