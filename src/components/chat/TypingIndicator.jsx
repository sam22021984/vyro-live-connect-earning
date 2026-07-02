import React from "react";

export default function TypingIndicator() {
  return (
    <div className="flex justify-start my-0.5 px-3">
      <div className="px-4 py-2.5 rounded-2xl bg-white border border-gray-100 shadow-sm" style={{ borderBottomLeftRadius: 4 }}>
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-gray-400"
              style={{ animation: `typingBounce 1.2s infinite`, animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}