import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { trpc } from "../../lib/trpc";
import { Link } from "wouter";
import { Search, Sprout } from "lucide-react";

export default function CropLibrary() {
  const { data: crops, isLoading } = trpc.crops.list.useQuery();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCrops = crops?.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.localName && c.localName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getCropEmoji = (name: string) => {
    const emojis: Record<string, string> = {
      'Kamatis': '🍅', 'Talong': '🍆', 'Kalabasa': '🎃', 'Luya': '🧄',
      'Sitaw': '🫘', 'Okra': '🥬', 'Pechay': '🥬', 'Kangkong': '🌿',
      'Upo': '🥒', 'Patola': '🥒', 'Mongo': '🌱', 'Repolyo': '🥬',
      'Letsugas': '🥗', 'Sibuyas Dahon': '🧅', 'Ampalaya': '🥒'
    };
    const key = Object.keys(emojis).find(k => name.toLowerCase().includes(k.toLowerCase()));
    return key ? emojis[key] : '🌱';
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto h-full flex flex-col font-inter">
        
        {/* HEADER & SEARCH */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Crop Library</h1>
            <p className="text-sm text-gray-500 mt-1">
              Explore agricultural data for crops optimized for Negros Occidental
            </p>
          </div>
          
          <div className="relative w-full md:w-96">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search crops..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all shadow-sm text-sm"
            />
          </div>
        </div>

        {/* CROP GRID */}
        <div className="flex-1 overflow-y-auto pb-6">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array(12).fill(0).map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm h-48 flex flex-col items-center justify-center">
                  <div className="skeleton h-12 w-12 rounded-full mb-4"></div>
                  <div className="skeleton h-5 w-24 mb-2"></div>
                  <div className="flex gap-2 w-full justify-center">
                    <div className="skeleton h-4 w-16 rounded"></div>
                    <div className="skeleton h-4 w-16 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredCrops?.map((crop) => (
                <Link key={crop.id} href={`/crops/${crop.id}`}>
                  <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-card-md hover:border-brand-300 transition-all cursor-pointer text-center group h-full flex flex-col items-center justify-center relative overflow-hidden">
                    
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {getCropEmoji(crop.name)}
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{crop.name}</h3>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-4">{crop.family}</p>
                    
                    <div className="flex flex-wrap gap-2 justify-center mt-auto">
                      <span className="bg-gray-50 border border-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                        pH 6.0-7.0
                      </span>
                      <span className="bg-gray-50 border border-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                        Loam
                      </span>
                    </div>
                  </div>
                </Link>
              ))}

              {filteredCrops?.length === 0 && (
                <div className="col-span-full py-20 text-center flex flex-col items-center justify-center">
                  <Sprout className="w-12 h-12 text-gray-300 mb-3" />
                  <p className="text-gray-600 font-medium text-base">No crops found</p>
                  <p className="text-gray-400 text-sm mt-1">Try adjusting your search query.</p>
                </div>
              )}
            </div>
          )}
        </div>
        
      </div>
    </DashboardLayout>
  );
}
