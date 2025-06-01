import { useCallback, useState } from "react";

import { UsersService, User } from "@/config/openapi_client";

export const useUserSearch = () => {
  const [results, setResults] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const search = useCallback(async (query: string) => {
    setIsLoading(true);
    try {
      const users = await UsersService.searchUsersUsersSearchGet(query);

      setResults(users);
    } catch (err) {
      console.error("Failed to search users:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { results, isLoading, search };
};
