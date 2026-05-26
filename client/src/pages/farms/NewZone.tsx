import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useRoute, Link, useLocation } from "wouter";
import { trpc } from "../../lib/trpc";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import FarmDrawingMap from "../../components/FarmDrawingMap";
import { toast } from "sonner";

export default function NewZone() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/farms/:id/zones/new");
  const farmId = params?.id ? parseInt(params.id) : 0;

  const { data: farm, isLoading: farmLoading } = trpc.farms.getById.useQuery({ id: farmId }, {
    enabled: !!farmId,
  });

  const { data: crops } = trpc.crops.list.useQuery();

  const [name, setName] = useState("");
  const [croppingSystem, setCroppingSystem] = useState<"monocrop" | "intercrop" | "rotation">("monocrop");
  const [geometry, setGeometry] = useState<any>(null);
  const [areaHectares, setAreaHectares] = useState(0);

  // Intercrop specifics
  const [cropBreakdown, setCropBreakdown] = useState<Array<{ cropId: number, percentage: number }>>([
    { cropId: 0, percentage: 100 }
  ]);

  const createZoneMutation = trpc.zones.create.useMutation({
    onSuccess: () => {
      toast.success("Zone created successfully! Sent for verification.");
      setLocation(`/farms/${farmId}`);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create zone");
    }
  });

  const handleGeometryChange = (geom: GeoJSON.Geometry | null, area: number) => {
    setGeometry(geom);
    setAreaHectares(area);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!geometry) {
      toast.error("Please draw the zone boundary on the map");
      return;
    }

    // Validation for intercrop
    if (croppingSystem === "intercrop") {
      const total = cropBreakdown.reduce((sum, item) => sum + (Number(item.percentage) || 0), 0);
      if (total !== 100) {
        toast.error("Intercrop percentages must equal exactly 100%");
        return;
      }
      if (cropBreakdown.some(item => !item.cropId)) {
        toast.error("Please select a crop for each intercrop row");
        return;
      }
    }

    // Determine PRDP Label
    let prdpLabel = "Monocrop";
    if (croppingSystem === "intercrop") prdpLabel = "Intercrop";
    if (croppingSystem === "rotation") prdpLabel = "Rotation Crop";

    createZoneMutation.mutate({
      farmId,
      name,
      geometry,
      areaHectares,
      croppingSystem,
      prdpLabel,
      cropBreakdown: croppingSystem === "intercrop" ? cropBreakdown : null,
    });
  };

  const addIntercropRow = () => {
    setCropBreakdown([...cropBreakdown, { cropId: 0, percentage: 0 }]);
  };

  const updateIntercropRow = (index: number, field: string, value: number) => {
    const updated = [...cropBreakdown];
    updated[index] = { ...updated[index], [field]: value };
    setCropBreakdown(updated);
  };

  const removeIntercropRow = (index: number) => {
    const updated = cropBreakdown.filter((_, i) => i !== index);
    setCropBreakdown(updated);
  };

  if (farmLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary-500" /></div>
      </DashboardLayout>
    );
  }

  const center: [number, number] = farm?.latitude && farm?.longitude
    ? [parseFloat(farm.latitude.toString()), parseFloat(farm.longitude.toString())]
    : [10.4357, 123.0000];

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center gap-4">
        <Link href={`/farms/${farmId}`}>
          <button className="p-2 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 text-neutral-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-neutral-800">Mag-mapa ng Bagong Zone</h2>
          <p className="text-sm text-neutral-500 mt-1">Farm: {farm?.name}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6">
              <h3 className="font-semibold text-neutral-800 mb-4">1. I-draw ang Boundary</h3>
              <p className="text-sm text-neutral-500 mb-4">
                Gamitin ang polygon tool sa mapa para iguhit ang hugis ng iyong zone.
                Siguraduhing hindi ito nag-o-overlap sa ibang zones.
              </p>

              <div className="h-[400px] rounded-xl overflow-hidden border border-neutral-200 mb-4">
                <FarmDrawingMap center={center} onGeometryChange={handleGeometryChange} />
              </div>

              <div className="flex justify-between items-center bg-primary-50 p-4 rounded-xl border border-primary-100">
                <span className="text-sm font-medium text-primary-800">Hectarage (Awtomatiko)</span>
                <span className="text-lg font-bold text-primary-600">{areaHectares.toFixed(4)} ha</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6">
              <h3 className="font-semibold text-neutral-800 mb-4">2. Detalye ng Zone</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Pangalan ng Zone (Opsiyonal)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Hal. Zone A - Kamatisan"
                    className="w-full bg-neutral-50 border border-neutral-200 text-neutral-800 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    PRDP Cropping System <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={croppingSystem}
                    onChange={(e) => setCroppingSystem(e.target.value as "monocrop" | "intercrop" | "rotation")}
                    className="w-full bg-neutral-50 border border-neutral-200 text-neutral-800 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-500 outline-none"
                  >
                    <option value="monocrop">Monocrop (Isang uri ng pananim lang)</option>
                    <option value="intercrop">Intercrop (Higit sa isang pananim nang sabay)</option>
                    <option value="rotation">Rotation Crop (Nagpapalit ng pananim kada season)</option>
                  </select>
                </div>

                {croppingSystem === "intercrop" && (
                  <div className="mt-4 p-4 bg-earth-50 border border-earth-200 rounded-xl">
                    <label className="block text-sm font-medium text-earth-800 mb-3">
                      Crop Breakdown (Dapat mag-total sa 100%)
                    </label>

                    {cropBreakdown.map((row, index) => (
                      <div key={index} className="flex gap-2 mb-3 items-center">
                        <select
                          value={row.cropId}
                          onChange={(e) => updateIntercropRow(index, 'cropId', parseInt(e.target.value))}
                          className="flex-1 bg-white border border-neutral-200 text-neutral-800 rounded-lg px-3 py-2 text-sm outline-none"
                        >
                          <option value={0} disabled>Select Crop...</option>
                          {crops?.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                          ))}
                        </select>
                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={row.percentage || ''}
                          onChange={(e) => updateIntercropRow(index, 'percentage', parseInt(e.target.value))}
                          placeholder="%"
                          className="w-20 bg-white border border-neutral-200 text-neutral-800 rounded-lg px-3 py-2 text-sm outline-none"
                        />
                        <span className="text-sm font-medium text-neutral-500">%</span>
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => removeIntercropRow(index)}
                            className="text-red-500 p-2 hover:bg-red-50 rounded-lg"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={addIntercropRow}
                      className="text-sm font-medium text-primary-600 mt-2 hover:underline"
                    >
                      + Magdagdag ng Tanim
                    </button>

                    <div className="mt-4 pt-4 border-t border-earth-200 flex justify-between">
                      <span className="text-sm font-medium">Total:</span>
                      <span className={`text-sm font-bold ${cropBreakdown.reduce((sum, item) => sum + (Number(item.percentage) || 0), 0) === 100
                          ? 'text-green-600' : 'text-red-500'
                        }`}>
                        {cropBreakdown.reduce((sum, item) => sum + (Number(item.percentage) || 0), 0)}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-primary-50 rounded-2xl border border-primary-100 p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary-200 flex items-center justify-center shrink-0">
                <span className="text-primary-700 font-bold">i</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-primary-900">Mahalagang Paalala</h4>
                <p className="text-xs text-primary-700 mt-1 leading-relaxed">
                  Ang lahat ng zones na iginuhit ay dadaan muna sa masusing pag-verify ng nakatalagang DA Extension Officer bago ma-aprubahan. Siguraduhing tama ang pagkakaguhit ng boundary.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="submit"
                disabled={createZoneMutation.isPending}
                className="w-full md:w-auto px-8 py-3 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white rounded-xl font-semibold shadow-md flex items-center justify-center gap-2 transition-colors"
              >
                {createZoneMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                I-submit sa Officer
              </button>
            </div>
          </div>
        </div>
      </form>
    </DashboardLayout>
  );
}
