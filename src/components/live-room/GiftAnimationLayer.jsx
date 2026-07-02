import React, { useState, useEffect } from "react";
import { COLORS } from "./roomData";

export default function GiftAnimationLayer() {
  const [gifts, setGifts] = useState([]);

  useEffect(() => {
    // Simulate periodic gift animations
    const giftEmojis = ["🌹", "💎", "👑", "🎁", "🏆", "💖"];
    const interval = setInterval(() => {
      const id = Date.now() + Math.random();
      const emoji = giftEmojis[Math.floor(Math.random() * giftEmojis.length)];
      const left = Math.random() * 70 + 15;
      const duration = 4 + Math.random() * 2;
      setGifts((prev) => [...prev, { id, emoji, left, duration }]);

      setTimeout(() => {
        setGifts((prev) => prev.filter((g) => g.id !== id));
      }, duration * 1000);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      {gifts.map((gift) => (
        <div
          key={gift.id}
          className="absolute text-4xl"
          style={{
            left: `${gift.left}%`,
            bottom: 0,
            animation: `giftFloat ${gift.duration}s ease-out forwards`,
            filter: `drop-shadow(0 0 8px ${COLORS.gold})`,
          }}
        >
          {gift.emoji}
        </div>
      ))}

      <style>{`
        @keyframes giftFloat {
          0% { transform: translateY(0) scale(0.5); opacity: 0; }
          15% { transform: translateY(-50px) scale(1.2); opacity: 1; }
          50% { transform: translateY(-200px) scale(1); opacity: 1; }
          100% { transform: translateY(-400px) scale(0.8); opacity: 0; }
        }
      `}</style>
    </div>
  );
}