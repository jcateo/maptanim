import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useAuth } from "../../contexts/AuthContext";
import { trpc } from "../../lib/trpc";
import { Sprout, MapPin, LayoutTemplate, CheckCircle, Clock, Plus, Grid3X3, BookOpen, MessageSquare } from "lucide-react";
import { Link } from "wouter";

export default function FarmerDashboard() {
  const { user } = useAuth();
  const { data: farms, isLoading } = trpc.farms.listWithDetails.useQuery();

  const firstName = user?.name?.split(' ')[0] || "Farmer";
  const hasFarms = farms && farms.length > 0;

  // Compute stats
  const totalArea = farms?.reduce((acc: number, farm: any) => acc + (parseFloat(farm.totalArea) || 0), 0) || 0;
  const totalZones = farms?.reduce((acc: number, farm: any) => acc + (farm.zoneCount || 0), 0) || 0;
  const verifiedZones = farms?.reduce((acc: number, farm: any) => acc + (farm.zones?.filter((z: any) => z.verificationStatus === 'approved').length || 0), 0) || 0;
  const pendingVerifications = farms?.reduce((acc: number, farm: any) => acc + (farm.zones?.filter((z: any) => z.verificationStatus === 'pending').length || 0), 0) || 0;

  // Generate Activity Feed
  const activities: any[] = [];
  if (farms) {
    farms.forEach((farm: any) => {
      activities.push({
        id: `farm-${farm.id}`,
        type: 'farm_created',
        title: 'Registered New Farm',
        description: `${farm.name} in ${farm.municipality}`,
        date: new Date(farm.createdAt),
        icon: MapPin,
        color: 'text-brand-600',
        bg: 'bg-brand-50'
      });
      if (farm.zones) {
        farm.zones.forEach((zone: any) => {
          activities.push({
            id: `zone-${zone.id}`,
            type: 'zone_created',
            title: 'Mapped New Crop Zone',
            description: `${zone.name || `Zone ${zone.id}`} (${zone.croppingSystem})`,
            date: new Date(zone.createdAt || farm.createdAt), // fallback if zone has no created date
            icon: LayoutTemplate,
            color: 'text-blue-600',
            bg: 'bg-blue-50'
          });
          if (zone.verificationStatus === 'verified') {
            activities.push({
              id: `zone-ver-${zone.id}`,
              type: 'zone_verified',
              title: 'Zone Verified',
              description: `${zone.name || `Zone ${zone.id}`} was approved by PRDP`,
              date: new Date(zone.updatedAt || new Date()), // mock updated date
              icon: CheckCircle,
              color: 'text-green-600',
              bg: 'bg-green-50'
            });
          }
        });
      }
    });
  }

  // Sort activities newest first
  activities.sort((a, b) => b.date.getTime() - a.date.getTime());
  const recentActivities = activities.slice(0, 5);

  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto">
        {/* FARM SUMMARY CARD */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Welcome back, {firstName}</h2>

          {isLoading ? (
            <div className="skeleton h-24 w-full rounded-xl"></div>
          ) : !hasFarms ? (
            <div className="py-10 flex flex-col items-center justify-center text-center">
              <Sprout className="w-[40px] h-[40px] text-brand-300 mb-3" />
              <p className="text-sm font-medium text-gray-500 mb-5">No farm set up yet.</p>
              <Link href="/farms/new">
                <button className="bg-brand-500 hover:bg-brand-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm">
                  Add Your First Farm
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-brand-50 flex flex-shrink-0 items-center justify-center">
                  <MapPin className="w-6 h-6 text-brand-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Total Area</p>
                  <p className="text-lg font-bold text-gray-800">{totalArea.toFixed(2)} ha</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-brand-50 flex flex-shrink-0 items-center justify-center">
                  <LayoutTemplate className="w-6 h-6 text-brand-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Active Zones</p>
                  <p className="text-lg font-bold text-gray-800">{totalZones}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-brand-50 flex flex-shrink-0 items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-brand-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Verified Zones</p>
                  <p className="text-lg font-bold text-gray-800">{verifiedZones}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-amber-50 flex flex-shrink-0 items-center justify-center">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Pending</p>
                  <p className="text-lg font-bold text-gray-800">{pendingVerifications}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* QUICK ACTIONS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Link href="/farms/new">
            <a className="bg-white border border-gray-200 hover:border-brand-300 hover:shadow-card hover:bg-brand-50 transition-all rounded-xl p-5 flex flex-col items-center text-center cursor-pointer group">
              <Plus className="w-[28px] h-[28px] text-brand-600 mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-semibold text-gray-800">Add Zone</h3>
              <p className="text-xs text-gray-500 mt-1">Map a new farm field</p>
            </a>
          </Link>

          <Link href="/planting-plans">
            <a className="bg-white border border-gray-200 hover:border-brand-300 hover:shadow-card hover:bg-brand-50 transition-all rounded-xl p-5 flex flex-col items-center text-center cursor-pointer group">
              <Grid3X3 className="w-[28px] h-[28px] text-brand-600 mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-semibold text-gray-800">Planting Plans</h3>
              <p className="text-xs text-gray-500 mt-1">View recommendations</p>
            </a>
          </Link>

          <Link href="/crops">
            <a className="bg-white border border-gray-200 hover:border-brand-300 hover:shadow-card hover:bg-brand-50 transition-all rounded-xl p-5 flex flex-col items-center text-center cursor-pointer group">
              <BookOpen className="w-[28px] h-[28px] text-brand-600 mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-semibold text-gray-800">Crop Library</h3>
              <p className="text-xs text-gray-500 mt-1">Explore 13 crops</p>
            </a>
          </Link>

          <Link href="/community">
            <a className="bg-white border border-gray-200 hover:border-brand-300 hover:shadow-card hover:bg-brand-50 transition-all rounded-xl p-5 flex flex-col items-center text-center cursor-pointer group">
              <MessageSquare className="w-[28px] h-[28px] text-brand-600 mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-semibold text-gray-800">Ask Community</h3>
              <p className="text-xs text-gray-500 mt-1">Get advice from farmers</p>
            </a>
          </Link>
        </div>

        {/* RECENT ACTIVITIES */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
              <div className="w-1.5 h-5 bg-brand-500 rounded-full"></div>
              Recent Activities
            </h2>
          </div>

          <div className="p-0">
            {recentActivities.length === 0 ? (
              <div className="text-center py-10 text-sm font-medium text-gray-500">
                No recent activities.
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {recentActivities.map((activity, idx) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="p-5 hover:bg-gray-50 transition-colors flex gap-4">
                      <div className={`w-10 h-10 rounded-full ${activity.bg} flex items-center justify-center shrink-0`}>
                        <Icon className={`w-5 h-5 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-sm font-bold text-gray-800 truncate">{activity.title}</h4>
                          <span className="text-xs font-semibold text-gray-400 whitespace-nowrap ml-2">
                            {activity.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">{activity.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
