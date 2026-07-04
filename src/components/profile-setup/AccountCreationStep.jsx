import React, { useState, useEffect } from "react";
import { Loader2, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function AccountCreationStep({ data, onContinue }) {
  const [status, setStatus] = useState("creating");
  const [error, setError] = useState("");

  useEffect(() => {
    const createAccount = async () => {
      try {
        await base44.functions.invoke("userOnboarding", {
          action: "updateProfile",
          username: data.username,
          full_name: data.full_name,
          bio: data.bio,
          birthday: data.birthday,
          gender: data.gender,
          avatar_url: data.avatar_url,
          interests: data.interests,
        });
        setStatus("success");
      } catch (e) {
        setError(e.message || "Account creation failed");
        setStatus("error");
      }
    };
    createAccount();
  }, []);

  if (status === "creating") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Loader2 size={48} className="text-purple-500 animate-spin mb-6" />
        <h3 className="text-lg font-bold text-[#2D1B4E] mb-2">Creating your account...</h3>
        <p className="text-sm text-gray-400">Setting up your profile and verifying your information</p>

        <div className="mt-8 space-y-2 w-full max-w-xs">
          {[
            { label: "Username", done: true },
            { label: "Age Verification", done: true },
            { label: "Profile Information", done: true },
            { label: "Policy Compliance", done: true },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-500" />
              <span className="text-xs text-gray-500">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
          <AlertCircle size={36} className="text-red-500" />
        </div>
        <h3 className="text-lg font-bold text-[#2D1B4E] mb-2">Something went wrong</h3>
        <p className="text-sm text-gray-400 mb-8">{error}</p>
        <button
          onClick={() => { setStatus("creating"); setError(""); }}
          className="px-8 py-3 rounded-2xl bg-gradient-to-r from-[#6F35E0] to-[#C135E0] text-white font-bold text-sm shadow-lg shadow-purple-200"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-green-300/40 blur-3xl rounded-full animate-pulse" />
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-200">
          <CheckCircle2 size={40} className="text-white" />
        </div>
      </div>
      <h3 className="text-xl font-bold text-[#2D1B4E] mb-2">Your account has been created successfully!</h3>
      <p className="text-sm text-gray-500 mb-2">Welcome to VYRO, {data.full_name || data.username}!</p>
      <p className="text-sm text-gray-400 mb-8 max-w-xs">
        To activate your ID and access all platform features, you must complete Face Verification.
      </p>

      <button
        onClick={() => { window.location.href = "/face-verification"; }}
        className="w-full max-w-xs rounded-2xl bg-gradient-to-r from-[#6F35E0] to-[#C135E0] text-white font-bold text-sm shadow-lg shadow-purple-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        style={{ height: "52px" }}
      >
        Activate My ID <ArrowRight size={16} />
      </button>
    </div>
  );
}