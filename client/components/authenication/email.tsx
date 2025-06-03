import { useEmailAuth } from "@/authentication/useEmailAuth";
import { useAuthContext } from "@/context/AuthContext";
import { Input } from "@heroui/input";
import { Mail } from "lucide-react";
import React from "react";

const EmailAuthentication: React.FC = () => {
  const { email, setEmail } = useAuthContext();

  return (
    <Input
      endContent={
        <Mail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
      }
      label="Email"
      placeholder="johndoe@email.com"
      value={email}
      variant="bordered"
      onChange={(e) => setEmail(e.target.value)}
    />
  );
};

export default EmailAuthentication;
