import React from "react";

/**
 * Reusable VIP icon renderer.
 * Supports: iconVideo (MP4 animated), iconImage (PNG), icon (emoji fallback).
 */
export default function VipIcon({ iconVideo, iconImage, icon, alt, className, style, round }) {
  const baseClass = round ? "w-full h-full object-cover rounded-full" : "w-full h-full object-cover";
  const cls = className || baseClass;

  if (iconVideo) {
    return (
      <video
        src={iconVideo}
        autoPlay
        loop
        muted
        playsInline
        className={cls}
        style={style}
      />
    );
  }
  if (iconImage) {
    return <img src={iconImage} alt={alt} className={cls} style={style} />;
  }
  return <span className={cls} style={{ display: "flex", alignItems: "center", justifyContent: "center", ...style }}>{icon}</span>;
}