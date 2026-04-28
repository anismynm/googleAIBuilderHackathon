import React, { useState, useEffect } from 'react';
import { Sparkles, ShoppingBag, Activity } from 'lucide-react';

interface Props {
  onExit: () => void;
}

export const ExploreVideoPlayer: React.FC<Props> = ({ onExit }) => {
  // Q1. UX: 로딩 상태 관리
  const [isGenerating, setIsGenerating] = useState(true);
  // Q2. BM: T-Commerce 상태
  const [showCommerce, setShowCommerce] = useState(false);

  useEffect(() => {
    // 시나리오 시뮬레이션 타이머
    
    // 1. 로딩 완료 (2초 후)
    const t1 = setTimeout(() => setIsGenerating(false), 2000);
    
    // 2. 자연스러운 T-Commerce 노출 (4초 후)
    const t2 = setTimeout(() => setShowCommerce(true), 4000);

    return () => {
      clearTimeout(t1); clearTimeout(t2);
    };
  }, []);

  return (
    <div className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden">
      
      {/* Q1. UX: 화면 전환 및 로딩 UI (Genie 3 생성 중) */}
      {isGenerating && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black">
          {/* 3D Wireframe / Scanning Effect */}
          <div className="relative w-64 h-64 mb-8">
            <div className="absolute inset-0 border-2 border-blue-500/30 rounded-full animate-[spin_4s_linear_infinite]" />
            <div className="absolute inset-4 border-2 border-purple-500/40 rounded-full animate-[spin_3s_linear_infinite_reverse]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles size={48} className="text-blue-400 animate-pulse" />
            </div>
            {/* Scanning line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.8)] animate-[scan_2s_ease-in-out_infinite]" 
                 style={{ animationName: 'scan', animationDuration: '2s', animationIterationCount: 'infinite' }} />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-widest mb-2">공간 확장 중...</h2>
          <p className="text-blue-400 font-mono text-sm">Genie 3 Auto-regressive Generation</p>
          <div className="w-48 h-1 bg-gray-800 rounded-full mt-6 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 animate-[progress_2s_ease-in-out_forwards]" style={{ width: '100%' }} />
          </div>
        </div>
      )}

      {/* Main Video Content (Placeholder for travel video) */}
      <video 
        autoPlay 
        loop 
        muted 
        className={`w-full h-full object-cover transition-all duration-1000 ${isGenerating ? 'scale-110 blur-md opacity-50' : 'scale-100 blur-0 opacity-100'}`}
      >
        <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" type="video/mp4" />
      </video>
      
      {/* Top Left: Status Indicator */}
      <div className={`absolute top-10 left-10 flex flex-col gap-2 transition-opacity duration-500 ${isGenerating ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-white font-medium tracking-wide">AI WORLD EXPLORATION</span>
        </div>
      </div>

      {/* Q3. B2B Demo: 실시간 지표 오버레이 (투자자/넷플릭스 피칭용) */}
      <div className={`absolute bottom-10 left-10 bg-black/70 backdrop-blur-md border border-green-500/30 p-4 rounded-xl font-mono text-xs text-green-400 z-40 transition-opacity duration-500 ${isGenerating ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex items-center gap-2 mb-2 border-b border-green-500/30 pb-2">
          <Activity size={14} />
          <span className="font-bold text-white">B2B DEMO METRICS</span>
        </div>
        <div className="space-y-1">
          <p className="flex justify-between gap-4"><span>Avg. Session Time:</span> <span className="text-white">+142 sec</span></p>
          <p className="flex justify-between gap-4"><span>Genie 3 Latency:</span> <span className="text-white">1.12s (NPU)</span></p>
          <p className="flex justify-between gap-4"><span>Commerce Intent:</span> <span className="text-white">High (24%)</span></p>
        </div>
      </div>

      {/* Q2. BM: T-Commerce UI (몰입을 방해하지 않는 우측 슬라이드 패널) */}
      <div className={`absolute right-10 top-1/2 -translate-y-1/2 w-72 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl transition-all duration-700 transform ${showCommerce ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0 pointer-events-none'}`}>
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
        <p className="text-gray-400 text-sm mt-1">빠니보틀이 인도에서 직접 멘 그 가방</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-white">₩129,000</span>
          <button className="bg-white text-black px-4 py-2 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors">
            리모컨으로 구매
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
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};
