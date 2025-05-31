import { useState } from "react";

import {
  RecognitionCreate,
  RecognitionResponse,
  RecognitionService,
} from "@/config/openapi_client";


export function useCreateRecognition() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  async function createRecognition(
    payload: RecognitionCreate,
  ): Promise<RecognitionResponse | null> {
    setLoading(true);
    setError(null);

    try {
      const response =
        await RecognitionService.postRecognitionRecognitionPost(payload);

      return response;
    } catch (err) {
      setError(err as Error);

      return null;
    } finally {
      setLoading(false);
    }
  }

  return { createRecognition, loading, error };
}
