"use client";

import { countries } from "@/config/county_codes";
import { useUserContext } from "@/context/UserContext";
import { auth } from "@/firebase";
import { useCountryCodes } from "@/hooks/useCountryCodes";
import { Country } from "@/types";
import {
  Alert,
  Avatar,
  Button,
  Input,
  InputOtp,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectedItems,
  SelectItem,
  Spinner,
} from "@heroui/react";
import { verify } from "crypto";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import React, { FormEvent, useEffect, useState, useTransition } from "react";

export const Otplogin: React.FC = () => {
  const { isAuthenticated, setIsAuthenticated } = useUserContext();
  const [otp, setOtp] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("us"); // Default to United States
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [reset, setReset] = useState(0);

  const [recaptchaVerifier, setRecaptchaVerifier] =
    useState<RecaptchaVerifier | null>(null);
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (reset > 0) {
      timer = setTimeout(() => {
        setReset(reset - 1);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [reset]);

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
        console.error("Recaptcha render error:", err);
      });
  }, [recaptchaVerifier]);

  useEffect(() => {
    const completedOtp = otp.length === 6;
    if (completedOtp) {
      verifyOtp();
    }
  }, [otp]);

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
        console.log("Error sending OTP:", err);
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
        setIsAuthenticated(true);
      } catch (err: any) {
        console.log("Error verifying OTP:", err);
        setError("Invalid OTP. Please try again.");
      }
    });
  };

  return (
    <div>
      <Modal
        hideCloseButton
        backdrop="blur"
        className="max-w-3xl"
        isOpen={!isAuthenticated}
      >
        <ModalContent>
          <ModalHeader>One-Time Passcode Required</ModalHeader>
          <ModalBody>
            {!confirmationResult && (
              <form className="flex gap-2" onSubmit={requestOtp}>
                <Select
                  className="w-1/4"
                  label="Country Code"
                  labelPlacement="outside"
                  items={countries}
                  renderValue={(items: SelectedItems<(typeof countries)[0]>) =>
                    items.map((item) => (
                      <span key={item.key}>{item.data?.code}</span>
                    ))
                  }
                  selectedKeys={[selectedCountry]}
                  startContent={
                    <Avatar
                      alt={selected?.name}
                      className="w-5 h-5"
                      src={`https://flagcdn.com/w40/${selected?.iso}.png`}
                    />
                  }
                  onSelectionChange={(keys) =>
                    setSelectedCountry(Array.from(keys)[0] as string)
                  }
                >
                  {(country) => (
                    <SelectItem
                      key={country.iso}
                      startContent={
                        <Avatar
                          alt={country.name}
                          className="w-5 h-5"
                          src={`https://flagcdn.com/w40/${country.iso}.png`}
                        />
                      }
                      textValue={country.name}
                    >
                      {country.name}
                    </SelectItem>
                  )}
                </Select>

                <Input
                  className="w-3/4"
                  inputMode="tel"
                  label="Phone Number"
                  labelPlacement="outside"
                  pattern="\+?[0-9\s\-]+"
                  placeholder="e.g. 555 123 4567"
                  required
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </form>
            )}

            {confirmationResult && (
              <div className="flex flex-col justify-center items-center">
                <InputOtp length={6} value={otp} onValueChange={setOtp} />
              </div>
            )}

            <Button
              className="mt-4 w-full"
              disabled={!phoneNumber || isPending || reset > 0}
              isLoading={isPending}
              spinner={<Spinner />}
              onPress={async () => requestOtp()}
            >
              {reset > 0
                ? `Resend OTP in ${reset}`
                : isPending
                  ? "Sending OTP..."
                  : "Send OTP"}
            </Button>

            {success && (
              <Alert color="success" title="" description={success} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
      <div id="recaptcha-container" />
    </div>
  );
};
