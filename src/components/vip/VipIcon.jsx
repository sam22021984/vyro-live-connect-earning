import React from "react";

/**
 * Reusable VIP icon renderer.
 * Supports: iconVideo (MP4 animated), iconImage (PNG), icon (emoji fallback).
 * Uses object-contain to preserve full 1024×1024 assets without cropping.
 */
export default function VipIcon({ iconVideo, iconImage, icon, alt, className, style, round }) {
  const baseClass = round ? "w-full h-full object-contain rounded-full" : "w-full h-full object-contain";
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