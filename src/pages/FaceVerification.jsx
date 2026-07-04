import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, ScanFace, Lock, Eye, EyeOff, MoveHorizontal, ArrowUpDown, ZoomIn } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useCamera, generateDeviceFingerprint, getDeviceInfo } from "@/hooks/useFaceVerification";
import CameraView from "@/components/face-verification/CameraView";
import VerificationSteps from "@/components/face-verification/VerificationSteps";
import VerificationResult from "@/components/face-verification/VerificationResult";

const STEP_ICONS = {
  face_front: ScanFace,
  blink: Eye,
  turn_left: ArrowLeft,
  turn_right: ArrowLeft,
  look_up: ArrowUpDown,
  look_down: ArrowUpDown,
  zoom: ZoomIn,
};

export default function FaceVerification() {
  const navigate = useNavigate();
  const { videoRef, cameraReady, error: cameraError, facingMode, startCamera, stopCamera, captureFrame, switchCamera } = useCamera();

  const [phase, setPhase] = useState("intro"); // intro | verifying | success | failed | review
  const [verificationId, setVerificationId] = useState(null);
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [livenessChecks, setLivenessChecks] = useState({});
  const [isCapturing, setIsCapturing] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [attemptCount, setAttemptCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const stepTimerRef = useRef(null);

  // Register device on mount
  useEffect(() => {
    const registerDevice = async () => {
      try {
        const fingerprint = generateDeviceFingerprint();
        const deviceInfo = getDeviceInfo();
        await base44.functions.invoke("faceVerification", {
          action: "registerDevice",
          device_fingerprint: fingerprint,
          ...deviceInfo,
        });
      } catch (e) {
        // Non-critical — continue
      }
    };
    registerDevice();
  }, []);

  // Cleanup camera and timers on unmount
  useEffect(() => {
    return () => {
      stopCamera();
      if (stepTimerRef.current) clearTimeout(stepTimerRef.current);
    };
  }, [stopCamera]);

  // Start verification flow
  const handleStart = async () => {
    setLoading(true);
    try {
      const res = await base44.functions.invoke("faceVerification", { action: "startVerification" });
      const data = res.data || res;

      if (data.already_verified) {
        setPhase("success");
        setResultMessage("Your identity is already verified.");
        return;
      }

      if (data.review_required) {
        setPhase("review");
        setResultMessage(data.message);
        setAttemptCount(data.failed_attempts);
        return;
      }

      setVerificationId(data.verification_id);
      setSteps(data.steps);
      setAttemptCount(data.attempt_count);
      setCurrentStepIndex(0);
      setLivenessChecks({});
      setPhase("verifying");

      // Start camera
      await startCamera();
    } catch (err) {
      setResultMessage(err.message || "Failed to start verification");
      setPhase("failed");
    } finally {
      setLoading(false);
    }
  };

  // Capture and verify current step
  const verifyCurrentStep = useCallback(async () => {
    if (!verificationId || !cameraReady || isCapturing) return;

    const currentStep = steps[currentStepIndex];
    if (!currentStep) return;

    setIsCapturing(true);

    try {
      // Capture frame from camera
      const frameUrl = await captureFrame();
      if (!frameUrl) {
        setIsCapturing(false);
        return;
      }

      // Send to backend for AI analysis
      const res = await base44.functions.invoke("faceVerification", {
        action: "verifyStep",
        verification_id: verificationId,
        step_key: currentStep.key,
        frame_url: frameUrl,
      });
      const data = res.data || res;

      // Update liveness checks
      setLivenessChecks((prev) => ({
        ...prev,
        [currentStep.key]: {
          passed: data.passed,
          confidence: data.confidence,
          reason: data.reason,
        },
      }));

      if (data.fraud_detected) {
        // Fraud detected — fail immediately
        await completeVerification();
        return;
      }

      if (data.passed) {
        // Move to next step after a brief delay
        stepTimerRef.current = setTimeout(() => {
          if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex((prev) => prev + 1);
          } else {
            // All steps done — complete verification
            completeVerification();
          }
        }, 800);
      } else {
        // Step failed — retry same step after delay
        stepTimerRef.current = setTimeout(() => {
          // Allow retry
        }, 1500);
      }
    } catch (err) {
      // Error — allow retry
    } finally {
      setIsCapturing(false);
    }
  }, [verificationId, cameraReady, isCapturing, steps, currentStepIndex, captureFrame]);

  // Complete verification
  const completeVerification = async () => {
    if (!verificationId) return;

    try {
      const res = await base44.functions.invoke("faceVerification", {
        action: "completeVerification",
        verification_id: verificationId,
      });
      const data = res.data || res;

      if (data.verified) {
        setPhase("success");
        setResultMessage(data.message);
      } else if (data.review_required) {
        setPhase("review");
        setResultMessage(data.message);
        setAttemptCount(data.total_fails);
      } else {
        setPhase("failed");
        setResultMessage(data.message);
        setAttemptCount(data.total_fails);
      }

      stopCamera();
    } catch (err) {
      setPhase("failed");
      setResultMessage(err.message || "Verification failed");
    }
  };

  // Auto-capture when camera is ready and step changes
  useEffect(() => {
    if (phase !== "verifying" || !cameraReady || isCapturing) return;

    // Give user time to perform the action, then capture
    stepTimerRef.current = setTimeout(() => {
      verifyCurrentStep();
    }, 2500);

    return () => {
      if (stepTimerRef.current) clearTimeout(stepTimerRef.current);
    };
  }, [phase, cameraReady, currentStepIndex, isCapturing, verifyCurrentStep]);

  const handleRetry = () => {
    setPhase("intro");
    setVerificationId(null);
    setSteps([]);
    setCurrentStepIndex(0);
    setLivenessChecks({});
    setResultMessage("");
    stopCamera();
  };

  const handleContinue = () => {
    window.location.href = "/";
  };

  // ===== INTRO PHASE =====
  if (phase === "intro") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1A0B2E] to-[#2D1B4E] flex flex-col">
        <div className="px-4 pt-12 pb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center active:scale-95 transition"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="w-full max-w-sm">
            <div className="text-center mb-8">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-purple-500/30 blur-3xl rounded-full animate-pulse" />
                <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-2xl shadow-purple-500/40 mx-auto">
                  <ScanFace size={40} className="text-white" />
                </div>
              </div>

              <h1 className="text-2xl font-extrabold text-white mb-2">Face Verification</h1>
              <p className="text-sm text-white/60 max-w-xs mx-auto">
                Your account has been created successfully. To activate your ID and access all platform features, you must complete Face Verification.
              </p>
            </div>

            {/* Security features */}
            <div className="space-y-2.5 mb-8">
              {[
                { icon: ScanFace, label: "AI Face Detection", desc: "Advanced facial recognition" },
                { icon: Eye, label: "Liveness Detection", desc: "Blink & head movement verification" },
                { icon: Shield, label: "Anti-Spoof Protection", desc: "Fake photo & deepfake detection" },
                { icon: Lock, label: "Replay Attack Prevention", desc: "Screen injection & screenshot detection" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-9 h-9 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <item.icon size={18} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{item.label}</p>
                    <p className="text-[10px] text-white/40">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleStart}
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-[#6F35E0] to-[#C135E0] text-white font-bold text-sm shadow-lg shadow-purple-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              style={{ height: "52px" }}
            >
              {loading ? (
                "Starting..."
              ) : (
                <>Activate My ID <ScanFace size={16} /></>
              )}
            </button>

            <p className="text-center text-[10px] text-white/30 mt-4">
              Your face data is encrypted and used only for identity verification.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ===== VERIFYING PHASE =====
  if (phase === "verifying") {
    const currentStep = steps[currentStepIndex];

    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1A0B2E] to-[#2D1B4E] flex flex-col">
        <div className="px-4 pt-12 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ScanFace size={20} className="text-purple-400" />
              <span className="text-sm font-bold text-white">Face Verification</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/20 border border-purple-400/30">
              <Shield size={12} className="text-purple-300" />
              <span className="text-[10px] font-bold text-purple-300">AI Protected</span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col px-6 py-4">
          {/* Camera */}
          <CameraView
            cameraReady={cameraReady}
            error={cameraError}
            videoRef={videoRef}
            onStartCamera={startCamera}
            onSwitchCamera={switchCamera}
            facingMode={facingMode}
            isCapturing={isCapturing}
          />

          {/* Steps */}
          {cameraReady && steps.length > 0 && (
            <div className="mt-6">
              <VerificationSteps
                steps={steps}
                currentIndex={currentStepIndex}
                livenessChecks={livenessChecks}
              />

              {/* Current step detail */}
              {currentStep && (
                <div className="mt-4 flex items-center justify-center gap-2">
                  {React.createElement(STEP_ICONS[currentStep.key] || ScanFace, {
                    size: 16,
                    className: "text-purple-400"
                  })}
                  <span className="text-xs text-white/60">
                    {isCapturing ? "Analyzing..." : "Follow the instruction"}
                  </span>
                </div>
              )}

              {/* Manual capture button (fallback) */}
              {!isCapturing && (
                <button
                  onClick={verifyCurrentStep}
                  className="mt-4 w-full max-w-xs mx-auto rounded-xl bg-white/10 text-white text-sm font-semibold py-3 flex items-center justify-center gap-2 active:scale-[0.98] transition"
                >
                  <ScanFace size={14} /> Capture & Verify
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ===== RESULT PHASES =====
  if (phase === "success" || phase === "failed" || phase === "review") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1A0B2E] to-[#2D1B4E] flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center">
          <VerificationResult
            status={phase === "review" ? "review_required" : phase}
            message={resultMessage}
            attemptCount={attemptCount}
            onRetry={handleRetry}
            onContinue={handleContinue}
          />
        </div>
      </div>
    );
  }

  return null;
}