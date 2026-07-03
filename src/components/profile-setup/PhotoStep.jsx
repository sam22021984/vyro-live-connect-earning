import React, { useState, useRef } from "react";
import { Camera, Upload, ArrowRight, Check, Loader2, X } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function PhotoStep({ data, updateData, onContinue }) {
  const [avatarUrl, setAvatarUrl] = useState(data.avatar_url || "");
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState("");
  const galleryInput = useRef(null);
  const cameraInput = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setStatus("rejected");
      return;
    }
    setUploading(true);
    setStatus("");
    try {
      const file_base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const res = await base44.functions.invoke("uploadFile", {
        file_base64,
        filename: file.name,
        content_type: file.type,
      });
      const file_url = res.data?.file_url;
      if (!file_url) throw new Error("Upload failed");
      setAvatarUrl(file_url);
      updateData({ avatar_url: file_url });
      setStatus("approved");
    } catch (e) {
      setStatus("error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-center mb-6">
        {avatarUrl ? (
          <div className="relative">
            <img src={avatarUrl} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-purple-200" />
            <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-green-500 flex items-center justify-center border-2 border-white">
              <Check size={14} className="text-white" />
            </div>
          </div>
        ) : (
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-200 to-blue-200 flex items-center justify-center">
            <Camera size={32} className="text-purple-500" />
          </div>
        )}
      </div>

      {status === "approved" && (
        <div className="mb-4 p-3 rounded-xl bg-green-50 text-green-600 text-xs font-medium text-center">
          ✓ Profile photo updated successfully.
        </div>
      )}
      {status === "rejected" && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-500 text-xs font-medium text-center">
          This image violates our community guidelines.
        </div>
      )}
      {status === "error" && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-500 text-xs font-medium text-center">
          Upload failed. Please try again.
        </div>
      )}

      <input ref={galleryInput} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
      <input ref={cameraInput} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />

      <div className="space-y-3 mb-4">
        <button
          onClick={() => galleryInput.current?.click()}
          disabled={uploading}
          className="w-full rounded-2xl bg-white border border-gray-100 text-gray-700 font-semibold text-sm shadow-sm transition active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
          style={{ height: "52px" }}
        >
          {uploading ? <><Loader2 size={16} className="animate-spin" /> Uploading...</> : <><Upload size={18} /> Upload Photo</>}
        </button>
        <button
          onClick={() => cameraInput.current?.click()}
          disabled={uploading}
          className="w-full rounded-2xl bg-white border border-gray-100 text-gray-700 font-semibold text-sm shadow-sm transition active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
          style={{ height: "52px" }}
        >
          <Camera size={18} /> Take Photo
        </button>
      </div>

      <button
        onClick={() => onContinue()}
        className="w-full rounded-2xl bg-gradient-to-r from-[#6F35E0] to-[#C135E0] text-white font-bold text-sm shadow-lg shadow-purple-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        style={{ height: "52px" }}
      >
        {avatarUrl ? "Continue" : "Skip"} <ArrowRight size={16} />
      </button>
    </div>
  );
}