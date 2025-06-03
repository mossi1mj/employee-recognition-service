import {
  Avatar,
  Input,
  InputOtp,
  Select,
  SelectedItems,
  SelectItem,
} from "@heroui/react";
import React, { useEffect } from "react";
import { Smartphone } from "lucide-react";

import { usePhoneAuth } from "@/authentication/usePhoneAuth";
import { countries } from "@/config/county_codes";
import { useAuthContext } from "@/context/AuthContext";

const PhoneAuthentication: React.FC = () => {
  const {
    phoneNumber,
    setPhoneNumber,
    selectedCountry,
    setSelectedCountry,
    confirmationResult,
    otp,
    setOtp,
  } = useAuthContext();

  const { requestOtp, verifyOtp, selected } = usePhoneAuth();

  useEffect(() => {
    const completedOtp = otp.length === 6;

    if (completedOtp) {
      verifyOtp();
    }
  }, [otp]);

  return (
    <div>
      {!confirmationResult && (
        <form onSubmit={requestOtp}>
          <Select
            className="mb-4"
            items={countries}
            label="Country"
            renderValue={(items: SelectedItems<(typeof countries)[0]>) =>
              items.map((item) => <span key={item.key}>{item.data?.name}</span>)
            }
            selectedKeys={[selectedCountry]}
            startContent={
              <Avatar
                alt={selected?.name}
                className="w-5 h-4"
                src={`https://flagcdn.com/w40/${selected?.iso}.png`}
              />
            }
            variant="bordered"
            onSelectionChange={(keys) =>
              setSelectedCountry(Array.from(keys)[0] as string)
            }
          >
            {(country) => (
              <SelectItem key={country.iso} textValue={country.name}>
                {country.name}
              </SelectItem>
            )}
          </Select>
          <Input
            required
            endContent={
              <Smartphone className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            inputMode="tel"
            label="Phone"
            pattern="\+?[0-9\s\-]+"
            placeholder="e.g. 555 123 4567"
            value={phoneNumber}
            variant="bordered"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </form>
      )}
      {confirmationResult && (
        <div className="flex flex-col justify-center items-center">
          <InputOtp
            length={6}
            value={otp}
            variant="faded"
            onValueChange={setOtp}
          />
        </div>
      )}
    </div>
  );
};

export default PhoneAuthentication;
