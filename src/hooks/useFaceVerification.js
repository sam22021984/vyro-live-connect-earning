import { useState, useCallback, useRef, useEffect } from "react";
import { base44 } from "@/api/base44Client";

/**
 * Camera management hook for face verification.
 * Handles live camera stream, frame capture, and upload.
 */
export function useCamera() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [error, setError] = useState("");
  const [facingMode, setFacingMode] = useState("user");

  const startCamera = useCallback(async () => {
    setError("");
    try {
      // Stop existing stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setCameraReady(true);
      return true;
    } catch (err) {
      const msg = err.name === "NotAllowedError"
        ? "Camera permission denied. Please allow camera access to verify your identity."
        : err.name === "NotFoundError"
        ? "No camera found. Please connect a camera to continue."
        : err.message || "Failed to access camera.";
      setError(msg);
      setCameraReady(false);
      return false;
    }
  }, [facingMode]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraReady(false);
  }, []);

  const captureFrame = useCallback(async () => {
    if (!videoRef.current || !cameraReady) return null;

    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");

    // Mirror if front camera
    if (facingMode === "user") {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to blob
    return new Promise((resolve) => {
      canvas.toBlob(async (blob) => {
        if (!blob) {
          resolve(null);
          return;
        }
        try {
          const file = new File([blob], `face_frame_${Date.now()}.jpg`, { type: "image/jpeg" });
          const res = await base44.integrations.Core.UploadFile({ file });
          const fileUrl = res.file_url || res.data?.file_url;
          resolve(fileUrl);
        } catch (err) {
          resolve(null);
        }
      }, "image/jpeg", 0.85);
    });
  }, [cameraReady, facingMode]);

  const switchCamera = useCallback(() => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  }, []);

  // Restart camera when facing mode changes
  useEffect(() => {
    if (cameraReady) {
      startCamera();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facingMode]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  return {
    videoRef,
    cameraReady,
    error,
    facingMode,
    startCamera,
    stopCamera,
    captureFrame,
    switchCamera,
  };
}

/**
 * Generate a device fingerprint for device tracking.
 */
export function generateDeviceFingerprint() {
  const nav = navigator;
  const screen = window.screen;

  const components = [
    nav.userAgent || "",
    nav.language || "",
    nav.languages?.join(",") || "",
    nav.platform || "",
    nav.hardwareConcurrency?.toString() || "",
    nav.maxTouchPoints?.toString() || "",
    screen.width?.toString() || "",
    screen.height?.toString() || "",
    screen.colorDepth?.toString() || "",
    screen.pixelDepth?.toString() || "",
    new Date().getTimezoneOffset().toString(),
    Intl.DateTimeFormat().resolvedOptions().timeZone || "",
  ];

  // Create a simple hash
  const str = components.join("|");
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return `fp_${Math.abs(hash).toString(36)}_${str.length.toString(36)}`;
}

/**
 * Detect device info for registration.
 */
export function getDeviceInfo() {
  const nav = navigator;
  const ua = nav.userAgent;

  let platform = "Unknown";
  let os = "Unknown";
  let osVersion = "";
  let browser = "Unknown";
  let browserVersion = "";

  // Platform
  if (/Windows/i.test(ua)) { platform = "Windows"; os = "Windows"; }
  else if (/Mac/i.test(ua)) { platform = "macOS"; os = "macOS"; }
  else if (/Android/i.test(ua)) { platform = "Android"; os = "Android"; }
  else if (/iPhone|iPad|iPod/i.test(ua)) { platform = "iOS"; os = "iOS"; }
  else if (/Linux/i.test(ua)) { platform = "Linux"; os = "Linux"; }

  // OS version
  const osMatch = ua.match(/(Windows NT|Android|iPhone OS|CPU OS|Mac OS X)\s([\d_]+)/);
  if (osMatch) osVersion = osMatch[2].replace(/_/g, ".");

  // Browser
  if (/Edg/i.test(ua)) { browser = "Edge"; }
  else if (/Chrome/i.test(ua)) { browser = "Chrome"; }
  else if (/Firefox/i.test(ua)) { browser = "Firefox"; }
  else if (/Safari/i.test(ua)) { browser = "Safari"; }

  const browserMatch = ua.match(new RegExp(`${browser}\\/([\\d.]+)`));
  if (browserMatch) browserVersion = browserMatch[1];

  // Heuristic detection for emulator/VPN/proxy (not 100% accurate but provides signals)
  const isEmulator = /Emulator|Simulator|SDK/i.test(ua) || (/Android/i.test(ua) && /x86/i.test(ua));
  const isRooted = /root|jailbreak|cydia/i.test(ua);

  return {
    platform,
    os,
    os_version: osVersion,
    browser,
    browser_version: browserVersion,
    screen_resolution: `${screen.width}x${screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
    language: nav.language || "",
    is_emulator: isEmulator,
    is_rooted: isRooted,
    is_vpn: false, // Can't reliably detect from client; backend IP check handles this
    is_proxy: false,
  };
}