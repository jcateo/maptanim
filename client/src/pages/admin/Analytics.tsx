import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { trpc } from '../../lib/trpc';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Map, CheckCircle, Clock } from 'lucide-react';
import { withRoleProtection } from '../../components/withRoleProtection';

function Analytics() {
  const { data: farms, isLoading } = trpc.admin.farms.listAll.useQuery();

  // Mock data for charts since actual analytics aggregation isn't in tRPC yet
  const cropData = [
    { name: 'Rice', value: 45 },
    { name: 'Corn', value: 30 },
    { name: 'Cassava', value: 15 },
    { name: 'Sugarcane', value: 10 },
  ];

  const municipalityData = [
    { name: 'Bacolod', value: 35, color: '#22c55e' }, // brand-500
    { name: 'Bago', value: 25, color: '#eab308' },    // earth-500 equivalent
    { name: 'Talisay', value: 20, color: '#0ea5e9' }, // sky-500
    { name: 'Silay', value: 20, color: '#f97316' },   // orange
  ];

  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto h-full flex flex-col font-inter">
        <div className="mb-6 shrink-0">
          <h1 className="text-2xl font-bold text-gray-800">Regional Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">Platform-wide agricultural mapping and statistics</p>
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 shrink-0">
          {/* Crop Distribution Chart */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-base font-semibold text-gray-800 mb-6">Crop Distribution (%)</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cropData} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#4b5563', fontSize: 12, fontWeight: 500 }} width={80} />
                  <RechartsTooltip 
                    cursor={{ fill: '#f9fafb' }}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: any) => [`${value}%`, 'Percentage']}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                    {cropData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#22c55e', '#eab308', '#0ea5e9', '#f97316'][index % 4]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Municipality Distribution Chart */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-base font-semibold text-gray-800 mb-2">Farms by Municipality</h3>
            <div className="h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={municipalityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {municipalityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    formatter={(value) => [`${value}%`, 'Share']}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              {municipalityData.map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs font-semibold text-gray-600">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ZONE PERFORMANCE TABLE */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col flex-1 min-h-0 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex items-center justify-between shrink-0">
            <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2">
              <Map className="w-5 h-5 text-brand-600" />
              Zone Performance Overview
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-white text-xs font-semibold uppercase tracking-wider text-gray-500 border-b border-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4">Farm Name</th>
                  <th className="px-6 py-4">Municipality</th>
                  <th className="px-6 py-4 text-center">Verified Zones</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8">
                      <div className="space-y-4">
                        <div className="skeleton h-10 w-full rounded-lg"></div>
                        <div className="skeleton h-10 w-full rounded-lg"></div>
                        <div className="skeleton h-10 w-full rounded-lg"></div>
                      </div>
                    </td>
                  </tr>
                ) : !farms || farms.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                      No farms registered in the system yet.
                    </td>
                  </tr>
                ) : (
                  farms.map((farm: any) => {
                    const verifiedZonesCount = farm.zones?.filter((z: any) => z.verificationStatus === 'approved').length || 0;
                    const totalZonesCount = farm.zones?.length || 0;
                    
                    let statusLabel = 'Active';
                    let StatusIcon = CheckCircle;
                    let statusClass = 'text-brand-700 bg-brand-50 border border-brand-200';
                    
                    if (totalZonesCount === 0) {
                      statusLabel = 'Pending Setup';
                      StatusIcon = Clock;
                      statusClass = 'text-amber-700 bg-amber-50 border border-amber-200';
                    }

                    return (
                      <tr key={farm.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-semibold text-gray-800">{farm.name}</td>
                        <td className="px-6 py-4 text-gray-600">{farm.municipality || 'Unspecified'}</td>
                        <td className="px-6 py-4 text-center">
                          <span className="font-bold text-gray-900">{verifiedZonesCount}</span>
                          <span className="text-gray-400 font-medium"> / {totalZonesCount}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${statusClass}`}>
                            <StatusIcon className="w-3.5 h-3.5" />
                            {statusLabel}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default withRoleProtection(Analytics, ["admin"]);
