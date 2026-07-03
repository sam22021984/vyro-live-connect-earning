import React from "react";

export default function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <div className="max-w-md mx-auto">
        {/* Header skeleton */}
        <div className="h-48 bg-gradient-to-br from-purple-200 to-blue-200 animate-pulse rounded-b-[28px]" />
        <div className="px-3 -mt-8 relative">
          <div className="w-20 h-20 rounded-full bg-white border-4 border-white animate-pulse mx-auto" />
        </div>
        <div className="flex flex-col items-center gap-2 pt-2">
          <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
          <div className="h-3 w-24 bg-gray-100 rounded animate-pulse" />
        </div>

        {/* Stats skeleton */}
        <div className="px-3 pt-4">
          <div className="bg-white rounded-2xl grid grid-cols-4 divide-x divide-gray-50 shadow-sm border border-gray-50">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex flex-col items-center py-3">
                <div className="h-4 w-8 bg-gray-100 rounded animate-pulse mb-1" />
                <div className="h-2 w-10 bg-gray-100 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Buttons skeleton */}
        <div className="px-3 pt-3 space-y-2">
          <div className="flex gap-2">
            <div className="flex-1 h-10 bg-gray-100 rounded-xl animate-pulse" />
            <div className="flex-1 h-10 bg-gray-100 rounded-xl animate-pulse" />
          </div>
          <div className="flex gap-2">
            <div className="flex-1 h-10 bg-gray-100 rounded-xl animate-pulse" />
            <div className="flex-1 h-10 bg-gray-100 rounded-xl animate-pulse" />
            <div className="flex-1 h-10 bg-gray-100 rounded-xl animate-pulse" />
            <div className="flex-1 h-10 bg-gray-100 rounded-xl animate-pulse" />
          </div>
        </div>

        {/* Content skeleton */}
        <div className="px-3 pt-4 space-y-3">
          <div className="h-16 bg-gray-100 rounded-2xl animate-pulse" />
          <div className="h-16 bg-gray-100 rounded-2xl animate-pulse" />
          <div className="h-32 bg-gray-100 rounded-2xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}