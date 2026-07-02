import React, { useState } from "react";
import { X, Languages, Globe } from "lucide-react";
import { COLORS, LANGUAGES } from "./chatData";

export default function TranslationPanel({ open, onClose, onTranslate, onShowOriginal, onChangeLanguage, onDisable, currentLang }) {
  const [showLangs, setShowLangs] = useState(false);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-t-3xl pb-6 animate-fadeIn">
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mt-3 mb-2" />
        <div className="flex items-center justify-between px-4 pb-2 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1.5"><Languages size={16} style={{ color: COLORS.primary }} /> Auto Translation</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><X size={15} className="text-gray-500" /></button>
        </div>

        {!showLangs ? (
          <div className="px-4 py-3 space-y-1">
            <button onClick={onTranslate} className="w-full flex items-center gap-3 py-3 px-3 rounded-xl active:bg-gray-50">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: `${COLORS.primary}15` }}><Languages size={18} style={{ color: COLORS.primary }} /></div>
              <span className="text-sm font-semibold text-gray-700">Translate</span>
            </button>
            <button onClick={onShowOriginal} className="w-full flex items-center gap-3 py-3 px-3 rounded-xl active:bg-gray-50">
              <div className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-100"><Languages size={18} className="text-gray-500" /></div>
              <span className="text-sm font-semibold text-gray-700">Show Original</span>
            </button>
            <button onClick={() => setShowLangs(true)} className="w-full flex items-center gap-3 py-3 px-3 rounded-xl active:bg-gray-50">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: `${COLORS.gold}15` }}><Globe size={18} style={{ color: COLORS.gold }} /></div>
              <span className="text-sm font-semibold text-gray-700">Change Language {currentLang && <span className="text-gray-400">({currentLang})</span>}</span>
            </button>
            <button onClick={onDisable} className="w-full flex items-center gap-3 py-3 px-3 rounded-xl active:bg-gray-50">
              <div className="w-9 h-9 rounded-full flex items-center justify-center bg-red-50"><X size={18} className="text-red-500" /></div>
              <span className="text-sm font-semibold text-red-500">Disable Translation</span>
            </button>
          </div>
        ) : (
          <div className="px-4 py-3 space-y-1">
            {LANGUAGES.map((l) => (
              <button key={l.code} onClick={() => { onChangeLanguage(l); setShowLangs(false); }} className="w-full flex items-center gap-3 py-3 px-3 rounded-xl active:bg-gray-50">
                <span className="text-2xl">{l.flag}</span>
                <span className="text-sm font-semibold text-gray-700">{l.name}</span>
                {currentLang === l.code && <span className="ml-auto text-xs font-bold" style={{ color: COLORS.primary }}>✓</span>}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}