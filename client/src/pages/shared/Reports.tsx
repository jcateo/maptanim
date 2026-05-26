import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { FileText, Download, Filter, FileSpreadsheet, FileBarChart, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Reports() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reports, setReports] = useState([
    { id: 1, name: 'Yield Analysis Q1 2026', date: 'Mar 31, 2026', type: 'Yield', size: '2.4 MB' },
    { id: 2, name: 'Soil Health Report - Zone A', date: 'Mar 15, 2026', type: 'Agronomic', size: '1.1 MB' },
    { id: 3, name: 'Financial Summary 2025', date: 'Dec 31, 2025', type: 'Financial', size: '3.8 MB' },
  ]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setReports([
        { id: Date.now(), name: `Yield Analysis ${new Date().toLocaleDateString()}`, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), type: 'Yield', size: '1.2 MB' },
        ...reports
      ]);
      toast.success('Report generated successfully!');
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto h-[calc(100vh-80px)] flex flex-col font-inter">
        
        <div className="mb-6 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Reports & Documentation</h1>
            <p className="text-sm text-gray-500 mt-1">Automated generation of farm reports and official documentation</p>
          </div>
          <div className="bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1.5 rounded-full border border-brand-100 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            Phase 12: Active
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6 shrink-0">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <select className="bg-gray-50 border border-gray-200 text-sm text-gray-700 rounded-lg px-4 py-2 outline-none focus:border-brand-500 w-full sm:w-auto">
                <option>All Report Types</option>
                <option>Yield Analysis</option>
                <option>Financial Summary</option>
                <option>Activity Logs</option>
              </select>
              <button className="bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="bg-brand-500 hover:bg-brand-600 disabled:bg-brand-300 disabled:cursor-not-allowed text-white px-5 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors w-full sm:w-auto flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Generate New Report
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex-1 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col min-h-0">
          <div className="overflow-y-auto flex-1 p-6">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50/80 sticky top-0">
                <tr>
                  <th className="px-6 py-3 font-semibold rounded-tl-lg">Report Name</th>
                  <th className="px-6 py-3 font-semibold">Date Generated</th>
                  <th className="px-6 py-3 font-semibold">Type</th>
                  <th className="px-6 py-3 font-semibold text-right rounded-tr-lg">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-brand-50/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-800 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                        {report.type === 'Financial' ? <FileSpreadsheet className="w-4 h-4" /> : <FileBarChart className="w-4 h-4" />}
                      </div>
                      {report.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{report.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        report.type === 'Yield' ? 'bg-sky-50 text-sky-700 border border-sky-100' :
                        report.type === 'Financial' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                        'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}>
                        {report.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => toast.success(`Downloading ${report.name}...`)}
                        className="text-brand-600 hover:text-brand-800 font-semibold text-xs"
                      >
                        Download ({report.size})
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {reports.length === 0 && (
              <div className="py-20 text-center">
                <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No reports generated yet.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
