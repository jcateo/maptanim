import React, { useMemo, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { ThermometerSun, Droplets, CloudRain, Sun, Cloud, Wind, Clock, Loader2, Leaf, MapPin, Sprout } from 'lucide-react';
import { trpc } from '../../lib/trpc';

export default function Monitoring() {
  const { data: weather, isLoading } = trpc.weather.getForecast.useQuery({});
  const { data: farms } = trpc.farms.listWithDetails.useQuery();
  const { data: crops } = trpc.crops.list.useQuery();

  const [selectedFarmId, setSelectedFarmId] = useState<number>(0);
  const resolvedFarmId = selectedFarmId || farms?.[0]?.id || 0;
  const selectedFarm = farms?.find((f: any) => f.id === resolvedFarmId) || farms?.[0];

  const zones = (selectedFarm?.zones || []) as any[];
  const [selectedZoneId, setSelectedZoneId] = useState<number>(0);
  const resolvedZoneId = selectedZoneId || zones?.[0]?.id || 0;
  const selectedZone = zones?.find((z: any) => z.id === resolvedZoneId) || zones?.[0];

  const { data: plans } = trpc.farmOps.listPlansByFarm.useQuery(
    { farmId: resolvedFarmId },
    { enabled: resolvedFarmId > 0 }
  );
  const activePlanForZone = useMemo(() => {
    if (!plans || !selectedZone) return null;
    return (plans as any[]).find(p => p.zoneId === selectedZone.id) || null;
  }, [plans, selectedZone]);

  const formatTime = (timeStr: string) => {
    return new Date(timeStr).toLocaleDateString('en-US', { weekday: 'short' });
  };

  const zoneCropNames = useMemo(() => {
    if (!selectedZone) return [];
    if (selectedZone.prdpLabel) {
      const base = selectedZone.prdpLabel.split(' (')[0];
      return base.split('_').map((n: string) => n.trim()).filter(Boolean);
    }
    if (selectedZone.name) return [selectedZone.name];
    return [];
  }, [selectedZone]);

  const cropMaturationDays = useMemo(() => {
    const map = new Map<string, number>();
    (crops || []).forEach((c: any) => {
      if (c?.name) map.set(String(c.name).toLowerCase(), Number(c.maturationDays || 0));
    });
    return map;
  }, [crops]);

  const computedStatus = useMemo(() => {
    if (!activePlanForZone?.createdAt) {
      return { status: "No plan yet", badge: "bg-gray-100 text-gray-600", daysLeft: null as number | null, harvestDate: null as Date | null };
    }
    const plantedAt = new Date(activePlanForZone.createdAt);
    const maxDays = Math.max(
      0,
      ...zoneCropNames.map(n => cropMaturationDays.get(n.toLowerCase()) || 0)
    );
    if (!maxDays) {
      return { status: "Growing", badge: "bg-amber-100 text-amber-700", daysLeft: null as number | null, harvestDate: null as Date | null };
    }
    const harvest = new Date(plantedAt);
    harvest.setDate(harvest.getDate() + maxDays);
    const daysLeft = Math.ceil((harvest.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    if (daysLeft <= 0) {
      return { status: "Ready to harvest", badge: "bg-emerald-100 text-emerald-700", daysLeft: 0, harvestDate: harvest };
    }
    return { status: "Still growing", badge: "bg-brand-100 text-brand-700", daysLeft, harvestDate: harvest };
  }, [activePlanForZone, cropMaturationDays, zoneCropNames]);

  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto h-full flex flex-col font-inter">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Environmental Monitoring</h1>
          <p className="text-sm text-gray-500 mt-1">Select a plot/zone to monitor crop status and farm conditions</p>
        </div>

        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-brand-500" />
            <span className="ml-3 text-gray-500 font-medium">Fetching live environmental data...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
          
          {/* LEFT: CURRENT CONDITIONS */}
          <div className="lg:col-span-2 space-y-6">
            {/* Plot/Zone selector */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand-500" />
                    Plot / Zone Monitoring
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">Pick a farm and zone to track growth and harvest readiness.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <select
                    value={resolvedFarmId || ""}
                    onChange={(e) => {
                      const newFarmId = parseInt(e.target.value);
                      setSelectedFarmId(newFarmId);
                      setSelectedZoneId(0);
                    }}
                    className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    {(farms || []).map((f: any) => (
                      <option key={f.id} value={f.id}>
                        {f.name}
                      </option>
                    ))}
                  </select>

                  <select
                    value={resolvedZoneId || ""}
                    onChange={(e) => setSelectedZoneId(parseInt(e.target.value))}
                    className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                    disabled={!zones?.length}
                  >
                    {zones?.length ? zones.map((z: any) => (
                      <option key={z.id} value={z.id}>
                        {z.name || `Zone ${z.id}`}
                      </option>
                    )) : (
                      <option value="">No zones</option>
                    )}
                  </select>
                </div>
              </div>

              {!selectedFarm ? (
                <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
                  <Leaf className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-700">No farm found</p>
                  <p className="text-xs text-gray-500 mt-1">Create a farm and zones to start monitoring plots.</p>
                </div>
              ) : !selectedZone ? (
                <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
                  <Sprout className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-700">No zones in this farm</p>
                  <p className="text-xs text-gray-500 mt-1">Add zones (plots) so you can monitor plant growth per area.</p>
                </div>
              ) : (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Selected Zone</p>
                    <p className="text-lg font-bold text-gray-800 mt-1">{selectedZone.name || `Zone ${selectedZone.id}`}</p>
                    <p className="text-xs text-gray-500 mt-1">{parseFloat(selectedZone.areaHectares || "0").toFixed(2)} ha</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Crop Setup</p>
                    <p className="text-sm font-semibold text-gray-800 mt-1">{selectedZone.prdpLabel || "Not assigned"}</p>
                    <p className="text-xs text-gray-500 mt-1">{zoneCropNames.length ? zoneCropNames.join(", ") : "—"}</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Plant Status</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${computedStatus.badge}`}>
                        {computedStatus.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {computedStatus.harvestDate
                        ? `Expected harvest: ${computedStatus.harvestDate.toLocaleDateString()}${computedStatus.daysLeft !== null ? ` (${computedStatus.daysLeft} day(s) left)` : ""}`
                        : "Expected harvest will appear after a plan is generated."}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-semibold text-gray-800">Current Farm Conditions</h2>
                <div className="flex items-center gap-1.5 text-xs font-medium text-brand-600 bg-brand-50 px-3 py-1.5 rounded-full">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                  </span>
                  Live Data
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Temperature */}
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col items-center justify-center text-center">
                  <ThermometerSun className="w-8 h-8 text-red-500 mb-3" />
                  <p className="text-sm font-semibold text-gray-800">Temperature</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{weather?.current?.temperature_2m || 0}°C</p>
                  <div className="w-full border-t border-gray-100 mt-4 pt-3 flex items-center justify-center gap-1.5 text-[11px] text-gray-400 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    Live sync
                  </div>
                </div>

                {/* Humidity */}
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col items-center justify-center text-center">
                  <Wind className="w-8 h-8 text-sky-500 mb-3" />
                  <p className="text-sm font-semibold text-gray-800">Humidity</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{weather?.current?.relative_humidity_2m || 0}%</p>
                  <div className="w-full border-t border-gray-100 mt-4 pt-3 flex items-center justify-center gap-1.5 text-[11px] text-gray-400 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    Live sync
                  </div>
                </div>

                {/* Rainfall */}
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col items-center justify-center text-center">
                  <CloudRain className="w-8 h-8 text-blue-500 mb-3" />
                  <p className="text-sm font-semibold text-gray-800">Rainfall (Current)</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{weather?.current?.precipitation || 0} mm</p>
                  <div className="w-full border-t border-gray-100 mt-4 pt-3 flex items-center justify-center gap-1.5 text-[11px] text-gray-400 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    Live sync
                  </div>
                </div>

                {/* Soil Moisture */}
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col items-center justify-center text-center">
                  <Droplets className="w-8 h-8 text-earth-600 mb-3" />
                  <p className="text-sm font-semibold text-gray-800">Surface Soil Moisture</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{Math.round((weather?.current?.soil_moisture_0_to_1cm || 0) * 100)}%</p>
                  <div className="w-full border-t border-gray-100 mt-4 pt-3 flex items-center justify-center gap-1.5 text-[11px] text-gray-400 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    Live sync
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: WEATHER FORECAST */}
          <div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-base font-semibold text-gray-800 mb-5">5-Day Forecast</h2>
              
              <div className="space-y-4">
                {weather?.daily?.time?.slice(0, 5).map((time: string, index: number) => {
                  const maxTemp = weather.daily.temperature_2m_max[index];
                  const minTemp = weather.daily.temperature_2m_min[index];
                  const rainProb = weather.daily.precipitation_probability_max[index];
                  const isToday = index === 0;

                  return (
                    <div key={time} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="w-20">
                        <span className={`text-sm ${isToday ? 'font-semibold text-gray-800' : 'font-medium text-gray-600'}`}>
                          {isToday ? 'Today' : formatTime(time)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {rainProb > 50 ? (
                          <CloudRain className="w-5 h-5 text-blue-500" />
                        ) : rainProb > 20 ? (
                          <Cloud className="w-5 h-5 text-gray-400" />
                        ) : (
                          <Sun className="w-5 h-5 text-amber-500" />
                        )}
                        <span className="text-sm font-medium text-gray-600 w-16 text-center">{Math.round(maxTemp)}° / {Math.round(minTemp)}°</span>
                      </div>
                      <div className="bg-brand-50 text-brand-700 px-2 py-1 rounded text-xs font-semibold w-12 text-center">
                        {rainProb}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </DashboardLayout>
  );
}
