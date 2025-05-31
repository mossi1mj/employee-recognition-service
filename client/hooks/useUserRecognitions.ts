import useSWR from "swr";

import {
  RecognitionResponse,
  RecognitionService,
} from "@/config/openapi_client";

const fetchUserRecognitions = async (
  userId: number,
  limit: number,
): Promise<RecognitionResponse[]> => {
  return await RecognitionService.getUserRecognitionsRecognitionUserUserIdGet(
    userId,
    limit,
  );
};

export const useUserRecognitions = (userId: number | null, limit = 5) => {
  const shouldFetch = userId !== null;

  const { data, error, isLoading } = useSWR(
    shouldFetch ? ["user-recognitions", userId, limit] : null,
    () => fetchUserRecognitions(userId!, limit),
  );

  return { recognitions: data, error, isLoading };
};
