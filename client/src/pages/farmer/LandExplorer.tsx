import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Globe, Layers, Map as MapIcon, Droplets, Mountain, Wind } from 'lucide-react';
import { MapContainer, TileLayer } from 'react-leaflet';

export default function LandExplorer() {
  const [activeLayer, setActiveLayer] = useState<string>('satellite');

  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto h-[calc(100vh-80px)] flex flex-col font-inter">
        
        <div className="mb-6 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Land Explorer</h1>
            <p className="text-sm text-gray-500 mt-1">Advanced visualization of soil composition and terrain overlays</p>
          </div>
          <div className="bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1.5 rounded-full border border-brand-100 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5" />
            Phase 9: Live Map
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
          
          {/* Map Area */}
          <div className="lg:col-span-3 bg-gray-100 border border-gray-300 rounded-xl relative overflow-hidden flex flex-col z-0">
            <MapContainer 
              center={[10.6765, 122.9509]} // Negros Occidental approximate
              zoom={9} 
              className="w-full h-full absolute inset-0 z-0"
              zoomControl={true}
            >
              {activeLayer === 'satellite' && (
                <TileLayer
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  attribution="Tiles &copy; Esri"
                />
              )}
              {activeLayer === 'moisture' && (
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap"
                  className="hue-rotate-180 opacity-70"
                />
              )}
              {activeLayer === 'elevation' && (
                <TileLayer
                  url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenTopoMap"
                />
              )}
              {activeLayer === 'climate' && (
                <TileLayer
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
                  attribution="&copy; Esri"
                  className="sepia opacity-60"
                />
              )}
            </MapContainer>

            {/* Simulated overlay indicator */}
            <div className="absolute top-4 left-4 z-[400] bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Active Layer:</span>
              <span className="ml-2 text-sm font-semibold text-brand-700 capitalize">{activeLayer} Map</span>
            </div>
          </div>

          {/* Layers Panel */}
          <div className="lg:col-span-1 bg-white border border-gray-200 rounded-xl p-5 shadow-sm overflow-y-auto z-10">
            <h2 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand-500" />
              Map Layers
            </h2>
            
            <div className="space-y-3">
              <label 
                className={`flex items-center gap-3 p-3 border ${activeLayer === 'satellite' ? 'border-brand-500 bg-brand-50 shadow-sm' : 'border-gray-200 hover:bg-gray-50'} rounded-lg cursor-pointer transition-colors`}
              >
                <input 
                  type="radio" 
                  name="layer" 
                  checked={activeLayer === 'satellite'} 
                  onChange={() => setActiveLayer('satellite')}
                  className="rounded-full text-brand-600 focus:ring-brand-500 w-4 h-4" 
                />
                <div className="flex items-center gap-2">
                  <MapIcon className={`w-4 h-4 ${activeLayer === 'satellite' ? 'text-brand-600' : 'text-gray-500'}`} />
                  <span className={`text-sm font-medium ${activeLayer === 'satellite' ? 'text-brand-900' : 'text-gray-700'}`}>Base Satellite</span>
                </div>
              </label>

              <label 
                className={`flex items-center gap-3 p-3 border ${activeLayer === 'moisture' ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-gray-200 hover:bg-gray-50'} rounded-lg cursor-pointer transition-colors`}
              >
                <input 
                  type="radio" 
                  name="layer" 
                  checked={activeLayer === 'moisture'} 
                  onChange={() => setActiveLayer('moisture')}
                  className="rounded-full text-blue-600 focus:ring-blue-500 w-4 h-4" 
                />
                <div className="flex items-center gap-2">
                  <Droplets className={`w-4 h-4 ${activeLayer === 'moisture' ? 'text-blue-600' : 'text-gray-500'}`} />
                  <span className={`text-sm font-medium ${activeLayer === 'moisture' ? 'text-blue-900' : 'text-gray-700'}`}>Soil Moisture</span>
                </div>
              </label>

              <label 
                className={`flex items-center gap-3 p-3 border ${activeLayer === 'elevation' ? 'border-earth-500 bg-earth-50 shadow-sm' : 'border-gray-200 hover:bg-gray-50'} rounded-lg cursor-pointer transition-colors`}
              >
                <input 
                  type="radio" 
                  name="layer" 
                  checked={activeLayer === 'elevation'} 
                  onChange={() => setActiveLayer('elevation')}
                  className="rounded-full text-earth-600 focus:ring-earth-500 w-4 h-4" 
                />
                <div className="flex items-center gap-2">
                  <Mountain className={`w-4 h-4 ${activeLayer === 'elevation' ? 'text-earth-600' : 'text-gray-500'}`} />
                  <span className={`text-sm font-medium ${activeLayer === 'elevation' ? 'text-earth-900' : 'text-gray-700'}`}>Topography</span>
                </div>
              </label>

              <label 
                className={`flex items-center gap-3 p-3 border ${activeLayer === 'climate' ? 'border-indigo-500 bg-indigo-50 shadow-sm' : 'border-gray-200 hover:bg-gray-50'} rounded-lg cursor-pointer transition-colors`}
              >
                <input 
                  type="radio" 
                  name="layer" 
                  checked={activeLayer === 'climate'} 
                  onChange={() => setActiveLayer('climate')}
                  className="rounded-full text-indigo-600 focus:ring-indigo-500 w-4 h-4" 
                />
                <div className="flex items-center gap-2">
                  <Wind className={`w-4 h-4 ${activeLayer === 'climate' ? 'text-indigo-600' : 'text-gray-500'}`} />
                  <span className={`text-sm font-medium ${activeLayer === 'climate' ? 'text-indigo-900' : 'text-gray-700'}`}>Micro-climate</span>
                </div>
              </label>
            </div>
            
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
