import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Activity, CheckCircle, Users, Server, Clock, ShieldAlert, Database } from 'lucide-react';
import { format } from 'date-fns';

export default function SystemHealth() {
  const mockLogs = [
    { id: 1, type: 'info', message: 'User role updated to admin by system', timestamp: new Date(Date.now() - 1000 * 60 * 5) },
    { id: 2, type: 'success', message: 'Database backup completed successfully', timestamp: new Date(Date.now() - 1000 * 60 * 45) },
    { id: 3, type: 'warning', message: 'High memory usage detected on worker node 2', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) },
    { id: 4, type: 'info', message: 'Automated weather sync finished (PAGASA API)', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3) },
    { id: 5, type: 'success', message: 'SSL Certificate renewed for 90 days', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12) },
    { id: 6, type: 'info', message: 'Server restarted for scheduled maintenance', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto font-inter h-full flex flex-col">
        <div className="mb-8 shrink-0">
          <h1 className="text-2xl font-bold text-gray-800">System Diagnostics</h1>
          <p className="text-sm text-gray-500 mt-1">Real-time platform monitoring and performance metrics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 shrink-0">
          
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Database Status</h3>
            <p className="text-xl font-bold text-gray-900">Operational</p>
            <p className="text-[10px] text-gray-400 mt-2 flex items-center gap-1">
              <Database className="w-3 h-3" /> Postgres 15.x
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center mb-3">
              <Activity className="w-6 h-6 text-brand-500" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">API Latency</h3>
            <p className="text-xl font-bold text-gray-900">42ms</p>
            <p className="text-[10px] text-gray-400 mt-2 flex items-center gap-1">
              <Server className="w-3 h-3" /> p95 average
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-sky-50 rounded-full flex items-center justify-center mb-3">
              <Users className="w-6 h-6 text-sky-500" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Active Sessions</h3>
            <p className="text-xl font-bold text-gray-900">128</p>
            <p className="text-[10px] text-gray-400 mt-2 flex items-center gap-1">
              <Activity className="w-3 h-3" /> Last 15 mins
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
              <Clock className="w-6 h-6 text-gray-600" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">System Uptime</h3>
            <p className="text-xl font-bold text-gray-900">99.9%</p>
            <p className="text-[10px] text-gray-400 mt-2 flex items-center gap-1">
              <Server className="w-3 h-3" /> 45 days straight
            </p>
          </div>

        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col flex-1 min-h-0 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex items-center justify-between shrink-0">
            <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2">
              <Activity className="w-5 h-5 text-gray-500" />
              System Event Logs
            </h2>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-white text-xs font-semibold uppercase tracking-wider text-gray-500 border-b border-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4">Timestamp</th>
                  <th className="px-6 py-4">Level</th>
                  <th className="px-6 py-4">Event Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockLogs.map(log => (
                  <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-gray-500 font-medium whitespace-nowrap">
                      {format(log.timestamp, 'MMM dd, yyyy HH:mm:ss')}
                    </td>
                    <td className="px-6 py-4">
                      {log.type === 'info' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 border border-sky-100">
                          <Activity className="w-3.5 h-3.5" /> Info
                        </span>
                      )}
                      {log.type === 'success' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-100">
                          <CheckCircle className="w-3.5 h-3.5" /> Success
                        </span>
                      )}
                      {log.type === 'warning' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-100">
                          <ShieldAlert className="w-3.5 h-3.5" /> Warning
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {log.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
