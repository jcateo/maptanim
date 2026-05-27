import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { LayoutTemplate, Save, GripVertical, Trash2, MapPin, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useLocation } from 'wouter';
import { trpc } from '../../lib/trpc';
import { MapContainer, TileLayer, Polygon, useMap } from 'react-leaflet';
import L from 'leaflet';

function MapUpdater({ geometry }: { geometry: any }) {
  const map = useMap();
  useEffect(() => {
    if (geometry && geometry.coordinates && geometry.coordinates.length > 0) {
       try {
         // GeoJSON polygon coordinates are typically [[[lng, lat], [lng, lat]...]]
         const coords = geometry.type === 'Polygon' ? geometry.coordinates[0] : geometry.coordinates[0][0];
         if (coords) {
            const latLngs = coords.map((c: any) => [c[1], c[0]]);
            map.fitBounds(latLngs, { padding: [20, 20] });
         }
       } catch (e) {
         console.error("Failed to fit bounds", e);
       }
    }
  }, [geometry, map]);
  return null;
}

const EMOJI_MAP: Record<string, string> = {
  'Kamatis': '🍅',
  'Talong': '🍆',
  'Kalabasa': '🎃',
  'Ampalaya': '🥒',
  'Sitaw': '🫘',
  'Letsugas': '🥬',
  'Pechay': '🥬',
  'Okra': '🌶️',
  'Sibuyas': '🧅',
  'Bawang': '🧄',
  'Siling Labuyo': '🌶️',
};

