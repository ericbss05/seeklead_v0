"use client";

import { useRouter } from "next/navigation";

import ICPForm from "@/components/icp/form";

export default function OnboardingForm() {
  const router = useRouter();

  const handleSubmitSuccess = () => {
    router.push("/dashboard");
  };

  return (
    <ICPForm onSubmitSuccess={handleSubmitSuccess} />
  );
}