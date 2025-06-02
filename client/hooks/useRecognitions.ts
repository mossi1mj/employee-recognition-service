import useSWR from "swr";

import {
  RecognitionResponse,
  RecognitionService,
} from "@/config/openapi_client";
import { UseRecognitionsOptions } from "@/types";

const fetchRecognitions = async ({
  senderId,
  recipientId,
  limit,
  skip,
}: UseRecognitionsOptions): Promise<RecognitionResponse[]> => {
  return RecognitionService.getRecognitionsRecognitionGet(
    senderId,
    recipientId,
    limit,
    skip
  );
};

export const useRecognitions = ({
  senderId = null,
  recipientId = null,
  limit = 100,
  skip = 0,
}: UseRecognitionsOptions = {}) => {
  const key = ["recognitions-feed", senderId, recipientId, limit, skip];

  const { data, error, isLoading } = useSWR(key, () =>
    fetchRecognitions({ senderId, recipientId, limit, skip })
  );

  return {
    recognitions: data,
    error,
    isLoading,
  };
};
