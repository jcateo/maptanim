import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Users, UserPlus, Shield, MessageCircle } from 'lucide-react';

export default function Team() {
  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto h-[calc(100vh-80px)] flex flex-col font-inter">
        
        <div className="mb-6 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Team Collaboration</h1>
            <p className="text-sm text-gray-500 mt-1">Live shared workspaces for your farm team.</p>
          </div>
          <div className="bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1.5 rounded-full border border-brand-100 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            Phase 14: In Development
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 min-h-0">
          
          <div className="md:col-span-2 bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                <Users className="w-4 h-4 text-brand-500" />
                Team Members
              </h2>
              <button className="text-xs font-medium text-brand-600 hover:text-brand-700 bg-brand-50 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors">
                <UserPlus className="w-3.5 h-3.5" />
                Invite Member
              </button>
            </div>
            
            <div className="flex-1 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-center p-6 bg-gray-50/50">
              <p className="text-sm text-gray-500 max-w-xs">Team management and role-based access control will be available in Phase 14.</p>
            </div>
          </div>

          <div className="md:col-span-1 space-y-6 flex flex-col">
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-500" />
                Access Levels
              </h2>
              <div className="space-y-3 opacity-60">
                <div className="p-3 border border-gray-100 rounded-lg bg-gray-50">
                  <h3 className="text-xs font-bold text-gray-700">Owner</h3>
                  <p className="text-[10px] text-gray-500 mt-1">Full access to all farm settings and billing.</p>
                </div>
                <div className="p-3 border border-gray-100 rounded-lg bg-gray-50">
                  <h3 className="text-xs font-bold text-gray-700">Manager</h3>
                  <p className="text-[10px] text-gray-500 mt-1">Can edit zones and invite workers.</p>
                </div>
                <div className="p-3 border border-gray-100 rounded-lg bg-gray-50">
                  <h3 className="text-xs font-bold text-gray-700">Worker</h3>
                  <p className="text-[10px] text-gray-500 mt-1">View-only access and task completion.</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex-1 flex flex-col">
              <h2 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-sky-500" />
                Live Chat
              </h2>
              <div className="flex-1 flex items-center justify-center text-center opacity-50">
                <p className="text-xs text-gray-500">Workspace chat offline</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
