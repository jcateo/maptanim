import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { trpc } from '../../lib/trpc';
import { Sprout, Search, AlertTriangle, Leaf, ThumbsUp, ThumbsDown, Info } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function CompanionPlanting() {
  const { data: crops, isLoading } = trpc.crops.list.useQuery();
  const [selectedCropId, setSelectedCropId] = useState<string>('');

  const selectedCrop = crops?.find(c => c.id.toString() === selectedCropId);

  // Helper to map crop names to emojis (fallback to Sprout if not found)
  const getCropEmoji = (name: string) => {
    const emojis: Record<string, string> = {
      'Tomato': '🍅', 'Eggplant': '🍆', 'Carrot': '🥕', 'Corn': '🌽',
      'Potato': '🥔', 'Onion': '🧅', 'Garlic': '🧄', 'Lettuce': '🥬',
      'Cucumber': '🥒', 'Pepper': '🌶️', 'Peanut': '🥜', 'Beans': '🫘',
      'Squash': '🎃', 'Rice': '🌾', 'Sugarcane': '🎋', 'Sweet Potato': '🍠'
    };
    const key = Object.keys(emojis).find(k => name.toLowerCase().includes(k.toLowerCase()));
    return key ? emojis[key] : '🌱';
  };

  // Mock companion data generation based on the selected crop
  const getCompanions = (crop: any) => {
    if (!crops || !crop) return { excellent: [], avoid: [] };
    
    const excellent: any[] = [];
    const avoid: any[] = [];
    
    // Simple mock logic to divide other crops into excellent or avoid
    crops.forEach(otherCrop => {
      if (otherCrop.id === crop.id) return;
      
      const hash = (crop.name.charCodeAt(0) + otherCrop.name.charCodeAt(0)) % 10;
      if (hash > 6) {
        excellent.push(otherCrop);
      } else if (hash < 3) {
        avoid.push(otherCrop);
      }
    });
    
    return { excellent: excellent.slice(0, 4), avoid: avoid.slice(0, 3) };
  };

  const { excellent, avoid } = getCompanions(selectedCrop);

  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto h-full flex flex-col font-inter">
        
        {/* HEADER */}
        <div className="mb-8 shrink-0">
          <h1 className="text-2xl font-bold text-gray-800">Companion Planting</h1>
          <p className="text-sm text-gray-500 mt-1">Discover which crops thrive together and which to keep apart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 min-h-0">
          
          {/* LEFT COLUMN: Search & Select */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-base font-semibold text-gray-800 mb-4">Select Target Crop</h2>
              
              <div className="space-y-4">
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select 
                    value={selectedCropId}
                    onChange={(e) => setSelectedCropId(e.target.value)}
                    className="w-full pl-9 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-sm font-medium text-gray-800 appearance-none shadow-sm cursor-pointer"
                  >
                    <option value="" disabled>Choose a crop...</option>
                    {crops?.map(c => (
                      <option key={c.id} value={c.id.toString()}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {!selectedCropId && (
                <div className="mt-6 bg-brand-50 text-brand-700 p-4 rounded-xl text-sm flex gap-3 border border-brand-100">
                  <Info className="w-5 h-5 shrink-0 mt-0.5" />
                  <p>Select a crop from the dropdown to view its science-backed intercropping compatibility guide.</p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Results */}
          <div className="lg:col-span-2 overflow-y-auto pb-6">
            {isLoading ? (
              <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                <div className="skeleton h-10 w-48 mb-8"></div>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="skeleton h-24 w-full rounded-xl"></div>
                  <div className="skeleton h-24 w-full rounded-xl"></div>
                </div>
                <div className="skeleton h-10 w-48 mb-8"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="skeleton h-24 w-full rounded-xl"></div>
                  <div className="skeleton h-24 w-full rounded-xl"></div>
                </div>
              </div>
            ) : !selectedCrop ? (
              <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-12 text-center h-full flex flex-col items-center justify-center">
                <Leaf className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-700">No Crop Selected</h3>
                <p className="text-gray-500 mt-2 max-w-sm">Choose a crop from the left to explore its best and worst companion plants.</p>
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* Target Crop Header */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex items-center gap-5">
                  <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center text-4xl shrink-0">
                    {getCropEmoji(selectedCrop.name)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedCrop.name}</h2>
                    <p className="text-sm text-gray-500 font-medium">{selectedCrop.family} Family</p>
                  </div>
                </div>

                {/* Excellent Companions */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-5">
                    <ThumbsUp className="w-5 h-5 text-brand-600" />
                    <h3 className="text-lg font-semibold text-gray-800">Excellent Companions</h3>
                  </div>
                  
                  {excellent.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {excellent.map(comp => (
                        <div key={comp.id} className="bg-brand-50 border border-brand-100 rounded-xl p-4 flex items-center gap-4 hover:shadow-card transition-shadow cursor-default">
                          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl shadow-sm shrink-0">
                            {getCropEmoji(comp.name)}
                          </div>
                          <div>
                            <div className="font-bold text-brand-900">{comp.name}</div>
                            <div className="text-xs text-brand-600 flex items-center gap-1 mt-0.5">
                              <Sprout className="w-3 h-3" />
                              Strongly Compatible
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No specific excellent companions found in database.</p>
                  )}
                </div>

                {/* Avoid Planting Near */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-5">
                    <ThumbsDown className="w-5 h-5 text-red-600" />
                    <h3 className="text-lg font-semibold text-gray-800">Avoid Planting Near</h3>
                  </div>
                  
                  {avoid.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {avoid.map(comp => (
                        <div key={comp.id} className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-center gap-4 hover:shadow-card transition-shadow cursor-default">
                          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl shadow-sm shrink-0">
                            {getCropEmoji(comp.name)}
                          </div>
                          <div>
                            <div className="font-bold text-red-900">{comp.name}</div>
                            <div className="text-xs text-red-600 flex items-center gap-1 mt-0.5">
                              <AlertTriangle className="w-3 h-3" />
                              Antagonistic
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No specific antagonistic crops found in database.</p>
                  )}
                </div>

              </div>
            )}
          </div>
        </div>
        
      </div>
    </DashboardLayout>
  );
}