export default function LayoutBuilder() {
  const infrastructureTools = [
    { name: 'Irrigation Line', emoji: '💧', type: 'infrastructure' },
    { name: 'Walkway', emoji: '🛣️', type: 'infrastructure' },
  ];

  // 10x10 Grid state
  const [grid, setGrid] = useState<({ tool: any } | null)[][]>(
    Array(10).fill(null).map(() => Array(10).fill(null))
  );

  const [selectedTool, setSelectedTool] = useState<any>(null);
  const [selectedZoneId, setSelectedZoneId] = useState<number | ''>('');
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const zId = params.get('zoneId');
    if (zId) {
      setSelectedZoneId(parseInt(zId));
    }
  }, []);

  const { data: farms, isLoading: isLoadingFarms } = trpc.farms.listWithDetails.useQuery();
  
  const selectedFarm = farms?.find(f => f.zones?.some((z: any) => z.id === selectedZoneId));
  
  const { data: plans, isLoading: isLoadingPlans, refetch: refetchPlans } = trpc.farmOps.listPlansByFarm.useQuery(
    { farmId: selectedFarm?.id || 0 },
    { enabled: !!selectedFarm?.id }
  );

  const createPlan = trpc.farmOps.createPlan.useMutation();
  const updatePlan = trpc.farmOps.updatePlan.useMutation();

  const { data: crops } = trpc.crops.list.useQuery();

  const activePlan = plans?.find((p: any) => p.zoneId === selectedZoneId);
  const activeZone = selectedFarm?.zones?.find((z: any) => z.id === selectedZoneId);

  // Compute dynamic tools based on crops
  const cropTools = (crops || []).map(c => ({
    name: c.name,
    emoji: EMOJI_MAP[c.name] || '🌱',
    type: 'vegetable'
  }));

  let assignedCropNames: string[] = [];
  if (activeZone?.prdpLabel) {
    const base = activeZone.prdpLabel.split(' (')[0];
    assignedCropNames = base.split('_').map((n: string) => n.trim().toLowerCase());
  } else if (activeZone?.name) {
    assignedCropNames = [activeZone.name.toLowerCase()];
  }

  const assignedTools = cropTools.filter(t => assignedCropNames.includes(t.name.toLowerCase()));
  const otherTools = cropTools.filter(t => !assignedCropNames.includes(t.name.toLowerCase()));

  // Parse active geometry
  let activeGeometry = null;
  if (activeZone?.geometry) {
    try {
      activeGeometry = typeof activeZone.geometry === 'string' ? JSON.parse(activeZone.geometry) : activeZone.geometry;
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (selectedZoneId) {
      if (activePlan && activePlan.layoutConfig) {
        let config = activePlan.layoutConfig;
        if (typeof config === 'string') {
          try {
            config = JSON.parse(config);
          } catch (e) {
            console.error("Failed to parse layoutConfig:", e);
          }
        }
        if (Array.isArray(config)) {
          setGrid(config as any);
        } else {
          setGrid(Array(10).fill(null).map(() => Array(10).fill(null)));
        }
      } else {
        setGrid(Array(10).fill(null).map(() => Array(10).fill(null)));
      }
    }
  }, [activePlan, selectedZoneId]);

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    if (!selectedTool) {
      if (grid[rowIndex][colIndex] !== null) {
         // Erase if clicked without a tool selected
         const newGrid = [...grid];
         newGrid[rowIndex][colIndex] = null;
         setGrid(newGrid);
      }
      return;
    }

    const newGrid = [...grid];
    newGrid[rowIndex][colIndex] = { tool: selectedTool };
    setGrid(newGrid);
  };

  const handleSave = async () => {
    if (!selectedZoneId || !selectedFarm) {
      toast.error('Please select a Zone first');
      return;
    }

    const isNotEmpty = grid.some(row => row.some(cell => cell !== null));
    if (!isNotEmpty) {
      toast.error('Cannot save an empty layout');
      return;
    }

    try {
      if (activePlan) {
        await updatePlan.mutateAsync({
          id: activePlan.id,
          layoutConfig: grid
        });
      } else {
        await createPlan.mutateAsync({
          farmId: selectedFarm.id,
          zoneId: selectedZoneId as number,
          layoutConfig: grid
        });
      }
      toast.success('Zone layout saved! Generating operation schedule...', { duration: 3000 });
      refetchPlans();
      setTimeout(() => setLocation('/calendar'), 1500);
    } catch (error) {
      toast.error('Failed to save layout');
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto h-[calc(100vh-80px)] flex flex-col font-inter">
        
        {/* HEADER */}
        <div className="mb-6 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Zone Layout Builder</h1>
            <p className="text-sm text-gray-500 mt-1">
              Design your crop placement and farm infrastructure visually. Select a tool and click on the grid.
            </p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-4 w-4 text-gray-400" />
              </div>
              <select
                value={selectedZoneId}
                onChange={(e) => setSelectedZoneId(e.target.value ? parseInt(e.target.value) : '')}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-brand-500 focus:border-brand-500 bg-white"
              >
                <option value="" disabled>Select a Zone to edit...</option>
                {farms?.map((farm: any) => (
                  <optgroup key={farm.id} label={farm.name}>
                    {farm.zones?.map((zone: any) => (
                      <option key={zone.id} value={zone.id}>
                        {zone.name || `Zone ${zone.id}`} ({parseFloat(zone.areaHectares || "0").toFixed(2)} ha)
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <button 
              onClick={handleSave}
              disabled={!selectedZoneId || createPlan.isPending || updatePlan.isPending}
              className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm"
            >
              {(createPlan.isPending || updatePlan.isPending) ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Finalize Layout & Generate Schedule
            </button>
          </div>
        </div>

        {/* TWO COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          
          {/* LEFT: CANVAS (col-span-2) */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col h-full overflow-hidden">
            <h2 className="text-sm font-semibold text-gray-800 mb-4 flex items-center justify-between shrink-0">
              <span className="flex items-center gap-2">
                <LayoutTemplate className="w-4 h-4 text-brand-500" />
                Interactive Canvas
              </span>
              <button 
                onClick={() => setGrid(Array(10).fill(null).map(() => Array(10).fill(null)))}
                className="text-xs text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear
              </button>
            </h2>
            
            <div className="flex-1 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center p-4 overflow-auto relative">
              {!selectedZoneId && (
                <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-[2px] flex items-center justify-center rounded-xl">
                  <div className="bg-white px-6 py-4 rounded-xl shadow-md border border-gray-200 text-center">
                    <MapPin className="w-8 h-8 text-brand-400 mx-auto mb-2" />
                    <p className="text-sm font-bold text-gray-700">Please select a zone first</p>
                    <p className="text-xs text-gray-500 mt-1">Use the dropdown menu above to select a zone to edit.</p>
                  </div>
                </div>
              )}
              {/* Map Background */}
              {selectedZoneId && activeGeometry && (
                <div className="absolute inset-0 z-0 rounded-xl overflow-hidden pointer-events-none opacity-60">
                   <MapContainer 
                    center={[10.6765, 122.9509]} 
                    zoom={16} 
                    className="w-full h-full"
                    zoomControl={false}
                    dragging={false}
                    scrollWheelZoom={false}
                    doubleClickZoom={false}
                  >
                    <TileLayer
                      url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                      attribution="Tiles &copy; Esri"
                    />
                    <Polygon 
                      positions={activeGeometry.type === 'Polygon' ? activeGeometry.coordinates[0].map((c: any) => [c[1], c[0]]) : activeGeometry.coordinates[0][0].map((c: any) => [c[1], c[0]])}
                      pathOptions={{ color: '#22c55e', weight: 3, fillColor: '#22c55e', fillOpacity: 0.2 }}
                    />
                    <MapUpdater geometry={activeGeometry} />
                  </MapContainer>
                </div>
              )}

              <div 
                className={`relative z-10 grid gap-[1px] rounded shadow-sm transition-opacity ${!selectedZoneId ? 'opacity-30' : 'opacity-100'} ${activeGeometry ? 'border-2 border-white/50 backdrop-blur-sm bg-white/20' : 'bg-gray-200 border border-gray-300'}`}
                style={{ gridTemplateColumns: 'repeat(10, minmax(40px, 1fr))' }}
              >
                {Array.isArray(grid) && grid.map((row, rowIndex) => (
                  Array.isArray(row) && row.map((cell, colIndex) => (
                    <div 
                      key={`${rowIndex}-${colIndex}`}
                      onClick={() => {
                        if (selectedZoneId) handleCellClick(rowIndex, colIndex);
                      }}
                      className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 ${activeGeometry ? (cell ? 'bg-white/80' : 'bg-white/10 hover:bg-white/30') : 'bg-white'} ${selectedZoneId ? (activeGeometry ? 'cursor-pointer' : 'hover:bg-brand-50 cursor-pointer') : 'cursor-not-allowed'} transition-colors flex items-center justify-center text-2xl ${
                        cell ? 'shadow-inner scale-[0.98]' : ''
                      }`}
                    >
                      {cell ? cell.tool.emoji : ''}
                    </div>
                  ))
                ))}
              </div>

            </div>
          </div>

          {/* RIGHT: TOOLBOX (col-span-1) */}
          <div className="lg:col-span-1 bg-white border border-gray-200 rounded-xl p-5 shadow-sm h-full overflow-y-auto">
            <h2 className="text-sm font-semibold text-gray-800 mb-4">Toolbox</h2>
            <p className="text-xs text-gray-500 mb-4">Click a tool below to select it, then click the grid to place. Click an empty tool to enable erase mode.</p>
            
            <div className="space-y-6">
              
              <div 
                onClick={() => setSelectedTool(null)}
                className={`bg-white border ${!selectedTool ? 'border-red-500 shadow-sm bg-red-50' : 'border-gray-200 hover:border-gray-300'} rounded-lg p-3 flex items-center gap-3 cursor-pointer transition-all mb-4`}
              >
                <Trash2 className={`w-4 h-4 ${!selectedTool ? 'text-red-500' : 'text-gray-400'} shrink-0`} />
                <span className={`text-sm font-semibold ${!selectedTool ? 'text-red-700' : 'text-gray-600'}`}>Eraser</span>
              </div>

              {/* Crops Category */}
              <div>
                {assignedTools.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-3 pb-2 border-b border-brand-100 flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5" /> Assigned to this Zone
                    </h3>
                    <div className="space-y-2">
                      {assignedTools.map(tool => (
                        <div 
                          key={tool.name} 
                          onClick={() => setSelectedTool(tool)}
                          className={`bg-white border ${selectedTool?.name === tool.name ? 'border-brand-500 ring-1 ring-brand-500 shadow-sm bg-brand-50' : 'border-gray-200 hover:border-brand-300'} rounded-lg p-3 flex items-center gap-3 cursor-pointer transition-all`}
                        >
                          <GripVertical className="w-4 h-4 text-gray-300 shrink-0" />
                          <div className="w-8 h-8 bg-gray-50 rounded flex items-center justify-center text-xl shrink-0">
                            {tool.emoji}
                          </div>
                          <span className="text-sm font-semibold text-gray-700">{tool.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 pb-2 border-b border-gray-100">Other Crops & Plants</h3>
                <div className="space-y-2">
                  {otherTools.map(tool => (
                    <div 
                      key={tool.name} 
                      onClick={() => setSelectedTool(tool)}
                      className={`bg-white border ${selectedTool?.name === tool.name ? 'border-brand-500 ring-1 ring-brand-500 shadow-sm bg-brand-50' : 'border-gray-200 hover:border-brand-300'} rounded-lg p-3 flex items-center gap-3 cursor-pointer transition-all`}
                    >
                      <GripVertical className="w-4 h-4 text-gray-300 shrink-0" />
                      <div className="w-8 h-8 bg-gray-50 rounded flex items-center justify-center text-xl shrink-0">
                        {tool.emoji}
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{tool.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Infrastructure Category */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 pb-2 border-b border-gray-100">Infrastructure</h3>
                <div className="space-y-2">
                  {infrastructureTools.map(tool => (
                    <div 
                      key={tool.name} 
                      onClick={() => setSelectedTool(tool)}
                      className={`bg-white border ${selectedTool?.name === tool.name ? 'border-blue-500 ring-1 ring-blue-500 shadow-sm bg-blue-50' : 'border-gray-200 hover:border-blue-300'} rounded-lg p-3 flex items-center gap-3 cursor-pointer transition-all`}
                    >
                      <GripVertical className="w-4 h-4 text-gray-300 shrink-0" />
                      <div className="w-8 h-8 bg-sky-50 rounded flex items-center justify-center text-xl shrink-0">
                        {tool.emoji}
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{tool.name}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </DashboardLayout>
  );
}
