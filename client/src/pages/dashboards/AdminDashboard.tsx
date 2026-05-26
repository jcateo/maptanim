import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useAuth } from "../../contexts/AuthContext";
import { trpc } from "../../lib/trpc";
import { Users, MapPin, LayoutTemplate, Activity, Shield, Sprout, Clock } from "lucide-react";
import { format } from "date-fns";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";

export default function AdminDashboard() {
  const { user } = useAuth();
  const { data: statsData, isLoading: statsLoading } = trpc.admin.stats.overview.useQuery();
  const { data: usersList, isLoading: usersLoading } = trpc.admin.users.list.useQuery();

  const roleDistribution = [
    { name: 'Farmers', value: usersList?.filter(u => u.role === 'farmer').length || 0, color: '#22c55e' },
    { name: 'Officers', value: usersList?.filter(u => u.role === 'extension_officer').length || 0, color: '#0ea5e9' },
    { name: 'Admins', value: usersList?.filter(u => u.role === 'admin').length || 0, color: '#94a3b8' },
  ].filter(r => r.value > 0) || [];

  // Get last 5 recent registrations
  const recentUsers = usersList?.slice(0, 5) || [];

  return (
    <DashboardLayout>
      <div className="p-6 font-inter max-w-6xl mx-auto h-full flex flex-col">
        <div className="mb-6 shrink-0">
          <h1 className="text-2xl font-bold text-gray-800">System Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Platform administration and analytics</p>
        </div>

        {/* QUICK STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex items-center gap-4 hover:shadow-card transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-sky-50 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6 text-sky-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 mb-1">Total Users</span>
              <span className="text-2xl font-bold text-gray-900 leading-none">
                {statsLoading ? "-" : statsData?.totalUsers || 0}
              </span>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex items-center gap-4 hover:shadow-card transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-earth-50 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6 text-earth-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 mb-1">Total Farms</span>
              <span className="text-2xl font-bold text-gray-900 leading-none">
                {statsLoading ? "-" : statsData?.totalFarms || 0}
              </span>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex items-center gap-4 hover:shadow-card transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
              <LayoutTemplate className="w-6 h-6 text-brand-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 mb-1">Active Zones</span>
              <span className="text-2xl font-bold text-gray-900 leading-none">
                {statsLoading ? "-" : (statsData?.verifiedZones || 0) + (statsData?.pendingVerifications || 0)}
              </span>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex items-center gap-4 hover:shadow-card transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
              <Activity className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 mb-1">Sys Health</span>
              <span className="text-2xl font-bold text-emerald-600 leading-none">100%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
          {/* RECENT ACTIVITY LIST */}
          <div className="bg-white border border-gray-200 rounded-xl flex flex-col shadow-sm overflow-hidden h-full">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 shrink-0">
              <h3 className="text-sm font-semibold text-gray-800">Recent User Registrations</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {usersLoading ? (
                <div className="space-y-3">
                  <div className="skeleton h-12 w-full rounded-lg"></div>
                  <div className="skeleton h-12 w-full rounded-lg"></div>
                  <div className="skeleton h-12 w-full rounded-lg"></div>
                </div>
              ) : recentUsers.length > 0 ? (
                recentUsers.map(u => (
                  <div key={u.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full font-semibold text-sm flex items-center justify-center shrink-0
                        ${u.role === 'admin' ? 'bg-gray-100 text-gray-700' :
                          u.role === 'extension_officer' ? 'bg-sky-100 text-sky-700' :
                            'bg-earth-100 text-earth-700'}`}>
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-800">{u.name}</div>
                        <div className="text-xs text-gray-500">{u.email}</div>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end gap-1">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
                          ${u.role === 'admin' ? 'bg-gray-100 text-gray-600' :
                            u.role === 'extension_officer' ? 'bg-sky-50 text-sky-600' :
                              'bg-earth-50 text-earth-600'}`}>
                        {u.role.replace('_', ' ')}
                      </span>
                      <div className="text-[10px] font-medium text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {u.createdAt ? format(new Date(u.createdAt), 'MMM d, yy') : 'N/A'}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-sm font-medium text-gray-500">No recent users.</div>
              )}
            </div>
          </div>

          {/* ROLE DISTRIBUTION */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col h-full overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 shrink-0">
              <h3 className="text-sm font-semibold text-gray-800">User Distribution</h3>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center p-6">
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={roleDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {roleDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip formatter={(value) => [`${value} Users`, 'Count']} contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex gap-6 justify-center text-xs font-semibold text-gray-600 mt-6">
                {roleDistribution.map(role => (
                  <div key={role.name} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: role.color }}></div>
                    <span className="uppercase tracking-wide">{role.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
