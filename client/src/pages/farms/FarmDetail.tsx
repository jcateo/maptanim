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
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <button className="p-2 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 text-neutral-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-neutral-800">{farm.name}</h2>
            <p className="text-sm text-neutral-500 mt-1">{farm.barangay ? `${farm.barangay}, ` : ''}{farm.municipality}</p>
          </div>
        </div>
        <Link href={`/farms/${farm.id}/zones/new`}>
          <button className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors">
            <Plus className="w-4 h-4" />
            Add Zone
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* MAP OVERVIEW */}
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 border-b border-neutral-100 flex justify-between items-center">
              <h3 className="font-semibold text-neutral-800 flex items-center gap-2">
                <MapIcon className="w-5 h-5 text-primary-500" />
                Farm Zones Overview
              </h3>
            </div>
            <div className="h-[400px] w-full relative">
              {/* If there are zones with geometry, we could display them all here. For now, empty or center. */}
              <FarmDrawingMap
                center={center}
                readOnly={true}
                onGeometryChange={() => { }}
                // We could pass a FeatureCollection of all zones here
                initialGeometry={farm.zones && farm.zones.length > 0 ? (farm.zones[0].geometry as GeoJSON.Geometry) : null}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* FARM DETAILS */}
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6">
            <h3 className="font-semibold text-neutral-800 mb-4">Farm Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-neutral-500 text-sm">Total Area</span>
                <span className="font-medium text-neutral-800">{farm.totalArea || 0} Hectares</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500 text-sm">Status</span>
                <span className="font-medium text-green-600 capitalize">{farm.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500 text-sm">Created</span>
                <span className="font-medium text-neutral-800">
                  {farm.createdAt ? new Date(farm.createdAt).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* ZONES LIST */}
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6">
            <h3 className="font-semibold text-neutral-800 mb-4">Crop Zones ({farm.zones?.length || 0})</h3>

            {!farm.zones || farm.zones.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-neutral-500 mb-4">No zones mapped yet.</p>
                <Link href={`/farms/${farm.id}/zones/new`}>
                  <button className="text-primary-600 font-medium text-sm hover:underline">
                    Map your first zone
                  </button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {farm.zones.map((zone: any) => (
                  <div key={zone.id} className="p-3 border border-neutral-100 rounded-xl hover:border-primary-200 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-neutral-800">{zone.name || `Zone ${zone.id}`}</h4>
                        <p className="text-xs text-neutral-500 capitalize">{zone.croppingSystem}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold text-neutral-700 bg-neutral-100 px-2 py-1 rounded">
                          {zone.areaHectares} ha
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${zone.verificationStatus === 'verified' ? 'bg-green-100 text-green-700' :
                        zone.verificationStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                        {zone.verificationStatus}
                      </span>
                      <Link href={`/verify/${zone.id}`}>
                        <button className="text-neutral-400 hover:text-primary-600">
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
    </DashboardLayout>
  );
}
