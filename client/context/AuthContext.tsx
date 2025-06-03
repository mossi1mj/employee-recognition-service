"use client";

import { ConfirmationResult } from "firebase/auth";
import React, { createContext, useState, useEffect } from "react";

interface AuthContextType {
  phoneNumber: string;
  setPhoneNumber: (val: string) => void;
  selectedCountry: string;
  setSelectedCountry: (val: string) => void;
  otp: string;
  setOtp: (val: string) => void;

  email: string;
  setEmail: (val: string) => void;
  confirmationResult: ConfirmationResult | null;
  setConfirmationResult: (val: ConfirmationResult | null) => void;

  error: string | null;
  setError: (val: string | null) => void;
  success: string | null;
  setSuccess: (val: string | null) => void;
  reset: number;
  setReset: (val: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("us");
  const [otp, setOtp] = useState("");

  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);

  const [email, setEmail] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [reset, setReset] = useState(0);

  // Countdown timer
  useEffect(() => {
    if (reset === 0) return;
    const timer = setTimeout(() => setReset((r) => r - 1), 1000);

    return () => clearTimeout(timer);
  }, [reset]);

  return (
    <AuthContext.Provider
      value={{
        phoneNumber,
        setPhoneNumber,
        selectedCountry,
        setSelectedCountry,
        otp,
        setOtp,
        email,
        setEmail,
        confirmationResult,
        setConfirmationResult,
        error,
        setError,
        success,
        setSuccess,
        reset,
        setReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }

  return context;
};
