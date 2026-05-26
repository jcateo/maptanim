import React, { useState } from 'react';
import { useRoute } from 'wouter';
import DashboardLayout from '../../components/DashboardLayout';
import { trpc } from '../../lib/trpc';
import { 
  MapPin, CheckCircle, AlertCircle, ChevronLeft, 
  User, Phone, Map, Layers, Sprout, Calendar, 
  FlaskConical, CloudRain, Sun, Thermometer, X, Clock
} from 'lucide-react';
import { toast } from 'sonner';
import { withRoleProtection } from '../../components/withRoleProtection';
import { format } from 'date-fns';

function VerifyZone() {
  const [, params] = useRoute('/verify/:id');
  const zoneId = params?.id ? parseInt(params.id) : 0;

  const { data: zone, isLoading: isZoneLoading } = trpc.zones.getById.useQuery(
    { id: zoneId },
    { enabled: !!zoneId }
  );

  const verifyMutation = trpc.officer.verifyZone.useMutation({
    onSuccess: (_, variables) => {
      if (variables.action === 'approve') {
        toast.success("Zone approved. Farmer notified.");
      } else {
        toast.success("Correction request sent.");
      }
      window.history.back();
    },
    onError: (err) => {
      toast.error(err.message || "Failed to submit verification");
    }
  });

  const [notes, setNotes] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);

  if (isZoneLoading) {
    return (
      <DashboardLayout>
        <div className="p-6 max-w-6xl mx-auto font-inter">
          <div className="skeleton h-8 w-48 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="skeleton h-[420px] w-full rounded-2xl" />
              <div className="skeleton h-48 w-full rounded-2xl" />
            </div>
            <div className="lg:col-span-1 space-y-6">
              <div className="skeleton h-64 w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!zone) {
    return (
      <DashboardLayout>
        <div className="p-6 max-w-6xl mx-auto font-inter">
          <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200">
            Zone not found or you don't have permission to view it.
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const handleApprove = () => {
    verifyMutation.mutate({ zoneId, action: 'approve' });
  };

  const handleReject = () => {
    if (!notes.trim()) {
      toast.error("Please provide correction notes.");
      return;
    }
    verifyMutation.mutate({ zoneId, action: 'reject', correctionNotes: notes });
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto h-full overflow-y-auto font-inter">
        {/* HEADER */}
        <div className="mb-6">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors mb-2"
          >
            <ChevronLeft className="w-4 h-4 mr-0.5" /> Back to Queue
          </button>
          <div className="flex items-end gap-3">
            <h1 className="text-2xl font-bold text-gray-800">Zone Verification</h1>
            <span className="text-lg font-medium text-gray-400 mb-0.5">&mdash; {zone.name || `Zone ${zone.id}`}</span>
          </div>
        </div>

        {/* SPLIT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT: Zone Details & Map (col-span-2) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Map Container */}
            <div className="bg-gray-100 border border-gray-200 rounded-2xl h-[400px] flex items-center justify-center relative shadow-sm overflow-hidden">
              <div className="text-gray-400 flex flex-col items-center">
                <Map className="w-12 h-12 mb-3 opacity-50" />
                <p className="font-medium text-sm">Mini Map View (Leaflet Read-only)</p>
                <div className="mt-4 px-4 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 shadow-sm uppercase tracking-wide">
                  {zone.name || `Zone ${zone.id}`} Boundary
                </div>
              </div>
            </div>

            {/* Data Grid */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-base font-semibold text-gray-800 mb-5">Zone Specifications</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1 flex items-center gap-1.5"><Layers className="w-3.5 h-3.5"/> Area</div>
                  <div className="text-sm font-semibold text-gray-800">{parseFloat(zone.areaHectares || "0").toFixed(4)} ha</div>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1 flex items-center gap-1.5"><Sprout className="w-3.5 h-3.5"/> Crop System</div>
                  <div className="text-sm font-semibold text-gray-800 capitalize">{zone.croppingSystem}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">PRDP Label</div>
                  <div className="bg-brand-50 text-brand-700 text-xs font-bold px-2 py-1 rounded inline-block uppercase tracking-wider border border-brand-100">
                    {zone.prdpLabel || 'None'}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1 flex items-center gap-1.5"><User className="w-3.5 h-3.5"/> Farmer Name</div>
                  <div className="text-sm font-semibold text-gray-800">John Doe</div>
                </div>
              </div>
            </div>

            {/* Rule Engine Results / Condition Profile */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-base font-semibold text-gray-800 mb-4">Condition Profile & Validation</h2>
              
              <div className="bg-sky-50 text-sky-700 text-xs font-semibold px-3 py-1.5 rounded-lg inline-block mb-4 border border-sky-100 uppercase tracking-wide">
                Detected: Dry-Sunny-Loam
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">Soil pH</div>
                    <div className="text-sm font-medium text-gray-800">6.5</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CloudRain className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">Water</div>
                    <div className="text-sm font-medium text-gray-800">Good</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">Temp</div>
                    <div className="text-sm font-medium text-gray-800">28°C</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">Sunlight</div>
                    <div className="text-sm font-medium text-gray-800">8 hrs/day</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: Action Panel (col-span-1) */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-base font-semibold text-gray-800">Verification Status</h2>
                  
                  {zone.verificationStatus === 'pending' && (
                    <div className="bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5"/> Pending Review
                    </div>
                  )}
                  {zone.verificationStatus === 'verified' && (
                    <div className="bg-brand-100 text-brand-700 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5"/> Verified
                    </div>
                  )}
                  {zone.verificationStatus === 'needs_correction' && (
                    <div className="bg-red-100 text-red-700 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5"/> Rejected
                    </div>
                  )}
                </div>

                <div className="space-y-3 pt-2 border-t border-gray-100">
                  <button 
                    onClick={handleApprove}
                    disabled={verifyMutation.isPending || zone.verificationStatus !== 'pending'}
                    className="w-full bg-brand-500 hover:bg-brand-600 text-white py-3 rounded-xl text-sm font-bold shadow-green transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:shadow-none"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve Zone
                  </button>
                  
                  <button 
                    onClick={() => setShowRejectModal(true)}
                    disabled={verifyMutation.isPending || zone.verificationStatus !== 'pending'}
                    className="w-full bg-transparent hover:bg-red-50 text-red-500 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <AlertCircle className="w-4 h-4" />
                    Reject & Request Correction
                  </button>
                </div>
              </div>

              {Array.isArray(zone.photoUrls) && zone.photoUrls.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <h2 className="text-sm font-semibold text-gray-800 mb-4">Submitted Photos</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {(zone.photoUrls as string[]).map((url: string, i: number) => (
                      <img key={i} src={url} alt={`Zone ${i}`} className="w-full h-[100px] rounded-lg object-cover border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity shadow-sm" />
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* REJECT MODAL OVERLAY */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-modal w-full max-w-md max-h-[90vh] overflow-y-auto border border-gray-200">
            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                Request Correction
              </h2>
              <button 
                onClick={() => setShowRejectModal(false)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* Body */}
            <div className="px-6 py-5 space-y-4 bg-gray-50">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Correction Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describe what needs to be corrected or resubmitted by the farmer..."
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-800 min-h-[120px] focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none resize-none shadow-sm"
                ></textarea>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-5 border-t border-gray-100 flex flex-col sm:flex-row justify-end gap-3 bg-white rounded-b-2xl">
              <button 
                onClick={() => setShowRejectModal(false)}
                className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-xl px-5 py-2.5 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleReject}
                disabled={verifyMutation.isPending}
                className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold rounded-xl px-5 py-2.5 shadow-sm transition-colors disabled:opacity-50"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default withRoleProtection(VerifyZone, ["extension_officer", "admin"]);
