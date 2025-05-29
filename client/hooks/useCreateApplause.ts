import type { ApplauseCreate } from "@/config/openapi_client/models/ApplauseCreate";
import type { ApplauseResponse } from "@/config/openapi_client/models/ApplauseResponse";

import { useState } from "react";

import { ApplauseService } from "@/config/openapi_client/services/ApplauseService";

export function useCreateApplause() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  async function createApplause(
    payload: ApplauseCreate
  ): Promise<ApplauseResponse | null> {
    setLoading(true);
    setError(null);

    try {
      const response = await ApplauseService.postApplauseApplausePost(payload);

      return response;
    } catch (err) {
      setError(err as Error);

      return null;
    } finally {
      setLoading(false);
    }
  }

  return { createApplause, loading, error };
}
