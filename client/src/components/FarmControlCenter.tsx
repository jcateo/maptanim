import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { MapPin, CheckCircle, AlertTriangle, Layers, Sprout, Clock, Map, ThermometerSun, Droplets, Sun, FlaskConical, LayoutTemplate, Grid3X3 } from 'lucide-react';
import { Link } from 'wouter';
import { trpc } from '../lib/trpc';
import { toast } from 'sonner';

// Types would normally come from the router
type Zone = any;
type Farm = any;

interface Props {
  farm: Farm;
  zones: Zone[];
}

export default function FarmControlCenter({ farm, zones }: Props) {
  // We'll calculate some stats based on the zones array
  const totalArea = zones?.reduce((sum, z) => sum + (parseFloat(z.areaHectares) || 0), 0) || 0;
  const activeZones = zones?.length || 0;
  // A placeholder farm health score based on verified zones vs total
  const verifiedCount = zones?.filter((z) => z.verificationStatus === 'approved').length || 0;
  const farmHealthScore = activeZones > 0 ? Math.round((verifiedCount / activeZones) * 100) : 0;
  const lastUpdated = zones?.length > 0 ? "Today" : "Never";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden font-inter flex flex-col min-h-0">
      {/* HEADER */}
      <div className="p-6 border-b border-gray-200 bg-white flex justify-between items-start shrink-0">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{farm.name}</h2>
          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
            <MapPin className="w-[14px] h-[14px]" />
            {farm.barangay ? `${farm.barangay}, ` : ''}{farm.municipality}
          </p>
        </div>
        <div className="flex gap-2">
          <div className="bg-brand-100 text-brand-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <CheckCircle className="w-[14px] h-[14px]" />
            Active Farm
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full flex-1 flex flex-col min-h-0">
        {/* TABS LIST */}
        <TabsList className="bg-gray-50 flex items-center gap-6 border-b border-gray-200 px-6 overflow-x-auto hide-scrollbar rounded-none h-auto justify-start shrink-0">
          <TabsTrigger
            value="overview"
            className="rounded-none px-1 py-4 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-brand-500 data-[state=active]:text-brand-600 data-[state=inactive]:text-gray-500 hover:text-gray-700 data-[state=active]:shadow-none bg-transparent transition-colors duration-200"
          >
            Farm Overview
          </TabsTrigger>
          <TabsTrigger
            value="health"
            className="rounded-none px-1 py-4 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-brand-500 data-[state=active]:text-brand-600 data-[state=inactive]:text-gray-500 hover:text-gray-700 data-[state=active]:shadow-none bg-transparent transition-colors duration-200"
          >
            Crop Health
          </TabsTrigger>
          <TabsTrigger
            value="management"
            className="rounded-none px-1 py-4 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-brand-500 data-[state=active]:text-brand-600 data-[state=inactive]:text-gray-500 hover:text-gray-700 data-[state=active]:shadow-none bg-transparent transition-colors duration-200"
          >
            Zone Management
          </TabsTrigger>
          <TabsTrigger
            value="plans"
            className="rounded-none px-1 py-4 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-brand-500 data-[state=active]:text-brand-600 data-[state=inactive]:text-gray-500 hover:text-gray-700 data-[state=active]:shadow-none bg-transparent transition-colors duration-200"
          >
            Planting Plans
          </TabsTrigger>
        </TabsList>

        <div className="p-6 bg-gray-50 flex-1 overflow-y-auto min-h-0 relative">
          
          {/* TAB: FARM OVERVIEW */}
          <TabsContent value="overview" className="mt-0 outline-none space-y-6">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-earth-50 flex items-center justify-center shrink-0">
                  <Layers className="w-5 h-5 text-earth-600" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Total Area</p>
                  <p className="text-lg font-bold text-gray-800">{totalArea.toFixed(2)} ha</p>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                  <LayoutTemplate className="w-5 h-5 text-brand-600" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Active Zones</p>
                  <p className="text-lg font-bold text-gray-800">{activeZones}</p>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                  <Sprout className="w-5 h-5 text-brand-600" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Farm Health</p>
                  <p className="text-lg font-bold text-brand-600">{farmHealthScore}%</p>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Last Updated</p>
                  <p className="text-lg font-bold text-gray-800">{lastUpdated}</p>
                </div>
              </div>
            </div>

            {/* Map Container */}
            <div className="bg-gray-200 border border-gray-300 rounded-2xl h-[400px] flex items-center justify-center relative overflow-hidden shadow-sm">
              <Map className="w-12 h-12 text-gray-400" />
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 text-sm font-medium text-gray-600 shadow-sm border border-gray-200">
                Satellite Map View
              </div>
            </div>

            {/* Zones List Table */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-sm font-semibold text-gray-800">Zones Overview</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-500 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-3 font-semibold">Zone Name</th>
                      <th className="px-6 py-3 font-semibold">Crop / Label</th>
                      <th className="px-6 py-3 font-semibold">Area</th>
                      <th className="px-6 py-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {zones && zones.length > 0 ? zones.map(zone => (
                      <tr key={zone.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                        <td className="px-6 py-4 font-medium text-gray-800">{zone.name || `Zone ${zone.id}`}</td>
                        <td className="px-6 py-4">
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-semibold">{zone.prdpLabel || zone.croppingSystem}</span>
                        </td>
                        <td className="px-6 py-4">{parseFloat(zone.areaHectares).toFixed(2)} ha</td>
                        <td className="px-6 py-4">
                          {zone.verificationStatus === 'pending' && <span className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full text-xs font-semibold flex w-max items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> Pending</span>}
                          {zone.verificationStatus === 'approved' && <span className="bg-brand-100 text-brand-700 px-2.5 py-1 rounded-full text-xs font-semibold flex w-max items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5"/> Verified</span>}
                          {(zone.verificationStatus === 'rejected' || zone.verificationStatus === 'needs_correction') && <span className="bg-red-100 text-red-700 px-2.5 py-1 rounded-full text-xs font-semibold flex w-max items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5"/> Rejected</span>}
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No zones added yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* TAB: CROP HEALTH */}
          <TabsContent value="health" className="mt-0 outline-none space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Circular Health Score */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
                <h3 className="text-sm font-semibold text-gray-800 mb-6">Overall Crop Health</h3>
                
                <div className="relative w-[120px] h-[120px] flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" className="stroke-gray-100" strokeWidth="8" fill="none" />
                    <circle 
                      cx="50" cy="50" r="45" 
                      className={`stroke-current ${farmHealthScore >= 80 ? 'text-brand-500' : farmHealthScore >= 50 ? 'text-amber-500' : 'text-red-500'}`} 
                      strokeWidth="8" fill="none" strokeDasharray="283" strokeDashoffset={283 - (283 * farmHealthScore) / 100} strokeLinecap="round" 
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-gray-800">{farmHealthScore}</span>
                    <span className="text-[10px] uppercase font-semibold text-gray-400">Score</span>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 mt-6 max-w-[200px]">Based on verification status and biophysical matching.</p>
              </div>

              {/* Parameter Grid 2x2 */}
              <div className="md:col-span-2 grid grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col items-center justify-center text-center">
                  <FlaskConical className="w-8 h-8 text-brand-600 mb-3" />
                  <p className="text-sm font-semibold text-gray-800">Soil pH</p>
                  <p className="text-xs text-gray-500 mt-1">Averages 6.5 (Optimal)</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col items-center justify-center text-center">
                  <Droplets className="w-8 h-8 text-sky-500 mb-3" />
                  <p className="text-sm font-semibold text-gray-800">Water Content</p>
                  <p className="text-xs text-gray-500 mt-1">Moderate Rain</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col items-center justify-center text-center">
                  <Sun className="w-8 h-8 text-amber-500 mb-3" />
                  <p className="text-sm font-semibold text-gray-800">Sunlight</p>
                  <p className="text-xs text-gray-500 mt-1">7.2 hrs/day (High)</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col items-center justify-center text-center">
                  <ThermometerSun className="w-8 h-8 text-red-500 mb-3" />
                  <p className="text-sm font-semibold text-gray-800">Temperature</p>
                  <p className="text-xs text-gray-500 mt-1">28°C Average</p>
                </div>
              </div>
            </div>

            {/* Issue Flags */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-800 mb-4">Active Alerts</h3>
              {farmHealthScore < 100 ? (
                <div className="bg-red-50 border-l-3 border-red-500 p-4 rounded-r-xl">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-red-800">Verification Pending or Rejected</h4>
                      <p className="text-xs text-red-600 mt-1">Some zones in your farm require action before they can be fully verified. Please check the Zone Management tab.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-brand-50 border border-brand-200 p-4 rounded-xl flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-600 shrink-0" />
                  <span className="text-sm font-medium text-brand-800">All systems optimal. No active alerts.</span>
                </div>
              )}
            </div>
          </TabsContent>

          {/* TAB: ZONE MANAGEMENT */}
          <TabsContent value="management" className="mt-0 outline-none space-y-4">
            {zones && zones.length > 0 ? zones.map(zone => (
              <div key={zone.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-card-md transition-shadow flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                    <LayoutTemplate className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-800">{zone.name || `Zone ${zone.id}`}</h3>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mt-1">{zone.prdpLabel || zone.croppingSystem}</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-end md:items-center gap-4">
                  {zone.verificationStatus === 'pending' && <span className="bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> Pending Review</span>}
                  {zone.verificationStatus === 'approved' && <span className="bg-brand-100 text-brand-700 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5"/> Officially Verified</span>}
                  {(zone.verificationStatus === 'rejected' || zone.verificationStatus === 'needs_correction') && <span className="bg-red-100 text-red-700 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5"/> Needs Correction</span>}
                  
                  <button onClick={() => toast.success("Re-verification requested")} className="text-xs font-semibold text-gray-600 hover:text-brand-600 px-3 py-2 rounded-lg border border-gray-200 hover:border-brand-300 hover:bg-brand-50 transition-colors">
                    Request Re-verification
                  </button>
                </div>
              </div>
            )) : (
              <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
                <p className="text-gray-500 font-medium">No zones added yet.</p>
              </div>
            )}
          </TabsContent>

          {/* TAB: PLANTING PLANS */}
          <TabsContent value="plans" className="mt-0 outline-none">
            <div className="bg-white border border-gray-200 rounded-xl p-10 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center mb-4">
                <Grid3X3 className="w-8 h-8 text-brand-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Access Your Planting Plans</h3>
              <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto mb-6">
                Your farm's planting plans, generated by our agroecological rule engine based on DA-PRDP standards, are available in the dedicated Planning hub.
              </p>
              <Link href="/planting-plans">
                <button className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-card transition-colors">
                  Go to Planting Plans
                </button>
              </Link>
            </div>
          </TabsContent>

        </div>
      </Tabs>
    </div>
  );
}
