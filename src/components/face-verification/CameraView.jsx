import React, { useRef, useEffect, useState } from "react";
import { Camera, CameraOff, RefreshCw, AlertCircle } from "lucide-react";

export default function CameraView({ cameraReady, error, videoRef, onStartCamera, onSwitchCamera, facingMode, isCapturing }) {
  const [faceDetected, setFaceDetected] = useState(false);
  const animationRef = useRef(null);

  // Simple face presence detection using the browser's FaceDetector API (if available)
  // Falls back to just showing the video stream
  useEffect(() => {
    if (!cameraReady || !videoRef.current) return;

    let detector = null;
    try {
      if ("FaceDetector" in window) {
        detector = new window.FaceDetector({
          fastMode: true,
          maxDetectedFaces: 1,
        });
      }
    } catch (e) {
      // FaceDetector not available — use video stream only
    }

    const checkFace = async () => {
      if (videoRef.current && videoRef.current.readyState >= 2) {
        if (detector) {
          try {
            const faces = await detector.detect(videoRef.current);
            setFaceDetected(faces.length > 0);
          } catch (e) {
            setFaceDetected(true); // Assume face present if detection fails
          }
        } else {
          // No FaceDetector API — just verify video is playing
          setFaceDetected(videoRef.current.videoWidth > 0);
        }
      }
      animationRef.current = requestAnimationFrame(checkFace);
    };

    checkFace();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [cameraReady, videoRef]);

  if (error) {
    return (
      <div className="relative w-full aspect-[3/4] max-w-xs mx-auto rounded-3xl bg-black/40 border border-red-500/30 flex flex-col items-center justify-center p-6 text-center">
        <CameraOff size={48} className="text-red-400 mb-4" />
        <p className="text-red-300 text-sm font-medium mb-4">{error}</p>
        <button
          onClick={onStartCamera}
          className="px-6 py-2.5 rounded-xl bg-red-500/20 text-red-300 text-sm font-semibold flex items-center gap-2"
        >
          <RefreshCw size={14} /> Try Again
        </button>
      </div>
    );
  }

  if (!cameraReady) {
    return (
      <div className="relative w-full aspect-[3/4] max-w-xs mx-auto rounded-3xl bg-black/40 border border-purple-500/30 flex flex-col items-center justify-center p-6 text-center">
        <Camera size={48} className="text-purple-400 mb-4" />
        <p className="text-white/60 text-sm mb-4">Camera access required for face verification</p>
        <button
          onClick={onStartCamera}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#6F35E0] to-[#C135E0] text-white text-sm font-semibold flex items-center gap-2 shadow-lg shadow-purple-500/30"
        >
          <Camera size={16} /> Open Camera
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[3/4] max-w-xs mx-auto">
      {/* Video feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover rounded-3xl"
        style={{ transform: facingMode === "user" ? "scaleX(-1)" : "none" }}
      />

      {/* Face guide overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Oval face guide */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-60 rounded-[50%] border-2 transition-all duration-300 ${
            faceDetected ? "border-green-400 shadow-[0_0_20px_rgba(74,222,128,0.4)]" : "border-white/50"
          }`}
          style={{ borderStyle: "dashed" }}
        />

        {/* Corner brackets */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/60 rounded-tl-lg" />
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/60 rounded-tr-lg" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/60 rounded-bl-lg" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/60 rounded-br-lg" />

        {/* Face detection indicator */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2">
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${
            faceDetected ? "bg-green-500/30 text-green-300" : "bg-yellow-500/30 text-yellow-300"
          }`}>
            <div className={`w-1.5 h-1.5 rounded-full ${faceDetected ? "bg-green-400 animate-pulse" : "bg-yellow-400"}`} />
            {faceDetected ? "Face Detected" : "Position Your Face"}
          </div>
        </div>

        {/* Capturing overlay */}
        {isCapturing && (
          <div className="absolute inset-0 bg-white/10 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-white/60 border-t-white rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Switch camera button */}
      <button
        onClick={onSwitchCamera}
        className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center active:scale-90 transition"
      >
        <RefreshCw size={16} className="text-white" />
      </button>
    </div>
  );
}