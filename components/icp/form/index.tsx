"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { saveICP } from "@/app/actions/icp/save";
import { updateICP } from "@/app/actions/icp/update";
import { useICPPreviewStore } from "@/lib/stores/target-preview";

import Step1 from "./step-1";
import Step2 from "./step-2";
import Step3 from "./step-3";
import Step4 from "./step-4";

import type { ICPFormData, ICPFormProps } from "./types";

const STEP_COUNT = 4;

const steps = [
  {
    title: "Donne un nom à ta cible",
    subtitle:
      "Choisis un nom pour retrouver facilement cette cible.",
  },
  {
    title: "Décris ta cible idéale",
    subtitle:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
  },
  {
    title: "Où se trouve ta cible ?",
    subtitle:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
  },
  {
    title: "Qui souhaites-tu exclure ?",
    subtitle:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
  },
];

function normalizeFormData(
  data?: Partial<ICPFormData>,
): ICPFormData {
  return {
    name: data?.name ?? "",
    jobTitles: data?.jobTitles ?? [],
    locations: data?.locations ?? [],
    industries: data?.industries ?? [],
    companyTypes: data?.companyTypes ?? [],
    companySizes: data?.companySizes ?? [],
    exclude: data?.exclude ?? [],
  };
}

export default function OnboardingForm({
  initialData,
  onSubmitSuccess,
  icpId,
}: ICPFormProps = {}) {
  const router = useRouter();

  const setPreviewData = useICPPreviewStore(
    (state) => state.setData,
  );

  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [data, setData] = useState<ICPFormData>(() =>
    normalizeFormData(initialData),
  );

  useEffect(() => {
    setPreviewData(data);
  }, [data, setPreviewData]);

  const updateData = (changes: Partial<ICPFormData>) => {
    setData((current) => ({
      ...current,
      ...changes,
    }));
  };

  const nextStep = () => {
    if (step === 0 && !data.name.trim()) {
      return;
    }

    setStep((current) =>
      Math.min(current + 1, STEP_COUNT - 1),
    );
  };

  const previousStep = () => {
    setStep((current) =>
      Math.max(current - 1, 0),
    );
  };

  const handleSubmit = async () => {
    if (!data.name.trim()) {
      setStep(0);
      return;
    }

    try {
      setIsSubmitting(true);

      if (icpId) {
        await updateICP(icpId, {
          ...data,
          name: data.name.trim(),
        });
      } else {
        await saveICP({
          ...data,
          name: data.name.trim(),
        });
      }

      if (onSubmitSuccess) {
        onSubmitSuccess();
      } else {
        router.push("/dashboard");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const current = steps[step];

  const isStep1Valid = data.name.trim().length > 0;

  return (
    <div className="w-full max-w-md">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
        {current.title}
      </h1>

      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        {current.subtitle}
      </p>

      <div className="mt-6 flex gap-2">
        {Array.from({ length: STEP_COUNT }).map((_, index) => (
          <div
            key={index}
            className={`h-0.5 w-12 rounded-full transition-colors ${
              index <= step
                ? "bg-gray-900 dark:bg-gray-100"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          />
        ))}
      </div>

      <div className="mt-8">
        {step === 0 && (
          <Step1
            data={data}
            onChange={updateData}
          />
        )}

        {step === 1 && (
          <Step2
            data={data}
            onChange={updateData}
          />
        )}

        {step === 2 && (
          <Step3
            data={data}
            onChange={updateData}
          />
        )}

        {step === 3 && (
          <Step4
            data={data}
            onChange={updateData}
          />
        )}
      </div>

      <div className="mt-10 flex items-center gap-3">
        {step > 0 && (
          <Button
            type="button"
            variant="outline"
            onClick={previousStep}
            disabled={isSubmitting}
          >
            Précédent
          </Button>
        )}

        {step < STEP_COUNT - 1 ? (
          <Button
            type="button"
            onClick={nextStep}
            disabled={isSubmitting || (step === 0 && !isStep1Valid)}
          >
            Suivant
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || !isStep1Valid}
          >
            {isSubmitting
              ? "Enregistrement..."
              : "Enregistrer ma cible"}
          </Button>
        )}
      </div>
    </div>
  );
}