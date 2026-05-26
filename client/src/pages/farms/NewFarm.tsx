import React, { useState, useEffect, useMemo } from "react";
import { useLocation, Link } from "wouter";
import { trpc } from "../../lib/trpc";
import { 
  ArrowLeft, Loader2, MapPin, Search, Grid3X3, Layers, 
  Building2, Camera, Navigation, Sprout, CheckCircle
} from "lucide-react";
import FarmDrawingMap from "../../components/FarmDrawingMap";
import { toast } from "sonner";
import { useAuth } from "../../contexts/AuthContext";
import DashboardLayout from "../../components/DashboardLayout";

export default function NewFarm() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [zoneName, setZoneName] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [barangay, setBarangay] = useState("");
  const [position, setPosition] = useState<[number, number]>([10.4357, 123.0000]);
  
  const [geometry, setGeometry] = useState<any>(null);
  const [areaHectares, setAreaHectares] = useState<number>(0);
  
  const [croppingSystem, setCroppingSystem] = useState<string>("intercrop");
  const [notes, setNotes] = useState("");
  
  const { data: crops } = trpc.crops.list.useQuery();
  
  const [crop1, setCrop1] = useState<string>("");
  const [crop2, setCrop2] = useState<string>("");
  const [percentage1, setPercentage1] = useState<number>(60);
  const [percentage2, setPercentage2] = useState<number>(40);

  useEffect(() => {
    // Attempt geolocation on mount, but map is already rendered with default
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      }, () => {
        // Silently fail to default
      });
    }
  }, []);

  useEffect(() => {
    async function reverseGeocode() {
      if (!position) return;
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${position[0]}&lon=${position[1]}&format=json`,
          { headers: { "User-Agent": "MapTanim/1.0" } }
        );
        if (res.ok) {
          const data = await res.json();
          if (data.address) {
            if (data.address.city || data.address.town || data.address.municipality) {
              setMunicipality(data.address.city || data.address.town || data.address.municipality);
            }
            if (data.address.village || data.address.suburb || data.address.neighbourhood) {
              setBarangay(data.address.village || data.address.suburb || data.address.neighbourhood);
            }
          }
        }
      } catch (e) {
        console.error("Geocoding failed", e);
      }
    }
    reverseGeocode();
  }, [position]);

  const prdpLabel = useMemo(() => {
    if (croppingSystem === "monocrop") {
      const c1 = crops?.find(c => c.id.toString() === crop1)?.name;
      return c1 || "";
    }
    if (croppingSystem === "intercrop") {
      const c1 = crops?.find(c => c.id.toString() === crop1)?.name;
      const c2 = crops?.find(c => c.id.toString() === crop2)?.name;
      if (c1 && c2) return `${c1}_${c2} (${percentage1}-${percentage2})`;
    }
    if (croppingSystem === "rotation") {
      const c1 = crops?.find(c => c.id.toString() === crop1)?.name;
      const c2 = crops?.find(c => c.id.toString() === crop2)?.name;
      if (c1 && c2) return `${c1}-${c2}`;
    }
    return "";
  }, [croppingSystem, crop1, crop2, percentage1, percentage2, crops]);

  const createFarmMutation = trpc.farms.create.useMutation();
  const createZoneMutation = trpc.zones.create.useMutation({
    onSuccess: (data, variables) => {
      toast.success("Zone submitted for verification");
      setLocation(`/farms/${variables.farmId}`);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create zone");
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !municipality) {
      toast.error("Please fill all required farm details");
      return;
    }
    if (!geometry) {
      toast.error("Please draw a zone boundary on the map");
      return;
    }
    if (!crop1 || (croppingSystem !== "monocrop" && !crop2)) {
      toast.error("Please select the required crops");
      return;
    }
    if (croppingSystem === "intercrop" && (Number(percentage1) + Number(percentage2) !== 100)) {
      toast.error("Intercrop percentages must total 100");
      return;
    }

    try {
      const farm = await createFarmMutation.mutateAsync({
        name,
        municipality,
        barangay,
        latitude: position?.[0],
        longitude: position?.[1],
      });

      const cropBreakdown = {
        primaryCropId: parseInt(crop1),
        secondaryCropId: crop2 ? parseInt(crop2) : null,
        primaryPercentage: percentage1,
        secondaryPercentage: percentage2
      };

      await createZoneMutation.mutateAsync({
        farmId: farm.id,
        name: zoneName || "Zone A",
        geometry,
        areaHectares,
        croppingSystem: croppingSystem as any,
        prdpLabel,
        cropBreakdown,
        notes,
        photoUrls: [],
      });
    } catch(err) {
      console.error(err);
    }
  };

  const handleNextStep = () => {
    if (step === 1 && !geometry) {
      toast.error("Please draw a boundary on the map first.");
      return;
    }
    if (step === 2) {
      if (!name || !zoneName || !crop1 || (croppingSystem !== 'monocrop' && !crop2)) {
        toast.error("Please fill all required fields.");
        return;
      }
    }
    setStep(step + 1);
  };

  return (
    <DashboardLayout>
      <div className="w-full h-full flex flex-col">
        <h1 className="text-xl font-semibold text-gray-800 mb-6 hidden">Add New Farm</h1>

        <div className="bg-white flex flex-col flex-1 overflow-hidden min-h-[calc(100vh-120px)]">
          
          {/* STEPPER TOP */}
          <div className="flex border-b border-gray-200 bg-gray-50">
            {['Draw Boundary', 'Farm Details', 'Review'].map((label, idx) => {
              const stepNumber = idx + 1;
              const isActive = step === stepNumber;
              const isPast = step > stepNumber;
              return (
                <div key={label} className={`flex-1 flex flex-col sm:flex-row items-center justify-center py-3 sm:py-4 text-xs sm:text-sm font-medium border-b-2 transition-colors ${isActive ? 'border-brand-500 text-brand-700 bg-white' : isPast ? 'border-brand-300 text-gray-700' : 'border-transparent text-gray-400'}`}>
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs sm:mr-2 mb-1 sm:mb-0 transition-colors ${isActive ? 'bg-brand-500 text-white' : isPast ? 'bg-brand-100 text-brand-700' : 'bg-gray-200 text-gray-500'}`}>
                    {isPast ? <CheckCircle className="w-3.5 h-3.5" /> : stepNumber}
                  </div>
                  {label}
                </div>
              );
            })}
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="flex-1 flex flex-col min-h-0 relative">
            
            {/* STEP 1: DRAW BOUNDARY */}
            <div className={step === 1 ? 'flex flex-col flex-1 relative min-h-[60vh]' : 'hidden'}>
              <div className="absolute inset-0 z-0">
                <FarmDrawingMap
                  center={position}
                  onGeometryChange={(geom, area, centroid) => {
                    setGeometry(geom);
                    setAreaHectares(area);
                    if (centroid) {
                      setPosition(centroid);
                    }
                  }}
                  readOnly={false}
                />
              </div>
              
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur rounded-full px-4 sm:px-6 py-2 shadow-md z-[400] text-xs sm:text-sm font-medium text-gray-800 border border-gray-200 w-[90%] sm:w-auto text-center pointer-events-none">
                Tap points on the map to draw your field boundary.
              </div>
            </div>

            {/* STEP 2: FARM DETAILS */}
            <div className={step === 2 ? 'block p-6' : 'hidden'}>
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Details */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 border-b border-gray-100 pb-2">Location Information</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Farm Name</label>
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Hacienda San Jose" className="w-full bg-white border border-gray-300 text-gray-800 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Zone Name</label>
                      <input type="text" value={zoneName} onChange={(e) => setZoneName(e.target.value)} placeholder="e.g. Zone A (North Field)" className="w-full bg-white border border-gray-300 text-gray-800 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Municipality</label>
                        <input type="text" readOnly value={municipality} className="w-full bg-gray-100 border border-gray-200 text-gray-600 rounded-lg px-3 py-2 text-sm cursor-not-allowed" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Barangay</label>
                        <input type="text" value={barangay} onChange={(e) => setBarangay(e.target.value)} className="w-full bg-white border border-gray-300 text-gray-800 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" />
                      </div>
                    </div>
                  </div>

                  {/* Cropping System */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 border-b border-gray-100 pb-2">Crop Details</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cropping System</label>
                      <select value={croppingSystem} onChange={e => setCroppingSystem(e.target.value)} className="w-full bg-white border border-gray-300 text-gray-800 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all">
                        <option value="monocrop">Monocrop (Single Crop)</option>
                        <option value="intercrop">Intercrop (Mixed Planting)</option>
                        <option value="rotation">Rotation Crop</option>
                      </select>
                    </div>

                    <div className="space-y-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                      {croppingSystem === 'monocrop' && (
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Select Crop</label>
                          <select value={crop1} onChange={(e) => setCrop1(e.target.value)} className="w-full bg-white border border-gray-300 text-gray-800 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none">
                            <option value="" disabled>Select Crop...</option>
                            {crops?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                          </select>
                        </div>
                      )}
                      
                      {croppingSystem === 'intercrop' && (
                        <>
                          <div className="flex gap-2">
                            <div className="flex-1">
                              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Primary Crop</label>
                              <select value={crop1} onChange={(e) => setCrop1(e.target.value)} className="w-full bg-white border border-gray-300 text-gray-800 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none">
                                <option value="" disabled>Select Primary Crop...</option>
                                {crops?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                              </select>
                            </div>
                            <div className="w-20">
                              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">%</label>
                              <input type="number" min="1" max="99" value={percentage1} onChange={(e) => setPercentage1(Number(e.target.value))} className="w-full bg-white border border-gray-300 text-gray-800 rounded-lg px-2 py-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none" />
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <div className="flex-1">
                              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Secondary Crop</label>
                              <select value={crop2} onChange={(e) => setCrop2(e.target.value)} className="w-full bg-white border border-gray-300 text-gray-800 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none">
                                <option value="" disabled>Select Secondary Crop...</option>
                                {crops?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                              </select>
                            </div>
                            <div className="w-20">
                              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">%</label>
                              <input type="number" min="1" max="99" value={percentage2} onChange={(e) => setPercentage2(Number(e.target.value))} className="w-full bg-white border border-gray-300 text-gray-800 rounded-lg px-2 py-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none" />
                            </div>
                          </div>
                        </>
                      )}

                      {croppingSystem === 'rotation' && (
                        <>
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Season 1 Crop</label>
                            <select value={crop1} onChange={(e) => setCrop1(e.target.value)} className="w-full bg-white border border-gray-300 text-gray-800 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none">
                              <option value="">Choose crop...</option>
                              <option value="" disabled>Select First Crop...</option>
                              {crops?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Season 2 Crop</label>
                            <select value={crop2} onChange={(e) => setCrop2(e.target.value)} className="w-full bg-white border border-gray-300 text-gray-800 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none">
                              <option value="" disabled>Select Next Crop...</option>
                              {crops?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                          </div>
                        </>
                      )}

                      {prdpLabel && (
                        <div className="bg-brand-100 text-brand-800 text-xs font-semibold px-2 py-1.5 rounded mt-2 flex items-center gap-2 border border-brand-200">
                          <Sprout className="w-3 h-3" />
                          PRDP Label: {prdpLabel}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any observations about soil or conditions..."
                    className="w-full bg-white border border-gray-300 text-gray-800 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all resize-none h-20"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* STEP 3: REVIEW */}
            <div className={step === 3 ? 'block p-6' : 'hidden'}>
              <div className="max-w-2xl mx-auto text-center py-6">
                <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Review Your Farm details</h2>
                <p className="text-gray-500 text-sm mb-8">Please confirm the details below before submitting for verification.</p>
                
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 text-left space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Farm Name</p>
                      <p className="text-sm font-semibold text-gray-800">{name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Zone Name</p>
                      <p className="text-sm font-semibold text-gray-800">{zoneName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Location</p>
                      <p className="text-sm font-semibold text-gray-800">{barangay}, {municipality}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Calculated Area</p>
                      <p className="text-sm font-semibold text-brand-600">{areaHectares.toFixed(4)} Hectares</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Cropping Setup</p>
                    <p className="text-sm font-semibold text-gray-800 capitalize">{croppingSystem}</p>
                    {prdpLabel && <p className="text-sm text-brand-600 font-medium mt-1 prdp-label">{prdpLabel}</p>}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* BOTTOM ACTION BAR */}
          <div className="bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-between shrink-0">
            {step === 1 ? (
              <div className="text-brand-700 bg-brand-50 px-4 py-2 rounded-lg font-semibold text-sm border border-brand-100 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Calculated Area: {areaHectares.toFixed(4)} ha
              </div>
            ) : (
              <button 
                onClick={() => setStep(step - 1)}
                className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-4 py-2 rounded-lg font-medium text-sm transition-colors"
              >
                Back
              </button>
            )}

            {step < 3 ? (
              <button 
                onClick={handleNextStep}
                className="ml-auto bg-brand-500 hover:bg-brand-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-colors"
              >
                Next Step
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                disabled={createFarmMutation.isPending || createZoneMutation.isPending}
                className="ml-auto bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-green transition-all flex items-center gap-2"
              >
                {(createFarmMutation.isPending || createZoneMutation.isPending) ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                Submit for Verification
              </button>
            )}
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
