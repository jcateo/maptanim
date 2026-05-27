import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useAuth } from "../../contexts/AuthContext";
import { trpc } from "../../lib/trpc";
import { Clock, CheckCircle, Users, ExternalLink, MapPin, Layers, AlertTriangle, Sprout } from "lucide-react";
import { format } from "date-fns";
import { Link } from "wouter";

export default function OfficerDashboard() {
  const { user } = useAuth();
  const { data: queue, isLoading } = trpc.officer.verificationQueue.useQuery();
  const { data: assignedFarmers } = trpc.officer.assignedFarmers.useQuery();
  const { data: rawStats } = trpc.officer.getStats.useQuery();

  const pendingCount = queue?.length || 0;
  
  const stats = [
    { label: "Total Farmers", value: assignedFarmers?.length || 0, icon: Users, color: "text-brand-600", bg: "bg-brand-50" },
    { label: "Pending Verifications", value: rawStats?.pending || 0, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Verified Zones", value: rawStats?.verified || 0, icon: CheckCircle, color: "text-brand-600", bg: "bg-brand-50" },
    { label: "Rejected Zones", value: rawStats?.rejected || 0, icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto h-full flex flex-col font-inter">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Extension Officer Overview</p>
        </div>

        {/* QUICK STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 shrink-0">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex items-center gap-4 hover:shadow-card transition-shadow">
              <div className={`w-12 h-12 rounded-lg ${stat.bg} flex items-center justify-center shrink-0`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 mb-1">{stat.label}</span>
                <span className="text-2xl font-bold text-gray-900 leading-none">{stat.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* PENDING TASKS LIST */}
        <div className="flex-1 flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between bg-gray-50 shrink-0">
            <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" />
              Pending Tasks List
            </h2>
            {pendingCount > 0 && (
              <div className="bg-amber-100 text-amber-700 rounded-full px-2.5 py-1 text-xs font-semibold">
                {pendingCount} Pending
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="p-6 space-y-4">
                <div className="skeleton h-12 w-full rounded-lg"></div>
                <div className="skeleton h-12 w-full rounded-lg"></div>
                <div className="skeleton h-12 w-full rounded-lg"></div>
              </div>
            ) : pendingCount === 0 ? (
              <div className="py-20 text-center flex flex-col items-center justify-center">
                <CheckCircle className="w-12 h-12 text-brand-300 mx-auto mb-3" />
                <h3 className="text-base font-semibold text-gray-700">All caught up!</h3>
                <p className="text-sm text-gray-500 mt-1">There are no pending verification requests in your queue.</p>
              </div>
            ) : (
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-white sticky top-0 z-10">
                  <tr className="border-b border-gray-200 text-xs uppercase text-gray-500">
                    <th className="px-6 py-3 font-semibold">Farmer & Farm</th>
                    <th className="px-6 py-3 font-semibold">Zone Details</th>
                    <th className="px-6 py-3 font-semibold">Submitted On</th>
                    <th className="px-6 py-3 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {queue?.map((row) => (
                    <tr key={row.zone.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-800">{row.farmer.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{row.farm.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-800">{row.zone.name || `Zone ${row.zone.id}`}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="bg-brand-50 text-brand-700 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide">
                            {row.zone.prdpLabel || row.zone.croppingSystem}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Layers className="w-3 h-3" /> {row.zone.areaHectares} ha
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          {row.zone.createdAt ? format(new Date(row.zone.createdAt), 'MMM d, yyyy') : 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/verify/${row.zone.id}`}>
                          <button className="bg-white border border-gray-200 hover:border-brand-300 hover:bg-brand-50 text-gray-700 hover:text-brand-700 text-sm font-semibold rounded-lg px-4 py-2 inline-flex items-center gap-2 transition-colors">
                            <ExternalLink className="w-4 h-4" />
                            Review
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
