import { SVGProps } from "react";
import {
  RecognitionCategory,
  RecognitionCreate,
} from "@/config/openapi_client";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Country = {
  name: string;
  code: string;
  iso: string;
};

export type UseRecognitionsOptions = {
  senderId?: number | null;
  recipientId?: number | null;
  limit?: number | null;
  skip?: number | null;
};

export type FormValues = Omit<RecognitionCreate, "sender_id">;

export type FormContextProps = {
  values: FormValues;
  setRecipientId: (id: number) => void;
  setCategory: (category: RecognitionCategory) => void;
  setMessage: (message: string) => void;
  resetForm: () => void;
};
