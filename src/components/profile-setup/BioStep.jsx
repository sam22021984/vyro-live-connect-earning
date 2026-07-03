import React, { useState } from "react";
import { PenLine, ArrowRight, AlertCircle } from "lucide-react";

const MAX_LENGTH = 300;
const PROFANITY = ["spam", "scam", "http://", "https://", "www.", ".com", ".net"];

export default function BioStep({ data, updateData, onContinue }) {
  const [bio, setBio] = useState(data.bio || "");
  const [error, setError] = useState("");

  const checkBio = (text) => {
    const lower = text.toLowerCase();
    if (PROFANITY.some((w) => lower.includes(w))) {
      setError("Links and spam content are not allowed in your bio.");
      return false;
    }
    setError("");
    return true;
  };

  const handleContinue = () => {
    if (!checkBio(bio)) return;
    updateData({ bio });
    onContinue();
  };

  return (
    <div>
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-200 to-blue-200 flex items-center justify-center">
          <PenLine size={32} className="text-purple-500" />
        </div>
      </div>

      <div className="relative mb-2">
        <textarea
          placeholder="Write a short bio about yourself..."
          value={bio}
          onChange={(e) => { setBio(e.target.value.slice(0, MAX_LENGTH)); setError(""); }}
          className="w-full rounded-2xl bg-white border border-gray-100 text-sm shadow-sm p-4 outline-none focus:border-purple-300 resize-none"
          rows={5}
          autoFocus
        />
      </div>

      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] text-gray-400">{bio.length}/{MAX_LENGTH} characters</span>
        {error && (
          <span className="text-[10px] text-red-500 font-semibold flex items-center gap-1">
            <AlertCircle size={10} /> {error}
          </span>
        )}
      </div>

      <p className="text-[10px] text-gray-300 mb-6">
        Example: Love Music 🎵 | Avid traveler | Live streaming enthusiast
      </p>

      <button
        onClick={handleContinue}
        className="w-full rounded-2xl bg-gradient-to-r from-[#6F35E0] to-[#C135E0] text-white font-bold text-sm shadow-lg shadow-purple-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        style={{ height: "52px" }}
      >
        Continue <ArrowRight size={16} />
      </button>
    </div>
  );
}