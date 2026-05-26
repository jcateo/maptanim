import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Briefcase, Calendar, CheckSquare, Users, Plus, MoreVertical, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function FarmOperations() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Water Zone A (Kamatis)', time: '06:00 AM', status: 'completed' },
    { id: 2, title: 'Apply organic fertilizer', time: '09:00 AM', status: 'pending' },
    { id: 3, title: 'Inspect for pests (Talong)', time: '02:00 PM', status: 'pending' },
  ]);

  const [workers, setWorkers] = useState([
    { id: 1, name: 'Juan Dela Cruz', role: 'Harvester', status: 'Active' },
    { id: 2, name: 'Maria Santos', role: 'Irrigation', status: 'On Leave' },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: t.status === 'pending' ? 'completed' : 'pending' } : t));
    toast.success('Task status updated');
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto h-[calc(100vh-80px)] flex flex-col font-inter">
        
        <div className="mb-6 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Farm Operations</h1>
            <p className="text-sm text-gray-500 mt-1">Worker management, scheduling, and operational task tracking</p>
          </div>
          <div className="bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1.5 rounded-full border border-brand-100 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5" />
            Phase 10: Active
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 min-h-0">
          
          {/* Daily Tasks */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-brand-500" />
                Daily Tasks
              </h2>
              <button 
                onClick={() => toast.success('New task added')}
                className="text-brand-600 hover:bg-brand-50 p-1 rounded transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
              {tasks.map(task => (
                <div key={task.id} className={`p-3 border rounded-lg flex items-start gap-3 transition-colors ${task.status === 'completed' ? 'bg-gray-50 border-gray-100 opacity-60' : 'bg-white border-gray-200 hover:border-brand-300'}`}>
                  <input 
                    type="checkbox" 
                    checked={task.status === 'completed'}
                    onChange={() => toggleTask(task.id)}
                    className="mt-1 rounded text-brand-500 focus:ring-brand-500 cursor-pointer w-4 h-4"
                  />
                  <div className="flex-1">
                    <h3 className={`text-sm font-semibold ${task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                      {task.title}
                    </h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      {task.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col">
            <h2 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-500" />
              Weekly Schedule
            </h2>
            <div className="flex-1 border border-gray-100 rounded-xl p-4 bg-gray-50 overflow-y-auto">
              <div className="space-y-4">
                <div className="relative pl-4 border-l-2 border-brand-500">
                  <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-brand-500"></div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Monday</h4>
                  <div className="bg-white p-3 rounded shadow-sm border border-gray-100 text-sm font-medium text-gray-700">
                    Harvesting (Zone B)
                  </div>
                </div>
                <div className="relative pl-4 border-l-2 border-amber-500">
                  <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-amber-500"></div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Wednesday</h4>
                  <div className="bg-white p-3 rounded shadow-sm border border-gray-100 text-sm font-medium text-gray-700">
                    Pesticide Application (Organic)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Workforce */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                <Users className="w-4 h-4 text-brand-500" />
                Workforce
              </h2>
              <button 
                onClick={() => toast.success('Add worker clicked')}
                className="text-brand-600 hover:bg-brand-50 p-1 rounded transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3">
              {workers.map(worker => (
                <div key={worker.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs">
                      {worker.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800">{worker.name}</h4>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider">{worker.role}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${worker.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-600'}`}>
                    {worker.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
