import { useState } from "react";

import { useConfetti } from "./useConfetti";

import { RecognitionService } from "@/config/openapi_client";
import { useRecognitionForm } from "@/context/FormContext";
import { useUserContext } from "@/context/UserContext";

export const useSubmitRecognition = () => {
  const { fireConfetti } = useConfetti();
  const { values, resetForm } = useRecognitionForm();
  const { user } = useUserContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submit = async () => {
    if (!user?.id) {
      setError("You must be logged in to send a recognition.");

      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await RecognitionService.postRecognitionRecognitionPost({
        sender_id: user.id,
        recipient_id: values.recipient_id,
        category: values.category,
        message: values.message,
      });

      setSuccess(true);
      fireConfetti();
      resetForm();
    } catch (err: any) {
      console.error(err);
      setError("Something went wrong.");
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