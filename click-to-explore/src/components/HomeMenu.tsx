import React from 'react';
import { Home, Tv, Film, Search, Settings, User } from 'lucide-react';
import { HOME_POSTERS, MOCK_SCENE } from '../constants';

interface Props {
  onSelect: () => void;
}

export const HomeMenu: React.FC<Props> = ({ onSelect }) => {
  return (
    <div className="absolute inset-0 bg-[#0a0a0a] text-white flex font-sans">
      {/* Sidebar */}
      <div className="w-20 bg-[#141414] border-r border-gray-800 flex flex-col items-center py-8 gap-10 z-10">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-xl shadow-lg">
          TV
        </div>
        <div className="flex flex-col gap-8 text-gray-400 mt-4">
          <Search size={24} className="hover:text-white transition-colors cursor-pointer" />
          <Home size={24} className="text-white cursor-pointer" />
          <Tv size={24} className="hover:text-white transition-colors cursor-pointer" />
          <Film size={24} className="hover:text-white transition-colors cursor-pointer" />
          <User size={24} className="hover:text-white transition-colors cursor-pointer" />
        </div>
        <div className="mt-auto">
          <Settings size={24} className="text-gray-400 hover:text-white transition-colors cursor-pointer" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-10 overflow-hidden relative">
        {/* Hero Banner (Selectable) */}
        <div 
          className="relative w-full h-[55%] rounded-2xl overflow-hidden cursor-pointer group border-4 border-transparent focus:border-blue-500 hover:border-blue-500 transition-all shadow-2xl"
          onClick={onSelect}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url('${MOCK_SCENE.baseImageUrl}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
          
          <div className="absolute bottom-12 left-12 max-w-2xl">
            <div className="bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded mb-4 inline-block">
              TV+ 오리지널 예능
            </div>
            <h1 className="text-5xl font-extrabold mb-4 tracking-tight drop-shadow-lg">
              {MOCK_SCENE.title}
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed drop-shadow-md line-clamp-2">
              구독자 200만 여행 유튜버 빠니보틀과 함께하는 리얼 인도 배낭여행! 혼돈과 낭만이 공존하는 인도 기차 안에서 펼쳐지는 예측불허 에피소드.
            </p>
            <div className="mt-6 flex gap-4">
              <button className="bg-white text-black px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
                <Tv size={20} /> 시청하기 (Press OK)
              </button>
            </div>
          </div>
        </div>

        {/* Content Row */}
        <div className="mt-10 flex-1">
          <h3 className="text-xl font-bold mb-6 text-gray-100">이번 주말은 삼성 TV 플러스와 함께</h3>
          <div className="flex gap-5 overflow-x-hidden pb-4">
            {HOME_POSTERS.map((url, idx) => (
              <div 
                key={idx} 
                className="min-w-[200px] h-[300px] rounded-xl bg-gray-800 overflow-hidden relative group cursor-pointer"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundImage: `url(${url})` }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
