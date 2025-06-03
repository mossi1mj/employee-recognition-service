"use client";

import {
  addToast,
  Alert,
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Tab,
  Tabs,
} from "@heroui/react";
import { Mail } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";

import { AppleIcon, FacebookIcon, GithubIcon, GoogleIcon } from "../icons";

import PhoneAuthentication from "./phone";

import { usePhoneAuth } from "@/authentication/usePhoneAuth";
import { useUserContext } from "@/context/UserContext";
import { useAuthContext } from "@/context/AuthContext";
import EmailAuthentication from "./email";
import { useEmailAuth } from "@/authentication/useEmailAuth";

declare global {
  interface Window {
    __otpForm?: HTMLFormElement;
  }
}

const Authenticate: React.FC = () => {
  const { theme } = useTheme();
  const { isAuthenticated } = useUserContext();
  const { success, error, reset, phoneNumber, email } = useAuthContext();
  const { requestOtp, isPending } = usePhoneAuth();
  const { isPending: isLoading, handleSendLink } = useEmailAuth();
  const [selectedTab, setSelectedTab] = useState("phone");

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
                startContent={<GoogleIcon />}
                variant="bordered"
              />

              <Button
                isIconOnly
                startContent={<FacebookIcon />}
                variant="bordered"
                disabled={reset > 0}
              />

              <Button
                isIconOnly
                startContent={
                  <AppleIcon
                    className={`${theme === "dark" ? "text-white" : "text-black"}`}
                  />
                }
                variant="bordered"
                disabled={reset > 0}
              />

              <Button
                isIconOnly
                startContent={<GithubIcon />}
                variant="bordered"
                disabled={reset > 0}
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
