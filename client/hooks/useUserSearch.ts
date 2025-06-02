import { useCallback, useState } from "react";

import { UsersService, User } from "@/config/openapi_client";
import { addToast } from "@heroui/react";

export const useUserSearch = () => {
  const [results, setResults] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const search = useCallback(async (query: string) => {
    setIsLoading(true);
    try {
      const users = await UsersService.searchUsersUsersSearchGet(query);

      setResults(users);
    } catch (err) {
      addToast({
        title: "Failed to search for users. Please try again.",
        description: err instanceof Error ? err.message : "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { results, isLoading, search };
};
