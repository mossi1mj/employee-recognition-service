import useSWR from "swr";

import {
  RecognitionResponse,
  RecognitionService,
  RecognitionType,
} from "@/openapi";

const fetchUserRecognitions = async (
  userId: number,
  type: RecognitionType,
  limit?: number,
  skip?: number
): Promise<RecognitionResponse[]> => {
  return await RecognitionService.getUserRecognitionsRecognitionUserUserIdGet(
    userId,
    type,
    limit,
    skip
  );
};

export const useUserRecognitions = (
  userId: number | null,
  type: RecognitionType
) => {
  const shouldFetch = userId !== null;

  const { data, error, isLoading } = useSWR(
    shouldFetch ? ["user-recognitions", userId, type] : null,
    () => fetchUserRecognitions(userId!, type)
  );

  return { recognitions: data, error, isLoading };
};
