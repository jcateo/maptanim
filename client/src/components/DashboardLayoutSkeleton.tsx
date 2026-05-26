import React from 'react';
import { Skeleton } from './ui/skeleton';

export default function DashboardLayoutSkeleton() {
  return (
    <div className="flex h-screen w-full bg-neutral-50 overflow-hidden">
      {/* Sidebar Skeleton */}
      <div className="hidden md:flex w-64 flex-col bg-primary-900 border-r border-primary-800 shadow-xl">
        <div className="h-16 flex items-center px-6 border-b border-primary-800/50">
          <Skeleton className="h-8 w-8 rounded bg-primary-800/50" />
          <Skeleton className="h-6 w-24 ml-3 rounded bg-primary-800/50" />
        </div>
        <div className="flex-1 py-6 px-4 space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-11 w-full rounded-lg bg-primary-800/50" />
          ))}
          <div className="pt-6 pb-2">
            <Skeleton className="h-3 w-16 bg-primary-800/50 ml-2" />
          </div>
          {[1, 2, 3].map((i) => (
            <Skeleton key={`sec-${i}`} className="h-11 w-full rounded-lg bg-primary-800/50" />
          ))}
        </div>
        <div className="p-4 border-t border-primary-800/50 flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full bg-primary-800/50" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-full bg-primary-800/50" />
            <Skeleton className="h-3 w-2/3 bg-primary-800/50" />
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header Skeleton */}
        <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-8 md:hidden rounded" />
            <Skeleton className="h-6 w-32 rounded" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-9 w-64 rounded-full hidden md:block" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </header>

        {/* Content Skeleton */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="space-y-2">
              <Skeleton className="h-8 w-64 rounded" />
              <Skeleton className="h-4 w-48 rounded" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={`stat-${i}`} className="h-28 w-full rounded-xl" />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="col-span-2 space-y-4">
                <Skeleton className="h-8 w-48 rounded" />
                <Skeleton className="h-64 w-full rounded-xl" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-8 w-48 rounded" />
                <Skeleton className="h-64 w-full rounded-xl" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
