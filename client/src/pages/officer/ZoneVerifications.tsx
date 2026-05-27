import React from 'react';
import { Link } from 'wouter';
import DashboardLayout from '../../components/DashboardLayout';
import { trpc } from '../../lib/trpc';
import { Shield, Clock, Map, User, AlertCircle, ChevronRight, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

export default function ZoneVerifications() {
  const { data: queue, isLoading } = trpc.officer.verificationQueue.useQuery();

  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto font-inter">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-brand-100 rounded-lg text-brand-600">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Zone Verifications</h1>
              <p className="text-sm text-gray-500">
                Review and approve newly drawn farm zones in your municipality.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton h-24 w-full rounded-xl" />
            ))}
          </div>
        ) : queue?.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">All Caught Up!</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              There are currently no pending zone verifications in your assigned municipality.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {queue?.map((item: any) => (
              <div key={item.zone.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-card-md transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center shrink-0 border border-amber-100">
                    <Clock className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {item.zone.name || `Zone ${item.zone.id}`}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-1.5 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Map className="w-4 h-4" /> {item.farm.name}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" /> {item.farmer.name}
                      </span>
                      <span className="flex items-center gap-1 text-amber-600 font-medium">
                        <AlertCircle className="w-4 h-4" /> Pending Review
                      </span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-gray-100 pt-4 sm:pt-0 sm:pl-6 mt-2 sm:mt-0">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Submitted</p>
                    <p className="text-sm font-semibold text-gray-700">
                      {format(new Date(item.zone.createdAt), "MMM d, yyyy")}
                    </p>
                  </div>
                  
                  <Link href={`/verify/${item.zone.id}`}>
                    <button className="w-full sm:w-auto px-5 py-2.5 bg-brand-50 hover:bg-brand-500 text-brand-700 hover:text-white border border-brand-200 hover:border-brand-500 font-semibold rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
                      Review Map <ChevronRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
                
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
