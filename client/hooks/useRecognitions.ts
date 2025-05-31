"use client";

import { useEffect, useState } from "react";

import {
  RecognitionResponse,
  RecognitionService,
} from "@/config/openapi_client";

type UseApplausesParams = {
  senderId?: number | null;
  recipientId?: number | null;
};

export function useRecognitions({ senderId, recipientId }: UseApplausesParams) {
  const [data, setData] = useState<RecognitionResponse[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    RecognitionService.getRecognitionsRecognitionGet(senderId, recipientId)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [senderId, recipientId]);

  return { data, loading, error };
}
