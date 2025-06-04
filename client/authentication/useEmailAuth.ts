import { useEffect, useTransition } from "react";
import {
  sendSignInLinkToEmail,
  signInWithEmailLink,
  isSignInWithEmailLink,
} from "firebase/auth";
import { addToast } from "@heroui/react";

import { actionCodeSettings, auth } from "./firebase";

import { useUserContext } from "@/context/UserContext";
import { RecognitionService, RecognitionType, UsersService } from "@/openapi";
import { useAuthContext } from "@/context/AuthContext";

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

          const userId = Math.floor(Math.random() * 10) + 1;
          const user = await UsersService.getUserByIdUsersUserIdGet(userId);

          setUser(user);
          setIsAuthenticated(true);

          const recognitions =
            await RecognitionService.getUserRecognitionsRecognitionUserUserIdGet(
              user.id,
              RecognitionType.ALL,
              5
            );

          setRecognitions(recognitions);

          addToast({ title: "Signed in successfully!" });
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
