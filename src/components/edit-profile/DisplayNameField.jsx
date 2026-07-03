import React, { useState, useEffect, useRef } from "react";
import { Loader2, Check, AlertCircle } from "lucide-react";

export default function DisplayNameField({ value, onChange }) {
  const [error, setError] = useState(null);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (!value || value.length === 0) { setError(null); setValid(false); return; }
    if (value.length < 2) { setError("Minimum 2 characters"); setValid(false); return; }
    if (value.length > 50) { setError("Maximum 50 characters"); setValid(false); return; }
    setError(null);
    setValid(true);
  }, [value]);

  return (
    <div>
      <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Display Name</label>
      <div className="relative">
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          maxLength={50}
          className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm"
          placeholder="Your display name"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {valid && <Check size={14} className="text-green-500" />}
          {error && <AlertCircle size={14} className="text-red-500" />}
        </div>
      </div>
      {error && <p className="text-[10px] text-red-500 mt-1">{error}</p>}
      <p className="text-[9px] text-gray-300 mt-0.5 text-right">{(value || "").length}/50</p>
    </div>
  );
}