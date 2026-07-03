import React, { useState, useRef, useEffect } from "react";
import { Loader2, Camera, X, Check } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";

export default function MediaUploader({ field, label, value, onChange, aspect = "cover" }) {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const fileRef = useRef(null);
  const cameraRef = useRef(null);

  const handleUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      onChange(file_url);
      toast({ title: `${label} updated` });
    } catch (e) {
      toast({ title: "Upload failed", variant: "destructive" });
    }
    setUploading(false);
  };

  const handleRemove = () => {
    onChange("");
    setShowMenu(false);
    toast({ title: `${label} removed` });
  };

  return (
    <div className="mb-4">
      <label className="text-xs font-semibold text-gray-600 mb-1.5 block">{label}</label>
      <div className="relative rounded-xl overflow-hidden border border-gray-200" style={{ height: aspect === "cover" ? "120px" : "80px" }}>
        {value ? (
          <img src={value} alt={label} className="w-full h-full object-cover" />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${aspect === "cover" ? "from-purple-100 to-blue-100" : "from-purple-200 to-blue-200"} flex items-center justify-center`}>
            <Camera size={24} className="text-gray-300" />
          </div>
        )}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center active:scale-90 transition"
        >
          {uploading ? <Loader2 size={14} className="text-white animate-spin" /> : <Camera size={14} className="text-white" />}
        </button>

        {showMenu && (
          <div className="absolute bottom-12 right-2 bg-white rounded-xl shadow-lg border border-gray-100 z-10 overflow-hidden min-w-[120px]">
            <button onClick={() => { fileRef.current?.click(); setShowMenu(false); }} className="w-full px-3 py-2 text-xs text-gray-700 font-medium active:bg-gray-50 text-left">Upload New</button>
            <button onClick={() => { cameraRef.current?.click(); setShowMenu(false); }} className="w-full px-3 py-2 text-xs text-gray-700 font-medium active:bg-gray-50 text-left">Take Photo</button>
            {value && <button onClick={handleRemove} className="w-full px-3 py-2 text-xs text-red-500 font-medium active:bg-gray-50 text-left">Remove</button>}
          </div>
        )}
      </div>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(e.target.files?.[0])} />
      <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => handleUpload(e.target.files?.[0])} />
    </div>
  );
}