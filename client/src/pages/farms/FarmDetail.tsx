import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useRoute, Link, useLocation } from "wouter";
import { trpc } from "../../lib/trpc";
import { ArrowLeft, Plus, Map as MapIcon, Edit3, Loader2 } from "lucide-react";
import FarmDrawingMap from "../../components/FarmDrawingMap";

export default function FarmDetail() {
  const [match, params] = useRoute("/farms/:id");
  const farmId = params?.id ? parseInt(params.id) : 0;

  const { data: farm, isLoading } = trpc.farms.getById.useQuery({ id: farmId }, {
    enabled: !!farmId,
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
        </div>
      </DashboardLayout>
    );
  }

  if (!farm) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">Farm not found.</div>
      </DashboardLayout>
    );
  }

  // Calculate center from farm coordinates if they exist
  const center: [number, number] = farm.latitude && farm.longitude
    ? [parseFloat(farm.latitude.toString()), parseFloat(farm.longitude.toString())]
    : [10.4357, 123.0000];

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <button className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 transition-colors shadow-sm">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-bold text-gray-800 tracking-tight">{farm.name}</h2>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${farm.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                {farm.status}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-500 flex items-center gap-1.5">
              <MapIcon className="w-4 h-4 text-brand-500" />
              {farm.barangay ? `${farm.barangay}, ` : ''}{farm.municipality}
            </p>
          </div>
        </div>
        <Link href={`/farms/${farm.id}/zones/new`}>
          <button className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-card transition-all transform hover:-translate-y-0.5">
            <Plus className="w-4 h-4" />
            Add Crop Zone
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col h-full">
          {/* MAP OVERVIEW */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col flex-1 min-h-[500px] relative group">
            <div className="absolute top-4 left-4 z-[1000] bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-md border border-gray-100 pointer-events-none transition-opacity">
              <h3 className="font-bold text-gray-800 text-sm flex items-center gap-2">
                <MapIcon className="w-4 h-4 text-brand-500" />
                Farm Zones Overview
              </h3>
              <p className="text-xs font-medium text-gray-500 mt-0.5">Interactive map view</p>
            </div>
            
            <div className="absolute inset-0 z-0">
              {/* If there are zones with geometry, display them all here. For now, center on farm. */}
              <FarmDrawingMap
                center={center}
                readOnly={true}
                onGeometryChange={() => { }}
                initialGeometry={farm.zones && farm.zones.length > 0 ? (farm.zones[0].geometry as GeoJSON.Geometry) : null}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6 flex flex-col h-full">
          {/* FARM DETAILS */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-bl-full -z-0 opacity-50"></div>
            <h3 className="font-bold text-gray-800 mb-5 relative z-10 flex items-center gap-2">
              <div className="w-1 h-5 bg-brand-500 rounded-full"></div>
              Farm Registration Data
            </h3>
            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                <span className="text-gray-500 text-sm font-medium">Total Calculated Area</span>
                <span className="font-bold text-gray-800 bg-gray-100 px-3 py-1 rounded-lg">{farm.totalArea || 0} ha</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                <span className="text-gray-500 text-sm font-medium">Date Registered</span>
                <span className="font-semibold text-gray-700">
                  {farm.createdAt ? new Date(farm.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* ZONES LIST */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col flex-1 overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <div className="w-1 h-5 bg-brand-500 rounded-full"></div>
                Crop Zones ({farm.zones?.length || 0})
              </h3>
            </div>

            <div className="p-5 flex-1 overflow-y-auto">
              {!farm.zones || farm.zones.length === 0 ? (
                <div className="text-center py-10">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MapIcon className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-500 mb-4">No crop zones mapped yet.</p>
                  <Link href={`/farms/${farm.id}/zones/new`}>
                    <button className="text-brand-600 font-semibold text-sm hover:text-brand-700 hover:underline">
                      Map your first zone
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {farm.zones.map((zone: any) => (
                    <div key={zone.id} className="p-4 border border-gray-100 rounded-xl hover:border-brand-200 hover:shadow-card-md hover:bg-brand-50/30 transition-all group">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-gray-800 group-hover:text-brand-700 transition-colors">{zone.name || `Zone ${zone.id}`}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{zone.croppingSystem}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-brand-700 bg-brand-100 px-2.5 py-1 rounded-md shadow-sm">
                            {Number(zone.areaHectares).toFixed(2)} ha
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between items-center border-t border-gray-100/50 pt-3">
                        <div className="flex items-center gap-1.5">
                          <div className={`w-2 h-2 rounded-full ${zone.verificationStatus === 'verified' ? 'bg-green-500' :
                              zone.verificationStatus === 'pending' ? 'bg-amber-500 animate-pulse' :
                                'bg-red-500'
                            }`}></div>
                          <span className="text-xs font-semibold text-gray-600 capitalize">
                            {zone.verificationStatus}
                          </span>
                        </div>
                        <Link href={`/verify/${zone.id}`}>
                          <button className="text-gray-400 hover:text-brand-600 p-1.5 rounded-md hover:bg-brand-50 transition-colors">
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
