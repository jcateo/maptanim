import React from 'react';
import { CloudRain, Sun, Wind } from 'lucide-react';
import { Card } from './ui/card';

import { trpc } from '../lib/trpc';
import { Loader2 } from 'lucide-react';

export default function WeatherWidget({ municipality = "Murcia" }: { municipality?: string }) {
  const { data: forecast, isLoading } = trpc.weather.getForecast.useQuery({});

  const weather = {
    temp: forecast?.current?.temperature_2m || 0,
    condition: forecast?.current?.precipitation > 0 ? "Rainy" : "Partly Cloudy",
    humidity: forecast?.current?.relative_humidity_2m || 0,
    wind: forecast?.current?.wind_speed_10m || 0,
    precipitation: forecast?.current?.precipitation || 0
  };

  return (
    <Card className="p-5 bg-gradient-to-br from-sky-50 to-white border-sky-100 shadow-sm relative overflow-hidden">
      <div className="absolute -top-10 -right-10 opacity-10">
        <Sun className="w-32 h-32 text-sky-500" />
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-sm font-semibold text-neutral-800">{municipality}, Negros Occidental</h3>
            <p className="text-xs text-neutral-500 mt-0.5">Current Weather</p>
          </div>
          <div className="bg-white p-2 rounded-lg shadow-sm border border-neutral-100">
            <Sun className="h-6 w-6 text-yellow-500" />
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
          </div>
        ) : (
          <>
            <div className="flex items-end gap-3 mb-6">
              <span className="text-4xl font-bold text-neutral-900">{weather.temp}°C</span>
              <span className="text-sm font-medium text-neutral-500 mb-1">{weather.condition}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-sky-100/50">
              <div className="flex items-center gap-2">
                <CloudRain className="h-4 w-4 text-sky-500" />
                <div className="flex flex-col">
                  <span className="text-xs text-neutral-400">Precipitation</span>
                  <span className="text-sm font-medium text-neutral-700">{weather.precipitation} mm</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="h-4 w-4 text-sky-500" />
                <div className="flex flex-col">
                  <span className="text-xs text-neutral-400">Wind</span>
                  <span className="text-sm font-medium text-neutral-700">{weather.wind} km/h</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
