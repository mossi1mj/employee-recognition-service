import { useState, useEffect } from "react";
import { addToast } from "@heroui/react";

import { RecognitionService, RecognitionResponse } from "@/openapi";
import { useWebSocket } from "@/hooks/useWebSocket";
import { url } from "@/config/site";
import { useUserContext } from "@/context/UserContext";

interface LiveRecognitions {
  recognitions: RecognitionResponse[] | null;
  loading: boolean;
  error: string | null;
}

export function useLiveRecognitions(): LiveRecognitions {
  const [recognitions, setRecognitions] = useState<
    RecognitionResponse[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useUserContext();
  const { lastRecognition, disconnect } = useWebSocket(url);

  useEffect(() => {
    const fetchRecognitions = async () => {
      setLoading(true);
      try {
        const response = await RecognitionService.getRecognitionsRecognitionGet(
          null,
          null,
          5
        );

        setRecognitions(response);
        setError(null);
      } catch (err: any) {
        setError("Failed to load recognitions.");
        addToast({
          title: "Failed to load live recognitions.",
          description: err.message,
        });
        disconnect();
        setRecognitions(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRecognitions();
  }, [disconnect]);

  useEffect(() => {
    if (lastRecognition) {
      setRecognitions((previous) => {
        if (previous?.some((r) => r.id === lastRecognition.id)) {
          return previous;
        }

        return [lastRecognition, ...(previous ?? []).slice(0, 5)];
      });
    }
  }, [lastRecognition, user]);

  return { recognitions, loading, error };
}
