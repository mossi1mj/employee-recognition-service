"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

import {
  RecognitionCategory,
  RecognitionCreate,
} from "@/config/openapi_client";

type FormValues = Omit<RecognitionCreate, "sender_id">;

interface FormContextProps {
  values: FormValues;
  input: string;
  setInput: (input: string) => void;
  setRecipientId: (id: number) => void;
  setCategory: (category: RecognitionCategory) => void;
  setMessage: (message: string) => void;
  resetForm: () => void;
  resetInput: () => void;
}

const defaultValues: FormValues = {
  recipient_id: 0,
  category: RecognitionCategory.TEAMWORK,
  message: "",
};

const RecognitionFormContext = createContext<FormContextProps | undefined>(
  undefined
);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [values, setValues] = useState<FormValues>(defaultValues);
  const [input, setInput] = useState<string>("");

  const setRecipientId = (id: number) =>
    setValues((prev) => ({ ...prev, recipient_id: id }));

  const setCategory = (category: RecognitionCategory) =>
    setValues((prev) => ({ ...prev, category }));

  const setMessage = (message: string) =>
    setValues((prev) => ({ ...prev, message }));

  const resetForm = () => setValues(defaultValues);
  const resetInput = () => setInput("");

  return (
    <RecognitionFormContext.Provider
      value={{
        values,
        input,
        setInput,
        setRecipientId,
        setCategory,
        setMessage,
        resetForm,
        resetInput,
      }}
    >
      {children}
    </RecognitionFormContext.Provider>
  );
};

export const useRecognitionForm = () => {
  const context = useContext(RecognitionFormContext);

  if (!context) {
    throw new Error(
      "useRecognitionForm must be used within a RecognitionFormProvider"
    );
  }

  return context;
};
