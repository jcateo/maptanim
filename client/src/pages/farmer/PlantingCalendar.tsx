import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Sprout, Sun, Droplets, Leaf, Loader2 } from 'lucide-react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameDay, isToday, addMonths, subMonths } from 'date-fns';
import { trpc } from '../../lib/trpc';

export default function PlantingCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { data: farms } = trpc.farms.list.useQuery();
  const [selectedFarmId, setSelectedFarmId] = useState<number>(() => 0);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = monthStart;
  const endDate = monthEnd;
  const dateFormat = "MMMM yyyy";
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const resolvedFarmId = selectedFarmId || farms?.[0]?.id || 0;
  const { data: rawEvents, isLoading } = trpc.farmOps.getCalendarEvents.useQuery(
    { farmId: resolvedFarmId },
    { enabled: resolvedFarmId > 0 }
  );

  // Map backend events to UI properties
  const agriculturalEvents = (rawEvents || []).map(event => {
    let icon = <Sprout className="w-3 h-3" />;
    let color = 'bg-gray-100 text-gray-700 border-gray-200';

    if (event.type === 'planting') {
      icon = <Sprout className="w-3 h-3" />;
      color = 'bg-green-100 text-green-700 border-green-200';
    } else if (event.type === 'maintenance') {
      icon = <Droplets className="w-3 h-3" />;
      color = 'bg-amber-100 text-amber-700 border-amber-200';
    } else if (event.type === 'harvest') {
      icon = <Sun className="w-3 h-3" />;
      color = 'bg-brand-100 text-brand-700 border-brand-200';
    }

    return {
      date: new Date(event.date),
      title: event.title,
      type: event.type,
      icon,
      color
    };
  });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto h-full flex flex-col font-inter">
        
        {/* Header Section */}
        <div className="mb-6 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <CalendarIcon className="w-6 h-6 text-brand-500" />
              Agricultural Calendar
            </h1>
            <p className="text-sm text-gray-500 mt-1">Automated planting and harvesting schedules based on crop lifecycles.</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={resolvedFarmId || ""}
              onChange={(e) => setSelectedFarmId(parseInt(e.target.value))}
              className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {(farms || []).map((f: any) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
            <div className="bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1.5 rounded-full border border-brand-100 flex items-center gap-1.5">
              Harvest & Tasks
            </div>
          </div>
        </div>

        {/* Main Calendar Area */}
        <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
          
          {/* Calendar Controls */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h2 className="text-lg font-bold text-gray-800">
              {format(currentDate, dateFormat)}
            </h2>
            <div className="flex items-center gap-2">
              <button onClick={prevMonth} className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              <button onClick={() => setCurrentDate(new Date())} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors">
                Today
              </button>
              <button onClick={nextMonth} className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          {resolvedFarmId === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
              <Leaf className="w-10 h-10 text-gray-300 mb-3" />
              <p className="text-gray-500 font-medium">Create a farm first to see your calendar events.</p>
            </div>
          ) : isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
              <Loader2 className="w-10 h-10 animate-spin text-brand-500 mb-3" />
              <p className="text-gray-500 font-medium">Syncing agricultural events...</p>
            </div>
          ) : (
            <div className="flex-1 overflow-auto">
              <div className="grid grid-cols-7 min-w-[700px]">
              {/* Day Headers */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dayName) => (
                <div key={dayName} className="py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 bg-white sticky top-0 z-10">
                  {dayName}
                </div>
              ))}
              
              {/* Empty blocks for padding before month start */}
              {Array.from({ length: monthStart.getDay() }).map((_, index) => (
                <div key={`empty-${index}`} className="min-h-[120px] bg-gray-50/50 border-b border-r border-gray-100 p-2"></div>
              ))}
              
              {/* Actual Days */}
              {days.map((day) => {
                const dayEvents = agriculturalEvents.filter(e => isSameDay(e.date, day));
                
                return (
                  <div 
                    key={day.toString()} 
                    className={`min-h-[120px] border-b border-r border-gray-100 p-2 transition-colors hover:bg-gray-50 ${isToday(day) ? 'bg-brand-50/30' : 'bg-white'}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-full ${isToday(day) ? 'bg-brand-500 text-white shadow-md' : 'text-gray-700'}`}>
                        {format(day, 'd')}
                      </span>
                    </div>
                    
                    <div className="space-y-1.5">
                      {dayEvents.map((event, idx) => (
                        <div key={idx} className={`px-2 py-1.5 text-xs font-medium rounded-md border flex items-center gap-1.5 ${event.color}`}>
                          {event.icon}
                          <span className="truncate">{event.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              
              {/* Empty blocks for padding after month end */}
              {Array.from({ length: 6 - monthEnd.getDay() }).map((_, index) => (
                <div key={`empty-end-${index}`} className="min-h-[120px] bg-gray-50/50 border-b border-r border-gray-100 p-2"></div>
              ))}
            </div>
          </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-4 px-2">
          <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
            <div className="w-3 h-3 rounded-full bg-green-500"></div> Planting/Sowing
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div> Maintenance
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
            <div className="w-3 h-3 rounded-full bg-brand-500"></div> Harvesting
          </div>
        </div>
        
      </div>
    </DashboardLayout>
  );
}
