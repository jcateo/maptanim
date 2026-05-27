import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { LayoutDashboard, Globe, Users, TrendingUp, Cpu, Leaf } from 'lucide-react';

export default function Ecosystem() {
  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto h-[calc(100vh-80px)] flex flex-col font-inter">
        
        <div className="mb-6 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <LayoutDashboard className="w-6 h-6 text-brand-500" />
              Unified Ecosystem
            </h1>
            <p className="text-sm text-gray-500 mt-1">The culmination of all 15 MapTanim phases in one master view.</p>
          </div>
          <div className="bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1.5 rounded-full border border-brand-100">
            Phase 15: Final Milestone
          </div>
        </div>

        <div className="flex-1 bg-white border border-gray-200 rounded-xl p-8 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden">
          
          <div className="absolute inset-0 opacity-5" 
            style={{ 
              backgroundImage: 'radial-gradient(#22c55e 2px, transparent 2px)', 
              backgroundSize: '30px 30px' 
            }}
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-gradient-to-br from-brand-400 to-brand-600 rounded-3xl flex items-center justify-center shadow-lg shadow-brand-200 mx-auto mb-6">
              <Leaf className="w-12 h-12 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">MapTanim Ecosystem</h2>
            <p className="text-base text-gray-600 leading-relaxed mb-8">
              This master dashboard will synthesize data from all modules: Farm Monitoring, Community Forums, Regional Analytics, Rule Engine Scoring, and Land Equivalent Ratio (LER) Simulations into a single, comprehensive command center.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
              <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
                <Globe className="w-6 h-6 text-sky-500 mb-2" />
                <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Geospatial</h3>
                <p className="text-[10px] text-gray-500 mt-1">Global & Local mapping integration</p>
              </div>
              <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
                <Users className="w-6 h-6 text-earth-500 mb-2" />
                <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Social</h3>
                <p className="text-[10px] text-gray-500 mt-1">Cross-role collaborative networks</p>
              </div>
              <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
                <TrendingUp className="w-6 h-6 text-amber-500 mb-2" />
                <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Economics</h3>
                <p className="text-[10px] text-gray-500 mt-1">Platform-wide yield & market analysis</p>
              </div>
              <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
                <Cpu className="w-6 h-6 text-indigo-500 mb-2" />
                <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Rule Engine</h3>
                <p className="text-[10px] text-gray-500 mt-1">Scientific crop compatibility scoring</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
