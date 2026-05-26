import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useRoute, Link } from "wouter";
import { trpc } from "../../lib/trpc";
import { ArrowLeft, Loader2, Droplets, Sun, Calendar, FlaskConical, RefreshCcw } from "lucide-react";

export default function CropDetail() {
  const [match, params] = useRoute("/crops/:id");
  const cropId = params?.id ? parseInt(params.id) : 0;

  const { data: crop, isLoading: cropLoading } = trpc.crops.getById.useQuery({ id: cropId }, {
    enabled: !!cropId,
  });

  const { data: rotations, isLoading: rotationsLoading } = trpc.rotation.getRecommendation.useQuery({ previousCropId: cropId }, {
    enabled: !!cropId,
  });

  if (cropLoading || rotationsLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary-500" /></div>
      </DashboardLayout>
    );
  }

  if (!crop) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">Crop not found.</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <Link href="/crops">
          <button className="flex items-center gap-2 text-neutral-500 hover:text-neutral-800 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Bumalik sa Library
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden mb-6">
        <div className="h-48 md:h-64 bg-primary-800 relative">
          {crop.imageUrl ? (
            <img src={crop.imageUrl} alt={crop.name} className="w-full h-full object-cover opacity-80" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-earth-600"></div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <h1 className="text-3xl md:text-4xl font-bold text-white">{crop.name}</h1>
            <p className="text-primary-200 text-lg italic mt-1">{crop.family}</p>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <p className="text-neutral-600 leading-relaxed mb-8 max-w-3xl">
            {crop.description || `Ang ${crop.name} ay isang mahalagang pananim sa Negros Occidental na kabilang sa pamilya ng ${crop.family}. Mainam itong itanim tuwing ${crop.season} season.`}
          </p>

          <h3 className="text-lg font-semibold text-neutral-800 mb-4">Mga Pangangailangan (Requirements)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
              <Droplets className="w-6 h-6 text-blue-500 mb-2" />
              <p className="text-xs text-neutral-500 mb-1">Tubig / Ulan</p>
              <p className="font-semibold text-neutral-800">{crop.waterNeedMin} - {crop.waterNeedMax} mm</p>
            </div>
            <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl">
              <Sun className="w-6 h-6 text-orange-500 mb-2" />
              <p className="text-xs text-neutral-500 mb-1">Araw</p>
              <p className="font-semibold text-neutral-800">{crop.sunlightHours} oras/araw</p>
            </div>
            <div className="bg-green-50 border border-green-100 p-4 rounded-xl">
              <Calendar className="w-6 h-6 text-green-500 mb-2" />
              <p className="text-xs text-neutral-500 mb-1">Araw bago anihin</p>
              <p className="font-semibold text-neutral-800">{crop.maturationDays} araw</p>
            </div>
            <div className="bg-earth-50 border border-earth-100 p-4 rounded-xl">
              <FlaskConical className="w-6 h-6 text-earth-600 mb-2" />
              <p className="text-xs text-neutral-500 mb-1">Soil pH</p>
              <p className="font-semibold text-neutral-800">{crop.soilPhMin} - {crop.soilPhMax}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
              <RefreshCcw className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-800">Rekomendasyon sa Crop Rotation</h3>
              <p className="text-sm text-neutral-500">Mga magandang itanim pagkatapos anihin ang {crop.name}</p>
            </div>
          </div>

          {!rotations || rotations.length === 0 ? (
            <p className="text-neutral-500 italic bg-neutral-50 p-4 rounded-xl border border-neutral-100">
              Walang available na rotation data para sa pananim na ito.
            </p>
          ) : (
            <div className="space-y-4">
              {rotations.map((rec, i) => (
                <div key={i} className={`p-4 border rounded-xl flex flex-col md:flex-row md:items-center gap-4 transition-colors ${rec.rating === 'excellent' ? 'bg-green-50/50 border-green-200' :
                  rec.rating === 'good' ? 'bg-blue-50/50 border-blue-200' :
                    'bg-red-50/50 border-red-200'
                  }`}>
                  <div className="w-16 h-16 bg-white rounded-lg border border-neutral-100 flex items-center justify-center shrink-0 overflow-hidden">
                    {rec.crop.imageUrl ? (
                      <img src={rec.crop.imageUrl} alt={rec.crop.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-bold text-neutral-300 text-2xl">{rec.crop.name.charAt(0)}</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Link href={`/crops/${rec.crop.id}`}>
                        <h4 className="font-bold text-neutral-800 hover:text-primary-600 cursor-pointer">{rec.crop.name}</h4>
                      </Link>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${rec.rating === 'excellent' ? 'bg-green-100 text-green-700' :
                        rec.rating === 'good' ? 'bg-blue-100 text-blue-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                        {rec.rating} Rating
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600">{rec.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
