import React from 'react';
import { BarChart3, Users, ShoppingCart, Clock, Map, ArrowLeft } from 'lucide-react';
import { MOCK_SCENE } from '../constants';

interface Props {
  onClose: () => void;
}

export const CreatorDashboard: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="absolute inset-0 bg-[#0f1115] text-white p-8 overflow-hidden flex flex-col font-sans animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <BarChart3 size={20} />
            </div>
            SceneExplore Studio Analytics
          </h1>
          <p className="text-gray-400 mt-1">Content: {MOCK_SCENE.title} (EP.03)</p>
        </div>
        <button onClick={onClose} className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-colors">
          <ArrowLeft size={16} /> Exit Dashboard (ESC)
        </button>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Explorations', value: '2.4M', icon: Users, color: 'text-blue-400' },
          { label: 'Avg. Extra Watch Time', value: '+5m 30s', icon: Clock, color: 'text-green-400' },
          { label: 'T-Commerce Clicks', value: '152.1K', icon: ShoppingCart, color: 'text-pink-400' },
          { label: 'Interaction Rate', value: '42.8%', icon: BarChart3, color: 'text-yellow-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#1a1d24] p-6 rounded-2xl border border-white/5">
            <div className="flex justify-between items-start mb-4">
              <span className="text-gray-400 font-medium">{stat.label}</span>
              <stat.icon size={20} className={stat.color} />
            </div>
            <div className="text-4xl font-bold">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex gap-6 flex-1 min-h-0">
        {/* Left: Heatmap (Where users explore) */}
        <div className="flex-[2] bg-[#1a1d24] rounded-2xl border border-white/5 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2"><Map size={20} className="text-blue-400"/> Exploration Heatmap</h2>
            <select className="bg-black border border-white/10 rounded px-3 py-1 text-sm">
              <option>Scene 08: Train Window View</option>
            </select>
          </div>
          <div className="flex-1 relative rounded-xl overflow-hidden bg-gray-900 border border-white/10">
            <img src={MOCK_SCENE.baseImageUrl} className="w-full h-full object-cover opacity-50" alt="Scene" />
            {/* Fake Heatmap Overlay */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-500/40 blur-2xl rounded-full" />
            <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-yellow-500/40 blur-3xl rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-blue-500/40 blur-xl rounded-full" />
            
            {/* Hotspot Markers */}
            <div className="absolute top-[28%] left-[28%] bg-black/80 text-xs px-2 py-1 rounded border border-red-500/50">Train Window (45%)</div>
            <div className="absolute top-[55%] right-[30%] bg-black/80 text-xs px-2 py-1 rounded border border-yellow-500/50">Backpack (32%)</div>
          </div>
        </div>

        {/* Right: T-Commerce & Engagement Charts */}
        <div className="flex-1 flex flex-col gap-6">
          {/* T-Commerce Performance */}
          <div className="flex-1 bg-[#1a1d24] rounded-2xl border border-white/5 p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><ShoppingCart size={20} className="text-pink-400"/> Top T-Commerce Items</h2>
            <div className="space-y-4">
              {[
                { name: 'Signature Travel Backpack', sales: '₩45.2M', bar: '85%' },
                { name: 'Action Camera Mount', sales: '₩28.4M', bar: '60%' },
                { name: 'India Travel Guidebook', sales: '₩12.1M', bar: '35%' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">{item.name}</span>
                    <span className="font-bold">{item.sales}</span>
                  </div>
                  <div className="w-full h-2 bg-black rounded-full overflow-hidden">
                    <div className="h-full bg-pink-500 rounded-full" style={{ width: item.bar }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Engagement Retention */}
          <div className="flex-1 bg-[#1a1d24] rounded-2xl border border-white/5 p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Clock size={20} className="text-green-400"/> Exploration Retention</h2>
            <div className="flex items-end gap-2 h-32 mt-4">
              {/* Fake Bar Chart */}
              {[100, 85, 70, 65, 50, 45, 30, 25, 15, 10].map((height, i) => (
                <div key={i} className="flex-1 bg-green-500/20 hover:bg-green-500/40 transition-colors rounded-t-sm relative group">
                  <div className="absolute bottom-0 w-full bg-green-500 rounded-t-sm" style={{ height: `${height}%` }} />
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">{height}%</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>0s</span>
              <span>30s</span>
              <span>60s+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
