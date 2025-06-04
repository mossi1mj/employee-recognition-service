import { useState } from "react";

import { useConfetti } from "./useConfetti";

import { RecognitionService } from "@/config/openapi_client";
import { useRecognitionForm } from "@/context/FormContext";
import { useUserContext } from "@/context/UserContext";
import { recognitionSchema } from "@/config/zod";
import { addToast } from "@heroui/react";

export const useSubmitRecognition = () => {
  const { fireConfetti } = useConfetti();
  const { values, resetInput, resetForm } = useRecognitionForm();
  const { user } = useUserContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submit = async () => {
    if (!user?.id) {
      setError("You must be logged in to send a recognition.");

      return;
    }

    const payload = {
      sender_id: user.id,
      ...values,
    };

    const result = recognitionSchema.safeParse(payload);

    if (!result.success) {
      const issues = result.error.issues;

      issues.forEach((issue) => {
        addToast({
          title: "Error",
          description: issue.message,
          color: "danger",
        });

        return;
      });

      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await RecognitionService.postRecognitionRecognitionPost(result.data);

      setSuccess(true);
      fireConfetti();
      resetInput();
      resetForm();

      addToast({
        title: "Success",
        description: "Recognition sent successfully!",
        color: "success",
      });
    } catch (err: any) {
      let message = "Something went wrong.";
      let title = "Policy Violation Detected";

      if (err?.body?.detail && err?.status === 400) {
        title = `Policy Violation`;
        message = `${err.body.detail}`;
      } else if (err?.message) {
        message = err.message;
      }

      setError(message);
      addToast({
        title,
        description: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    submit,
    loading,
    error,
    success,
  };
};
