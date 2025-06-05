import { useEffect, useTransition } from "react";
import {
  sendSignInLinkToEmail,
  signInWithEmailLink,
  isSignInWithEmailLink,
} from "firebase/auth";
import { addToast } from "@heroui/react";

import { actionCodeSettings, auth } from "./firebase";

import { useUserContext } from "@/context/UserContext";
import { useAuthContext } from "@/context/AuthContext";
import { userSignIn } from "./userSignIn";

export const useEmailAuth = () => {
  const { setIsAuthenticated, setUser, setRecognitions } = useUserContext();
  const { email, setEmail, setReset, setError, setSuccess } = useAuthContext();
  const [isPending, startTransition] = useTransition();

  const handleSendLink = async () => {
    startTransition(async () => {
      try {
        await sendSignInLinkToEmail(auth, email, actionCodeSettings);
        localStorage.setItem("emailForSignIn", email);
        addToast({
          title: "Email Sent",
          description: "Check your inbox and click the link to sign in.",
        });
        setSuccess("Email sent successfully!");
        setEmail(""); // optional: clear the input
        setReset(90);
      } catch (err: any) {
        addToast({
          title: "Send Failed",
          description: err.message,
        });
        setError(err.message);
        setReset(0);
      }
    });
  };

  useEffect(() => {
    const checkMagicLink = async () => {
      const storedEmail = localStorage.getItem("emailForSignIn");

      if (storedEmail && isSignInWithEmailLink(auth, window.location.href)) {
        try {
          await signInWithEmailLink(auth, storedEmail, window.location.href);
          localStorage.removeItem("emailForSignIn");

          await userSignIn({
            setUser,
            setIsAuthenticated,
            setRecognitions,
          });
        } catch (err: any) {
          addToast({
            title: "Verification Failed",
            description: err.message,
          });
        }
      }
    };

    checkMagicLink();
  }, [setIsAuthenticated, setUser]);

  return {
    isPending,
    handleSendLink,
  };
};
