import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import ProfileSetupShell from "@/components/profile-setup/ProfileSetupShell";
import UsernameStep from "@/components/profile-setup/UsernameStep";
import FullNameStep from "@/components/profile-setup/FullNameStep";
import DobStep from "@/components/profile-setup/DobStep";
import GenderStep from "@/components/profile-setup/GenderStep";
import PhotoStep from "@/components/profile-setup/PhotoStep";
import BioStep from "@/components/profile-setup/BioStep";
import InterestsStep from "@/components/profile-setup/InterestsStep";
import PermissionsStep from "@/components/profile-setup/PermissionsStep";
import TermsStep from "@/components/profile-setup/TermsStep";
import AccountCreationStep from "@/components/profile-setup/AccountCreationStep";

const STEPS = [
  { key: "username", title: "Username", subtitle: "Choose your unique identity on VYRO", component: UsernameStep },
  { key: "fullname", title: "Full Name", subtitle: "What should we call you?", component: FullNameStep },
  { key: "dob", title: "Date of Birth", subtitle: "You must be 18 or older to use VYRO", component: DobStep },
  { key: "gender", title: "Gender", subtitle: "This helps personalize your experience", component: GenderStep },
  { key: "photo", title: "Profile Photo", subtitle: "Add a photo to make your profile stand out", component: PhotoStep },
  { key: "bio", title: "Bio", subtitle: "Tell the community about yourself", component: BioStep },
  { key: "interests", title: "Interests", subtitle: "Select at least 3 to personalize your feed", component: InterestsStep },
  { key: "permissions", title: "App Permissions", subtitle: "Enable features for the best experience", component: PermissionsStep },
  { key: "terms", title: "Terms & Guidelines", subtitle: "Please review and agree to continue", component: TermsStep },
  { key: "create", title: "", subtitle: "", component: AccountCreationStep },
];

export default function ProfileSetup() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    username: "", full_name: "", birthday: "", gender: "",
    avatar_url: "", bio: "", interests: [],
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await base44.functions.invoke("userOnboarding", { action: "getProfile" });
        if (res.data?.profile) {
          const p = res.data.profile;
          setData((prev) => ({
            ...prev,
            username: p.username || "",
            full_name: p.full_name || p.title || "",
            bio: p.bio || "",
            birthday: p.birthday || "",
            gender: p.gender || "",
            avatar_url: p.avatar_url || "",
            interests: p.interests || [],
          }));
        }
      } catch {}
    };
    loadProfile();
  }, []);

  const updateData = (updates) => setData((prev) => ({ ...prev, ...updates }));
  const currentStep = STEPS[step];
  const CurrentComponent = currentStep.component;
  const isLastStep = step === STEPS.length - 1;

  return (
    <ProfileSetupShell
      step={step}
      totalSteps={STEPS.length}
      title={currentStep.title}
      subtitle={currentStep.subtitle}
      showBack={!isLastStep}
      onBack={step === 0 ? () => (window.location.href = "/welcome") : () => setStep(step - 1)}
    >
      <CurrentComponent
        data={data}
        updateData={updateData}
        onContinue={() => {
          if (isLastStep) {
            window.location.href = "/welcome-animation";
          } else {
            setStep(step + 1);
          }
        }}
      />
    </ProfileSetupShell>
  );
}