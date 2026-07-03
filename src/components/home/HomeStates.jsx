import React from "react";
import { RefreshCw, WifiOff, Inbox } from "lucide-react";

export function HomeSkeleton() {
  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <div className="max-w-md mx-auto">
        {/* Header skeleton */}
        <div className="flex items-center gap-2 px-3 py-2.5 bg-white border-b border-gray-50 animate-pulse">
          <div className="w-9 h-9 rounded-xl bg-gray-100" />
          <div className="w-16 h-8 rounded-lg bg-gray-100" />
          <div className="flex-1" />
          <div className="w-9 h-9 rounded-xl bg-gray-100" />
          <div className="w-9 h-9 rounded-xl bg-gray-100" />
          <div className="w-9 h-9 rounded-xl bg-gray-100" />
          <div className="w-9 h-9 rounded-xl bg-gray-100" />
        </div>

        {/* Tabs skeleton */}
        <div className="flex gap-1 px-3 py-2 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-20 h-7 rounded-full bg-gray-100" />
          ))}
        </div>

        {/* Banner skeleton */}
        <div className="px-3 pt-3 animate-pulse">
          <div className="h-20 rounded-2xl bg-gray-100" />
        </div>

        {/* Live feed skeleton */}
        <div className="pt-4">
          <div className="h-4 w-24 bg-gray-100 rounded ml-3 mb-2 animate-pulse" />
          <div className="flex gap-2.5 px-3 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-36 animate-pulse">
                <div className="h-44 rounded-2xl bg-gray-100" />
                <div className="h-3 w-20 bg-gray-100 rounded mt-2" />
                <div className="h-2 w-16 bg-gray-100 rounded mt-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Creator skeleton */}
        <div className="pt-4">
          <div className="h-4 w-32 bg-gray-100 rounded ml-3 mb-2 animate-pulse" />
          <div className="flex gap-2.5 px-3 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-32 animate-pulse">
                <div className="h-16 rounded-t-2xl bg-gray-100" />
                <div className="h-12 rounded-b-2xl bg-gray-50" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function EmptyState({ onRefresh }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-4">
        <Inbox size={36} className="text-gray-300" />
      </div>
      <h3 className="text-sm font-bold text-gray-700 mb-1">No live content is available at the moment.</h3>
      <p className="text-xs text-gray-400 mb-6">New rooms will appear soon.</p>
      <button
        onClick={onRefresh}
        className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#6F35E0] to-[#C135E0] text-white text-xs font-bold flex items-center gap-2 active:scale-95 transition"
      >
        <RefreshCw size={14} /> Refresh
      </button>
    </div>
  );
}

export function ErrorState({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-4">
        <WifiOff size={36} className="text-red-300" />
      </div>
      <h3 className="text-sm font-bold text-gray-700 mb-1">Unable to load data.</h3>
      <p className="text-xs text-gray-400 mb-6">Please check your connection and try again.</p>
      <button
        onClick={onRetry}
        className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#6F35E0] to-[#C135E0] text-white text-xs font-bold flex items-center gap-2 active:scale-95 transition"
      >
        <RefreshCw size={14} /> Retry
      </button>
    </div>
  );
}