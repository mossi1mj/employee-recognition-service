import { useState, useEffect, useTransition, FormEvent } from "react";
import { addToast } from "@heroui/react";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import { auth } from "./firebase";
import { countries } from "@/config/county_codes";
import { useAuthContext } from "@/context/AuthContext";
import {
  RecognitionService,
  RecognitionType,
  UsersService,
} from "@/config/openapi_client";
import { useUserContext } from "@/context/UserContext";

export const usePhoneAuth = () => {
  const {
    phoneNumber,
    selectedCountry,
    otp,
    setReset,
    setSuccess,
    setError,
    confirmationResult,
    setConfirmationResult,
  } = useAuthContext();
  const { setIsAuthenticated, setUser, setRecognitions } = useUserContext();
  const [recaptchaVerifier, setRecaptchaVerifier] =
    useState<RecaptchaVerifier | null>(null);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (typeof window === "undefined" || recaptchaVerifier) return;

    const verifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
    });

    verifier
      .render()
      .then(() => {
        setRecaptchaVerifier(verifier);
      })
      .catch((err) => {
        addToast({
          title: "Failed to initialize recaptcha. Please try again.",
          description: err.message,
        });
      });
  }, [recaptchaVerifier]);

  const selected = countries.find((c) => c.iso === selectedCountry);
  const finalPhoneNumber = `${selected?.code}${phoneNumber.trim().replace(/\D/g, "")}`;

  const requestOtp = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setReset(60);
    startTransition(async () => {
      setError("");
      if (!recaptchaVerifier) {
        return setError(
          "Recaptcha is not initialized. Please try again later."
        );
      }
      try {
        const confirmationResult = await signInWithPhoneNumber(
          auth,
          finalPhoneNumber,
          recaptchaVerifier
        );

        setConfirmationResult(confirmationResult);
        setSuccess("OTP sent successfully!");
      } catch (err: any) {
        addToast({
          title: "Failed to send OTP",
          description: err.message,
        });
        setReset(0);

        if (err.code === "auth/invalid-phone-number") {
          setError("Invalid phone number format. Please check and try again.");
        } else if (err.code === "auth/quota-exceeded") {
          setError("Quota exceeded. Please try again later.");
        } else if (err.code === "auth/too-many-requests") {
          setError("Too many requests. Please wait before trying again.");
        } else {
          setError("Failed to send OTP. Please try again later.");
        }

        return;
      }
    });
  };

  const verifyOtp = async () => {
    if (!confirmationResult) {
      return setError("No OTP confirmation result available.");
    }

    startTransition(async () => {
      try {
        await confirmationResult?.confirm(otp);
        const randomUserId = Math.floor(Math.random() * 10) + 1;
        const user = await UsersService.getUserByIdUsersUserIdGet(randomUserId);

        setUser(user);
        setIsAuthenticated(true);

        const recognitions =
          await RecognitionService.getUserRecognitionsRecognitionUserUserIdGet(
            user.id,
            RecognitionType.ALL,
            5
          );

        setRecognitions(recognitions);
      } catch (err: any) {
        addToast({
          title: "OTP Verification Failed",
          description: err.message,
        });
        setError("Invalid OTP. Please try again.");
      }
    });
  };

  return {
    requestOtp,
    verifyOtp,
    selected,
    isPending,
  };
};
