"use client";

import {
  addToast,
  Alert,
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Tab,
  Tabs,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { onAuthStateChanged } from "firebase/auth";

import { AppleIcon, FacebookIcon, GithubIcon, GoogleIcon } from "../icons";

import PhoneAuthentication from "./phone";
import EmailAuthentication from "./email";

import { usePhoneAuth } from "@/authentication/usePhoneAuth";
import { useUserContext } from "@/context/UserContext";
import { useAuthContext } from "@/context/AuthContext";
import { useEmailAuth } from "@/authentication/useEmailAuth";
import {
  AuthProviderName,
  signInWithProvider,
} from "@/authentication/useSocialAuth";
import { auth } from "@/authentication/firebase";
import {
  RecognitionService,
  RecognitionType,
  UsersService,
} from "@/config/openapi_client";

declare global {
  interface Window {
    __otpForm?: HTMLFormElement;
  }
}

const Authenticate: React.FC = () => {
  const { theme } = useTheme();
  const { isAuthenticated, setIsAuthenticated, setUser, setRecognitions } =
    useUserContext();
  const { success, error, reset, phoneNumber, email } = useAuthContext();
  const { requestOtp, isPending } = usePhoneAuth();
  const { isPending: isLoading, handleSendLink } = useEmailAuth();
  const [selectedTab, setSelectedTab] = useState("phone");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
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
        } catch (err) {
          addToast({
            title: "Sign In Failed",
            description: (err as Error).message,
          });
          console.error("Failed to initialize user after sign-in", err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Modal
        hideCloseButton
        backdrop="blur"
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={!isAuthenticated}
        placement="auto"
      >
        <ModalContent>
          <ModalHeader>Authentication Required</ModalHeader>
          <ModalBody>
            <Tabs
              className="w-full flex flex-col px-1"
              isDisabled={reset > 0}
              selectedKey={selectedTab}
              size="md"
              variant="bordered"
              onSelectionChange={(key) => setSelectedTab(String(key))}
            >
              <Tab key="phone" title="Phone">
                <PhoneAuthentication />
              </Tab>
              <Tab key="email" title="Email">
                <EmailAuthentication />
              </Tab>
            </Tabs>
            {error && <Alert color="danger" description={error} />}
            {success && <Alert color="success" description={success} />}
          </ModalBody>
          <ModalFooter className="flex flex-col gap-4 px-6">
            <Button
              color="primary"
              disabled={
                selectedTab === "phone" ? !phoneNumber || reset > 0 : !email
              }
              isLoading={selectedTab === "phone" ? isPending : isLoading}
              spinner={<Spinner />}
              variant={`${(selectedTab === "phone" && !phoneNumber) || reset > 0 || (selectedTab === "email" && !email) || reset > 0 ? "flat" : "solid"}`}
              onPress={
                selectedTab === "phone"
                  ? () => requestOtp()
                  : () => handleSendLink()
              }
            >
              {selectedTab === "phone"
                ? reset > 0
                  ? `Resend Passcode in ${reset}`
                  : "Send Passcode"
                : isPending || reset > 0
                  ? `Resend email in ${reset}`
                  : "Send Email Link"}
            </Button>
          </ModalFooter>

          <ModalBody>
            <div className="flex items-center gap-4 my-4 px-6">
              <Divider className="flex-1" />
              <span className="text-sm text-default-500 whitespace-nowrap">
                or sign in with
              </span>
              <Divider className="flex-1" />
            </div>

            <div className="flex justify-center items-center gap-10 mb-4">
              <Button
                isIconOnly
                disabled={reset > 0}
                startContent={<GoogleIcon />}
                variant="bordered"
                onPress={() => signInWithProvider(AuthProviderName.GOOGLE)}
              />

              <Button
                isIconOnly
                disabled={reset > 0}
                startContent={<FacebookIcon />}
                variant="bordered"
                onPress={() => signInWithProvider(AuthProviderName.FACEBOOK)}
              />

              <Button
                isIconOnly
                disabled={reset > 0}
                startContent={
                  <AppleIcon
                    className={`${theme === "dark" ? "text-white" : "text-black"}`}
                  />
                }
                variant="bordered"
                onPress={() => signInWithProvider(AuthProviderName.APPLE)}
              />

              <Button
                isIconOnly
                disabled={reset > 0}
                startContent={<GithubIcon />}
                variant="bordered"
                onPress={() => signInWithProvider(AuthProviderName.GITHUB)}
              />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      <div id="recaptcha-container" />
    </div>
  );
};

export default Authenticate;
