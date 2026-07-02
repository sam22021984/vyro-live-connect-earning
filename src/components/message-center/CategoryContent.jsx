import React from "react";
import {
  Megaphone, LifeBuoy, BadgeCheck, Flag, Server, Mail, Bell, CheckCircle,
  XCircle, Scale, ShieldAlert, Archive, ChevronRight, Pin, Search,
  Plus, Upload, MessageSquare, Star, Clock, AlertCircle, Circle,
} from "lucide-react";
import { MESSAGE_ITEMS } from "@/components/message-center/messageCenterData";

const ICON_MAP = {
  Megaphone, LifeBuoy, BadgeCheck, Flag, Server, Mail, Bell, CheckCircle,
  XCircle, Scale, ShieldAlert, Archive, ChevronRight, Pin, Search,
  Plus, Upload, MessageSquare, Star, Clock, AlertCircle, Circle,
};

const getIcon = (name, size = 16, className = "") => {
  const Icon = ICON_MAP[name] || Circle;
  return <Icon size={size} className={className} />;
};

const DARK_BG = "linear-gradient(160deg, #0A0F1E 0%, #131A2E 40%, #1A1240 100%)";
const SOFT_WHITE = "#F4F0FA";
const GLASS = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" };

const statusColors = {
  open: "#10B981", pending: "#F59E0B", closed: "#6B7280", approved: "#10B981",
  rejected: "#EF4444", action_required: "#F59E0B", investigating: "#3B82F6",
  acknowledged: "#8B5CF6", processing: "#06B6D4", ongoing: "#3B82F6", resolved: "#10B981",
};

const priorityColors = { high: "#EF4444", medium: "#F59E0B", low: "#6B7280" };

function ActionChip({ label, icon, color }) {
  return (
    <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-bold active:scale-95 transition" style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}>
      {getIcon(icon, 12)}
      {label}
    </button>
  );
}

function CategoryHeader({ category }) {
  return (
    <div className="rounded-2xl p-3 mb-3" style={{ ...GLASS, background: `${category.color}10`, border: `1px solid ${category.color}25` }}>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: category.gradient }}>
          {getIcon(category.icon, 16, "text-white")}
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold" style={{ color: SOFT_WHITE }}>{category.name}</h3>
          <p className="text-[10px]" style={{ color: "rgba(244,240,250,0.4)" }}>{category.description}</p>
        </div>
      </div>
    </div>
  );
}

function OptionsList({ options, color }) {
  return (
    <div className="rounded-2xl p-3 mb-3" style={GLASS}>
      <h4 className="text-xs font-bold mb-2" style={{ color: SOFT_WHITE }}>Options</h4>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt, i) => (
          <span key={i} className="text-[10px] px-2.5 py-1.5 rounded-lg font-medium" style={{ background: `${color}12`, color }}>
            {opt}
          </span>
        ))}
      </div>
    </div>
  );
}

function ActionsList({ actions, color }) {
  return (
    <div className="rounded-2xl p-3 mb-3" style={GLASS}>
      <h4 className="text-xs font-bold mb-2" style={{ color: SOFT_WHITE }}>Actions</h4>
      <div className="flex flex-wrap gap-1.5">
        {actions.map((act, i) => (
          <ActionChip key={i} label={act} icon="Circle" color={color} />
        ))}
      </div>
    </div>
  );
}

export default function CategoryContent({ category }) {
  const items = MESSAGE_ITEMS[category.id] || [];

  return (
    <div>
      <CategoryHeader category={category} />
      <OptionsList options={category.options} color={category.color} />
      <ActionsList actions={category.actions} color={category.color} />

      {/* Items */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold px-1 mb-1" style={{ color: SOFT_WHITE }}>Recent Messages</h4>
        {items.map((item, i) => {
          const status = item.status;
          const statusColor = status ? statusColors[status] || "#6B7280" : null;
          const priority = item.priority;
          const prColor = priority ? priorityColors[priority] || "#6B7280" : null;

          return (
            <div key={i} className="rounded-2xl p-3" style={{ ...GLASS, border: item.isRead ? GLASS.border : `${category.color}30`, background: item.isRead ? GLASS.background : `${category.color}08` }}>
              <div className="flex items-start gap-2">
                {/* Unread indicator */}
                <div className="mt-1.5 flex-shrink-0">
                  {item.isPinned ? <Pin size={12} style={{ color: "#D4AF37" }} /> : !item.isRead ? <div className="w-2 h-2 rounded-full" style={{ background: category.color }} /> : <Circle size={12} style={{ color: "rgba(244,240,250,0.15)" }} />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h5 className="text-xs font-bold flex-1 truncate" style={{ color: item.isRead ? "rgba(244,240,250,0.7)" : SOFT_WHITE }}>{item.title}</h5>
                    <span className="text-[9px] flex-shrink-0" style={{ color: "rgba(244,240,250,0.3)" }}>{item.time}</span>
                  </div>
                  <p className="text-[9px] mb-1" style={{ color: `${category.color}cc` }}>{item.category}</p>
                  {item.body && <p className="text-[10px] leading-relaxed mb-1.5 line-clamp-2" style={{ color: "rgba(244,240,250,0.5)" }}>{item.body}</p>}
                  <div className="flex items-center gap-1.5">
                    {status && (
                      <span className="text-[8px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: `${statusColor}20`, color: statusColor }}>
                        {status.toUpperCase().replace("_", " ")}
                      </span>
                    )}
                    {prColor && (
                      <span className="text-[8px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: `${prColor}20`, color: prColor }}>
                        {priority.toUpperCase()}
                      </span>
                    )}
                    {item.messages && (
                      <span className="text-[8px] flex items-center gap-1" style={{ color: "rgba(244,240,250,0.4)" }}>
                        <MessageSquare size={9} /> {item.messages}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick actions */}
              <div className="flex gap-1.5 mt-2.5 pt-2.5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <ActionChip label="View" icon="Search" color={category.color} />
                {!item.isRead && <ActionChip label="Read" icon="CheckCircle" color="#10B981" />}
                {item.isRead && <ActionChip label="Unread" icon="Bell" color="#F59E0B" />}
                {category.id === "customer_support" && <ActionChip label="Reply" icon="MessageSquare" color={category.color} />}
                {category.id === "verification_center" && <ActionChip label="Upload" icon="Upload" color={category.color} />}
                {category.id === "reports_violations" && <ActionChip label="Appeal" icon="Scale" color={category.color} />}
                <ActionChip label="Archive" icon="Archive" color="#6B7280" />
              </div>
            </div>
          );
        })}

        {/* Create new button */}
        <button className="w-full mt-2 py-3 rounded-2xl text-xs font-bold active:scale-95 transition flex items-center justify-center gap-2" style={{ background: category.gradient, color: "#fff" }}>
          <Plus size={14} />
          {category.id === "customer_support" ? "Create New Ticket" : category.id === "verification_center" ? "Submit Verification" : category.id === "reports_violations" ? "Submit New Report" : "View All Messages"}
        </button>
      </div>
    </div>
  );
}