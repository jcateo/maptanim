import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Search, FileText, Download, BookOpen, Clock } from 'lucide-react';

export default function Research() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock research data since we don't have a tRPC route for this yet
  const researchData = [
    {
      id: 1,
      title: "Impact of Intercropping Legumes with Corn in Negros Occidental",
      author: "Dr. Maria Santos, DA Region VI",
      date: "May 15, 2026",
      abstract: "This paper explores the long-term yield benefits and soil nitrogen retention when intercropping peanuts with traditional corn varieties in the specific soil conditions of Negros Occidental. Results show a 25% increase in Land Equivalent Ratio (LER).",
      tags: ["Intercropping", "Soil Health", "Corn"]
    },
    {
      id: 2,
      title: "Climate-Resilient Rice Varieties for Wet Season",
      author: "Philippine Rice Research Institute (PhilRice)",
      date: "April 02, 2026",
      abstract: "An analysis of 5 new flood-tolerant rice varieties tested across various municipalities in Western Visayas. Includes planting protocols and expected harvest yields during La Niña conditions.",
      tags: ["Rice", "Climate Adaptation", "Wet Season"]
    },
    {
      id: 3,
      title: "Organic Pest Management for Sugarcane Borers",
      author: "Juan Dela Cruz, SRA",
      date: "January 20, 2026",
      abstract: "A comprehensive guide on deploying biological control agents (Trichogramma) against sugarcane stem borers. The study covers application timing and cost-benefit analysis compared to chemical pesticides.",
      tags: ["Sugarcane", "Pest Management", "Organic"]
    },
    {
      id: 4,
      title: "Soil pH Optimization for High-Yield Tomato Production",
      author: "Negros State College of Agriculture",
      date: "November 11, 2025",
      abstract: "Case studies on lime application to neutralize acidic soils in upland farms, focusing on the resulting improvements in tomato crop health and marketability.",
      tags: ["Soil pH", "Tomato", "Fertilization"]
    }
  ];

  const filteredData = researchData.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <div className="p-6 max-w-5xl mx-auto h-full flex flex-col font-inter">
        
        {/* HEADER */}
        <div className="mb-8 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Research & Publications</h1>
            <p className="text-sm text-gray-500 mt-1">
              Access the latest agricultural studies, guides, and DA publications.
            </p>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, keyword, or topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all shadow-sm text-sm"
            />
          </div>
        </div>

        {/* LIST */}
        <div className="flex-1 overflow-y-auto pb-6 space-y-4">
          {filteredData.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl p-16 text-center shadow-sm">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600 font-medium text-base">No publications found.</p>
              <p className="text-gray-400 text-sm mt-1">Try searching for different keywords or topics.</p>
            </div>
          ) : (
            filteredData.map(item => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-card-md transition-shadow">
                <div className="flex flex-col md:flex-row gap-6">
                  
                  {/* Icon Area */}
                  <div className="hidden md:flex w-16 h-16 bg-brand-50 rounded-2xl items-center justify-center shrink-0">
                    <FileText className="w-8 h-8 text-brand-600" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-gray-800 leading-snug">{item.title}</h2>
                    
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-gray-500">
                      <span className="font-medium text-gray-700">{item.author}</span>
                      <span className="hidden sm:inline text-gray-300">•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {item.date}
                      </span>
                    </div>

                    <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                      {item.abstract}
                    </p>

                    <div className="mt-4 flex items-center gap-2">
                      {item.tags.map(tag => (
                        <span key={tag} className="bg-gray-50 border border-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="shrink-0 flex items-start md:items-center justify-end mt-4 md:mt-0 md:pl-4 md:border-l md:border-gray-100">
                    <button 
                      onClick={() => window.alert('PDF download coming soon')}
                      className="bg-transparent hover:bg-brand-50 text-brand-600 border border-brand-200 hover:border-brand-300 px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </button>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}
