"use client";

import type { ApplauseResponse } from "@/config/openapi_client/models/ApplauseResponse";

import { useEffect, useState } from "react";

import { ApplauseService } from "@/config/openapi_client/services/ApplauseService";

type UseApplausesParams = {
  senderId?: number | null;
  recipientId?: number | null;
};

export function useApplauses({ senderId, recipientId }: UseApplausesParams) {
  const [data, setData] = useState<ApplauseResponse[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    ApplauseService.getApplausesApplauseGet(senderId, recipientId)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [senderId, recipientId]);

  return { data, loading, error };
}
