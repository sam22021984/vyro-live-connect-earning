import React from 'react';
import { useLiveAnalytics } from '@/hooks/useLiveAnalytics';
import { Users, Radio, MessageSquare, Gift, DollarSign, Activity, Heart, Zap, ShieldCheck } from 'lucide-react';

export default function LiveAnalyticsWidget() {
  const { analytics, loading } = useLiveAnalytics(15000);

  if (loading || !analytics?.live_metrics) return null;

  const m = analytics.live_metrics;
  const health = analytics.system_health || {};
  const engagement = analytics.engagement || {};
  const economy = analytics.economy || {};

  const stats = [
    { label: 'Active', value: m.active_users || 0, icon: Users, color: 'text-blue-500' },
    { label: 'Rooms', value: m.active_rooms || 0, icon: Radio, color: 'text-red-500' },
    { label: 'Messages', value: m.total_messages || 0, icon: MessageSquare, color: 'text-green-500' },
    { label: 'Gifts', value: m.gifts_sent || 0, icon: Gift, color: 'text-purple-500' },
    { label: 'Revenue', value: `$${m.revenue_today || 0}`, icon: DollarSign, color: 'text-amber-500' },
  ];

  const apiOk = health.api_status === 'healthy';
  const dbOk = health.db_status === 'connected';

  return (
    <div className="px-4 py-2">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-semibold text-gray-700">Live System Metrics</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className={`flex items-center gap-1 text-[9px] font-medium ${apiOk ? 'text-green-600' : 'text-red-500'}`}>
              <Activity size={10} /> API
            </div>
            <div className={`flex items-center gap-1 text-[9px] font-medium ${dbOk ? 'text-green-600' : 'text-red-500'}`}>
              <ShieldCheck size={10} /> DB
            </div>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center">
              <s.icon size={16} className={s.color} />
              <span className="text-sm font-bold text-gray-900 mt-1">{s.value}</span>
              <span className="text-[9px] text-gray-500 leading-tight">{s.label}</span>
            </div>
          ))}
        </div>
        {(engagement.chat_activity || economy.coin_volume != null) && (
          <div className="flex items-center gap-3 mt-2 pt-2 border-t border-gray-100">
            {engagement.chat_activity && (
              <div className="flex items-center gap-1 text-[9px] text-gray-500">
                <Zap size={10} className="text-orange-500" />
                Chat: <span className="font-semibold text-gray-700 capitalize">{engagement.chat_activity}</span>
              </div>
            )}
            {economy.coin_volume != null && (
              <div className="flex items-center gap-1 text-[9px] text-gray-500">
                <Heart size={10} className="text-pink-500" />
                Coins: <span className="font-semibold text-gray-700">{economy.coin_volume.toLocaleString()}</span>
              </div>
            )}
            {health.error_rate != null && (
              <div className="flex items-center gap-1 text-[9px] text-gray-500 ml-auto">
                Errors: <span className="font-semibold text-gray-700">{health.error_rate}%</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}