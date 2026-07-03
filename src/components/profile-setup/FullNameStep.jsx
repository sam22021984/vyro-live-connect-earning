import React, { useState } from "react";
import { User, ArrowRight, AlertCircle } from "lucide-react";

export default function FullNameStep({ data, updateData, onContinue }) {
  const [name, setName] = useState(data.full_name || "");
  const [error, setError] = useState("");

  const hasEmoji = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(name);

  const validate = () => {
    if (name.trim().length < 2) { setError("Name must be at least 2 characters"); return false; }
    if (name.length > 50) { setError("Name must be 50 characters or less"); return false; }
    if (hasEmoji) { setError("Emojis are not allowed in your name"); return false; }
    setError("");
    return true;
  };

  const handleContinue = () => {
    if (!validate()) return;
    updateData({ full_name: name.trim() });
    onContinue();
  };

  return (
    <div>
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-200 to-blue-200 flex items-center justify-center">
          <User size={32} className="text-purple-500" />
        </div>
      </div>

      <div className="relative mb-2">
        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => { setName(e.target.value); setError(""); }}
          className="w-full pl-11 pr-4 rounded-2xl bg-white border border-gray-100 text-sm shadow-sm outline-none focus:border-purple-300"
          style={{ height: "52px" }}
          autoFocus
          maxLength={50}
        />
      </div>

      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] text-gray-400">{name.length}/50 characters</span>
        {error && (
          <span className="text-[10px] text-red-500 font-semibold flex items-center gap-1">
            <AlertCircle size={10} /> {error}
          </span>
        )}
      </div>

      <p className="text-[10px] text-gray-300 mb-6">This is the name that will be displayed on your profile.</p>

      <button
        onClick={handleContinue}
        disabled={name.trim().length < 2}
        className="w-full rounded-2xl bg-gradient-to-r from-[#6F35E0] to-[#C135E0] text-white font-bold text-sm shadow-lg shadow-purple-200 transition-all active:scale-[0.98] disabled:opacity-40 flex items-center justify-center gap-2"
        style={{ height: "52px" }}
      >
        Continue <ArrowRight size={16} />
      </button>
    </div>
  );
}