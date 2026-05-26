import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { ThermometerSun, Droplets, CloudRain, Wind, Sun, Cloud, CloudLightning, Clock } from 'lucide-react';

export default function Monitoring() {
  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto h-full flex flex-col font-inter">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Environmental Monitoring</h1>
          <p className="text-sm text-gray-500 mt-1">Real-time weather and soil conditions for your farm</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
          
          {/* LEFT: CURRENT CONDITIONS */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-semibold text-gray-800">Current Farm Conditions</h2>
                <div className="flex items-center gap-1.5 text-xs font-medium text-brand-600 bg-brand-50 px-3 py-1.5 rounded-full">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                  </span>
                  Live Data
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Temperature */}
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col items-center justify-center text-center">
                  <ThermometerSun className="w-8 h-8 text-red-500 mb-3" />
                  <p className="text-sm font-semibold text-gray-800">Temperature</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">28°C</p>
                  <div className="w-full border-t border-gray-100 mt-4 pt-3 flex items-center justify-center gap-1.5 text-[11px] text-gray-400 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    Last synced 5 mins ago
                  </div>
                </div>

                {/* Humidity */}
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col items-center justify-center text-center">
                  <Wind className="w-8 h-8 text-sky-500 mb-3" />
                  <p className="text-sm font-semibold text-gray-800">Humidity</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">72%</p>
                  <div className="w-full border-t border-gray-100 mt-4 pt-3 flex items-center justify-center gap-1.5 text-[11px] text-gray-400 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    Last synced 5 mins ago
                  </div>
                </div>

                {/* Rainfall */}
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col items-center justify-center text-center">
                  <CloudRain className="w-8 h-8 text-blue-500 mb-3" />
                  <p className="text-sm font-semibold text-gray-800">Rainfall (24h)</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">12 mm</p>
                  <div className="w-full border-t border-gray-100 mt-4 pt-3 flex items-center justify-center gap-1.5 text-[11px] text-gray-400 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    Last synced 5 mins ago
                  </div>
                </div>

                {/* Soil Moisture */}
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col items-center justify-center text-center">
                  <Droplets className="w-8 h-8 text-earth-600 mb-3" />
                  <p className="text-sm font-semibold text-gray-800">Soil Moisture</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">45%</p>
                  <div className="w-full border-t border-gray-100 mt-4 pt-3 flex items-center justify-center gap-1.5 text-[11px] text-gray-400 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    Last synced 5 mins ago
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: WEATHER FORECAST */}
          <div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-base font-semibold text-gray-800 mb-5">5-Day Forecast</h2>
              
              <div className="space-y-4">
                {/* Day 1 */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="w-20">
                    <span className="text-sm font-semibold text-gray-800">Today</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sun className="w-5 h-5 text-amber-500" />
                    <span className="text-sm font-medium text-gray-600 w-16 text-center">31° / 24°</span>
                  </div>
                  <div className="bg-brand-50 text-brand-700 px-2 py-1 rounded text-xs font-semibold w-12 text-center">
                    10%
                  </div>
                </div>

                {/* Day 2 */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="w-20">
                    <span className="text-sm font-medium text-gray-600">Tomorrow</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cloud className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600 w-16 text-center">29° / 24°</span>
                  </div>
                  <div className="bg-brand-50 text-brand-700 px-2 py-1 rounded text-xs font-semibold w-12 text-center">
                    20%
                  </div>
                </div>

                {/* Day 3 */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="w-20">
                    <span className="text-sm font-medium text-gray-600">Wednesday</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CloudRain className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-medium text-gray-600 w-16 text-center">27° / 23°</span>
                  </div>
                  <div className="bg-brand-50 text-brand-700 px-2 py-1 rounded text-xs font-semibold w-12 text-center">
                    80%
                  </div>
                </div>

                {/* Day 4 */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="w-20">
                    <span className="text-sm font-medium text-gray-600">Thursday</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CloudLightning className="w-5 h-5 text-indigo-500" />
                    <span className="text-sm font-medium text-gray-600 w-16 text-center">26° / 23°</span>
                  </div>
                  <div className="bg-brand-50 text-brand-700 px-2 py-1 rounded text-xs font-semibold w-12 text-center">
                    95%
                  </div>
                </div>

                {/* Day 5 */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="w-20">
                    <span className="text-sm font-medium text-gray-600">Friday</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CloudRain className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-medium text-gray-600 w-16 text-center">28° / 23°</span>
                  </div>
                  <div className="bg-brand-50 text-brand-700 px-2 py-1 rounded text-xs font-semibold w-12 text-center">
                    60%
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
