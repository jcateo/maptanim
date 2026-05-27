import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { trpc } from '../../lib/trpc';
import { Calculator, ArrowRight, Sprout, Layers, AlertCircle, LayoutTemplate, X, CheckCircle, Info } from 'lucide-react';
import { Link } from 'wouter';

export default function PlantingPlans() {
  const { data: farms, isLoading } = trpc.farms.listWithDetails.useQuery();
  const { data: crops } = trpc.crops.list.useQuery();
  const { data: companions } = trpc.companion.list.useQuery();
  const [selectedZone, setSelectedZone] = useState<any | null>(null);

  const allZones = farms?.flatMap(farm => farm.zones || []) || [];

  const getCropsFromLabel = (label: string | null) => {
    if (!label) return [];
    return label.split(' ')[0].split('_');
  };

  const getCompanionPair = (zone: any) => {
    if (!crops || !companions || zone.croppingSystem !== 'intercrop') return null;
    const cropNames = getCropsFromLabel(zone.prdpLabel);
    if (cropNames.length !== 2) return null;
    
    const crop1 = crops.find((c: any) => c.name.toLowerCase() === cropNames[0].toLowerCase());
    const crop2 = crops.find((c: any) => c.name.toLowerCase() === cropNames[1].toLowerCase());
    if (!crop1 || !crop2) return null;

    return companions.find((comp: any) => 
      (comp.crop1Id === crop1.id && comp.crop2Id === crop2.id) ||
      (comp.crop1Id === crop2.id && comp.crop2Id === crop1.id)
    );
  };

  let totalLer = 0;
  let intercropCount = 0;
  
  allZones.forEach(zone => {
    if (zone.croppingSystem === 'intercrop') {
      const pair = getCompanionPair(zone);
      if (pair && pair.lerValue) {
        totalLer += parseFloat(pair.lerValue);
      } else {
        totalLer += 1.0;
      }
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
          <p className="text-sm text-gray-500 mt-1">Rule-based agroecological intercropping recommendations</p>
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
                  {allZones.map((zone: any) => {
                    const isIntercrop = zone.croppingSystem === 'intercrop';
                    const pair = getCompanionPair(zone);
                    const lerScore = pair && pair.lerValue ? parseFloat(pair.lerValue).toFixed(2) : (isIntercrop ? "1.00" : "1.00");
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
                          <div className={`px-2.5 py-1 rounded-md text-xs font-bold ${isIntercrop && lerScore !== "1.00" ? 'bg-brand-100 text-brand-800' : 'bg-gray-100 text-gray-600'}`}>
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

                        <button onClick={() => setSelectedZone(zone)} className="w-full flex items-center justify-center gap-2 bg-gray-50 hover:bg-brand-50 hover:text-brand-700 border border-gray-200 hover:border-brand-200 text-gray-700 py-2.5 rounded-lg text-sm font-semibold transition-colors mt-auto group-hover:bg-brand-50 group-hover:text-brand-700">
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

        {/* DETAILED PLAN MODAL */}
        {selectedZone && (
          <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setSelectedZone(null)}></div>
            <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              
              {/* Header */}
              <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-100 p-6 flex justify-between items-start z-20">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-2xl font-bold text-gray-800 tracking-tight">{selectedZone.name || `Zone ${selectedZone.id}`}</h2>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${selectedZone.croppingSystem === 'intercrop' ? 'bg-brand-100 text-brand-700' : 'bg-gray-100 text-gray-600'}`}>
                      {selectedZone.croppingSystem}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                    <Layers className="w-4 h-4" /> {parseFloat(selectedZone.areaHectares || "0").toFixed(2)} Hectares 
                    <span className="text-gray-300">|</span> 
                    <Sprout className="w-4 h-4" /> {selectedZone.prdpLabel || "Mixed Planting"}
                  </p>
                </div>
                <button onClick={() => setSelectedZone(null)} className="p-2 bg-gray-50 hover:bg-red-50 hover:text-red-600 rounded-full text-gray-400 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-8">
                
                {/* LER Breakdown */}
                {(() => {
                  const pair = getCompanionPair(selectedZone);
                  const isIntercrop = selectedZone.croppingSystem === 'intercrop';
                  const lerVal = isIntercrop && pair?.lerValue ? parseFloat(pair.lerValue) : 1.0;

                  return (
                    <div>
                      <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4">
                        <Calculator className="w-5 h-5 text-brand-500" />
                        Land Equivalent Ratio (LER) Breakdown
                      </h3>
                      <div className="bg-brand-50 border border-brand-100 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <div className="text-center sm:text-left">
                          <div className="text-4xl font-black text-brand-600 leading-none">
                            {lerVal.toFixed(2)}
                          </div>
                          <div className="text-xs font-bold uppercase tracking-wider text-brand-400 mt-1">Total LER</div>
                        </div>
                        <div className="flex-1 space-y-2 w-full">
                          {isIntercrop ? (
                            <>
                              <div className="flex justify-between text-sm">
                                <span className="font-medium text-gray-600">Primary Crop Yield (Expected)</span>
                                <span className="font-bold text-gray-800">
                                  {(lerVal * 0.58).toFixed(2)} LER
                                </span>
                              </div>
                              <div className="w-full bg-brand-200 rounded-full h-1.5"><div className="bg-brand-500 h-1.5 rounded-full w-[85%]"></div></div>
                              
                              <div className="flex justify-between text-sm pt-2">
                                <span className="font-medium text-gray-600">Secondary Crop Yield (Expected)</span>
                                <span className="font-bold text-gray-800">
                                  {(lerVal * 0.42).toFixed(2)} LER
                                </span>
                              </div>
                              <div className="w-full bg-blue-200 rounded-full h-1.5"><div className="bg-blue-500 h-1.5 rounded-full w-[60%]"></div></div>
                            </>
                          ) : (
                            <div className="text-sm text-gray-600">Monocrop systems have a baseline LER of 1.00. No intercropping synergies detected.</div>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-3 flex gap-1.5 items-start">
                        <Info className="w-4 h-4 shrink-0" />
                        This implies that planting this combination yields {isIntercrop ? "45% more" : "the exact baseline"} than planting them separately on the same amount of land, based on PRDP research metrics.
                      </p>
                    </div>
                  );
                })()}

                {/* Spatial Layout */}
                <div>
                  <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4">
                    <LayoutTemplate className="w-5 h-5 text-blue-500" />
                    Spatial Layout Suggestion
                  </h3>
                  <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="bg-gray-50 p-4 border-b border-gray-200 text-sm font-medium text-gray-700">
                      Recommended Row Spacing & Orientation
                    </div>
                    <div className="p-6">
                      {selectedZone.croppingSystem === 'intercrop' ? (
                        <div className="flex flex-col gap-3">
                          <div className="h-4 w-full bg-brand-500 rounded-sm relative">
                            <span className="absolute -top-5 left-2 text-[10px] font-bold text-gray-500 uppercase">Primary Row (e.g. 1m apart)</span>
                          </div>
                          <div className="h-2 w-full bg-blue-400 rounded-sm ml-4 border-l-2 border-white">
                            <span className="absolute -left-12 text-[10px] font-bold text-gray-500 uppercase">+0.5m</span>
                          </div>
                          <div className="h-4 w-full bg-brand-500 rounded-sm"></div>
                          <div className="h-2 w-full bg-blue-400 rounded-sm ml-4 border-l-2 border-white"></div>
                          <div className="h-4 w-full bg-brand-500 rounded-sm"></div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-3">
                          <div className="h-4 w-full bg-brand-500 rounded-sm"></div>
                          <div className="h-4 w-full bg-brand-500 rounded-sm"></div>
                          <div className="h-4 w-full bg-brand-500 rounded-sm"></div>
                        </div>
                      )}
                      <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Sunlight Orientation</p>
                          <p className="text-sm font-bold text-gray-800">East-West Rows</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Water Requirement</p>
                          <p className="text-sm font-bold text-gray-800">Shared Irrigation</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Companion Logic */}
                {selectedZone.croppingSystem === 'intercrop' && (
                  <div>
                    <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      Rule-based Companion Logic
                    </h3>
                    <ul className="space-y-3">
                      {(() => {
                        const pair = getCompanionPair(selectedZone);
                        if (pair && pair.notes) {
                          return pair.notes.split('\\n').map((note: string, idx: number) => {
                            const [title, desc] = note.split(': ');
                            return (
                              <li key={idx} className="flex gap-3 bg-green-50/50 p-3 rounded-xl border border-green-100">
                                <div className="mt-0.5"><CheckCircle className="w-4 h-4 text-green-500" /></div>
                                <div>
                                  <p className="text-sm font-semibold text-gray-800">{title}</p>
                                  <p className="text-xs text-gray-600 mt-0.5">{desc}</p>
                                </div>
                              </li>
                            );
                          });
                        } else {
                          return (
                            <li className="flex gap-3 bg-gray-50 p-3 rounded-xl border border-gray-200">
                              <div className="mt-0.5"><Info className="w-4 h-4 text-gray-400" /></div>
                              <div>
                                <p className="text-sm font-semibold text-gray-800">No specific rules</p>
                                <p className="text-xs text-gray-600 mt-0.5">No specific companion rules found in the PRDP database for this combination.</p>
                              </div>
                            </li>
                          );
                        }
                      })()}
                    </ul>
                  </div>
                )}

              </div>
              
              {/* Footer */}
              <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4 px-6 flex justify-end gap-3 z-20">
                <button onClick={() => setSelectedZone(null)} className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg text-sm transition-colors">
                  Close Plan
                </button>
                <Link href={`/layout-builder?zoneId=${selectedZone.id}`}>
                  <button className="px-6 py-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-lg text-sm transition-colors shadow-sm flex items-center gap-2">
                    <LayoutTemplate className="w-4 h-4" />
                    Accept Plan & Design Layout
                  </button>
                </Link>
              </div>

            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
