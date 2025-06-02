"use client";

import { createContext, useContext, useState } from "react";

import { RecognitionResponse, User } from "@/config/openapi_client";

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  recognitions: RecognitionResponse[] | null;
  setRecognitions: (recognitions: RecognitionResponse[] | null) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [recognitions, setRecognitions] = useState<
    RecognitionResponse[] | null
  >(null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        recognitions,
        setRecognitions,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context)
    throw new Error("useUserContext must be used within UserProvider");

  return context;
};
