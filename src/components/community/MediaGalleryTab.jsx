import React, { useState } from "react";
import { Loader2, Video, Download, X, Maximize2 } from "lucide-react";
import { COLORS } from "./communityData";
import { useToast } from "@/components/ui/use-toast";

const CATEGORIES = ["All", "Events", "PK Battles", "Music", "VIP", "Cultural", "Gifting"];

export default function MediaGalleryTab({ media = [], loading }) {
  const { toast } = useToast();
  const [filter, setFilter] = useState("All");
  const [preview, setPreview] = useState(null);

  const filtered = filter === "All" ? media : media.filter((m) => m.category === filter);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xs font-bold" style={{ color: COLORS.textPrimary }}>🖼️ Media Gallery</h3>
        <span className="text-[10px]" style={{ color: COLORS.textSecondary }}>{filtered.length} items</span>
      </div>

      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={"py-1.5 px-3 rounded-full text-[10px] font-bold whitespace-nowrap transition active:scale-95 " + (filter === cat ? "text-white" : "")}
            style={filter === cat
              ? { background: `linear-gradient(135deg, ${COLORS.royalBlue}, ${COLORS.skyBlue})` }
              : { background: COLORS.bgPrimary, color: COLORS.textSecondary, border: `1px solid ${COLORS.border}` }
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin" style={{ color: COLORS.royalBlue }} />
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-center text-xs py-12" style={{ color: COLORS.textSecondary }}>No media found</p>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {filtered.map((m) => (
            <div key={m.id} className="relative aspect-square rounded-xl overflow-hidden group" style={{ border: `1px solid ${COLORS.border}` }}>
              <img src={m.url} className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 flex flex-col justify-between p-1.5" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.5) 100%)" }}>
                <div className="flex justify-end gap-1">
                  <button onClick={() => setPreview(m)} className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(4px)" }}>
                    <Maximize2 size={10} className="text-white" />
                  </button>
                  <button onClick={() => toast({ title: "Downloading..." })} className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(4px)" }}>
                    <Download size={10} className="text-white" />
                  </button>
                </div>
                <div>
                  {m.type === "video" && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(0,0,0,0.5)" }}>
                      <Video size={14} className="text-white" fill="white" />
                    </div>
                  )}
                  <span className="text-[8px] text-white font-semibold block">{m.category}</span>
                  <span className="text-[7px] text-white/70 block">{m.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setPreview(null)}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div className="relative max-w-lg w-full">
            <img src={preview.url} className="w-full rounded-2xl" alt="" />
            <button className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}>
              <X size={18} className="text-white" />
            </button>
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">{preview.category}</span>
                <span className="text-[10px] text-white/70">{preview.date}</span>
              </div>
              <button onClick={() => toast({ title: "Downloading..." })} className="px-3 py-1.5 rounded-lg text-xs font-bold text-white flex items-center gap-1" style={{ background: COLORS.royalBlue }}>
                <Download size={12} /> Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}