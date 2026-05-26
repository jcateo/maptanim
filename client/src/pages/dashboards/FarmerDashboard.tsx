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
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Recent Activities</h2>

          <div className="text-center py-6 text-sm text-gray-500">
            No recent activities.
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
