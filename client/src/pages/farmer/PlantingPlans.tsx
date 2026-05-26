import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { trpc } from '../../lib/trpc';
import { Calculator, ArrowRight, Sprout, Layers, AlertCircle, LayoutTemplate } from 'lucide-react';
import { Link } from 'wouter';

export default function PlantingPlans() {
  const { data: farms, isLoading } = trpc.farms.listWithDetails.useQuery();

  // For demonstration, calculate a mock average LER across all intercropped zones
  let totalLer = 0;
  let intercropCount = 0;
  
  const allZones = farms?.flatMap(farm => farm.zones || []) || [];

  allZones.forEach(zone => {
    if (zone.croppingSystem === 'intercrop') {
      // Mock LER for intercrop
      totalLer += 1.45; 
      intercropCount++;
    }
  });

  const avgLer = intercropCount > 0 ? (totalLer / intercropCount).toFixed(2) : '1.00';
  const hasFarms = farms && farms.length > 0;

  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto h-full flex flex-col font-inter">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Planting Plans</h1>
          <p className="text-sm text-gray-500 mt-1">AI-driven agroecological intercropping recommendations</p>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            <div className="skeleton h-32 w-full rounded-xl"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="skeleton h-48 w-full rounded-xl"></div>
              <div className="skeleton h-48 w-full rounded-xl"></div>
              <div className="skeleton h-48 w-full rounded-xl"></div>
            </div>
          </div>
        ) : !hasFarms ? (
          <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center flex-1 flex flex-col items-center justify-center">
            <LayoutTemplate className="w-[48px] h-[48px] text-gray-300 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-700">No farms setup yet</h2>
            <p className="text-gray-500 mt-2 max-w-sm mx-auto mb-6">Create a farm first to generate intelligent planting plans based on your zones.</p>
            <Link href="/farms/new">
              <button className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-card transition-colors">
                Add Your First Farm
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-8 flex-1">
            {/* TOP — Overall LER Score */}
            <div className="bg-brand-50 border border-brand-200 rounded-xl p-8 relative overflow-hidden shadow-sm">
              <div className="absolute -right-10 -bottom-10 opacity-10">
                <Calculator className="w-64 h-64 text-brand-600" />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-700 mb-1 flex items-center gap-2">
                    <Calculator className="w-4 h-4" />
                    Total Farm LER Score
                  </h2>
                  <div className="flex items-baseline gap-3 mt-2">
                    <span className="text-5xl font-bold text-gray-900">{avgLer}</span>
                    <span className="text-brand-600 font-medium">Highly Efficient Intercropping</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-4 max-w-xl leading-relaxed">
                    A Land Equivalent Ratio (LER) above 1.0 indicates that your intercropping strategy yields more than growing the same crops in monoculture.
                  </p>
                </div>
              </div>
            </div>

            {/* GRID OF ZONES */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Zone Layouts & Predictions</h3>
              
              {allZones.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-xl p-10 text-center shadow-sm">
                  <AlertCircle className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <h4 className="text-base font-semibold text-gray-700">No zones defined</h4>
                  <p className="text-sm text-gray-500 mt-1 mb-5">You need to draw zones on your farm to get planting plans.</p>
                  <Link href={`/farms/${farms[0].id}`}>
                    <button className="bg-white border border-gray-300 hover:border-brand-300 hover:bg-brand-50 text-gray-700 hover:text-brand-700 px-5 py-2 rounded-lg text-sm font-semibold transition-colors">
                      Go to Farm Control Center
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allZones.map(zone => {
                    const isIntercrop = zone.croppingSystem === 'intercrop';
                    const lerScore = isIntercrop ? "1.45" : "1.00";
                    const cropDisplay = zone.prdpLabel || (isIntercrop ? "Mixed Planting" : "Monocrop");

                    return (
                      <div key={zone.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-card-md transition-shadow flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-lg font-bold text-gray-800">{zone.name || `Zone ${zone.id}`}</h4>
                            <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-500">
                              <Layers className="w-3.5 h-3.5" />
                              <span>{parseFloat(zone.areaHectares || "0").toFixed(2)} ha</span>
                            </div>
                          </div>
                          <div className={`px-2.5 py-1 rounded-md text-xs font-bold ${isIntercrop ? 'bg-brand-100 text-brand-800' : 'bg-gray-100 text-gray-600'}`}>
                            LER: {lerScore}
                          </div>
                        </div>

                        <div className="mb-6 flex-1">
                          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Cropping Setup</p>
                          <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
                            <Sprout className="w-4 h-4 text-brand-500" />
                            {cropDisplay}
                          </div>
                        </div>

                        <button onClick={() => window.alert('Detailed plan view coming soon')} className="w-full flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 py-2.5 rounded-lg text-sm font-semibold transition-colors mt-auto">
                          View Detailed Plan
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
