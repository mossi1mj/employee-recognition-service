import useSWR from "swr";

import { User, UsersService } from "@/openapi";
import { UseFilteredUsersOptions } from "@/types";

const fetchFilteredUsers = async (userId: number): Promise<User[]> => {
  return UsersService.filterUsersUsersFilterGet(userId);
};

export const useFilteredUsers = ({ userId }: UseFilteredUsersOptions) => {
  const key = userId ? ["filtered-users", userId] : null;

  const { data, error, isLoading } = useSWR(key, () =>
    fetchFilteredUsers(userId!),
  );

  return {
    users: data,
    error,
    isLoading,
  };
};
