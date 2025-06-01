"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

import { RecognitionCategory } from "@/config/openapi_client";
import { FormContextProps, FormValues } from "@/types";

// Default values
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

  const setRecipientId = (id: number) =>
    setValues((prev) => ({ ...prev, recipient_id: id }));

  const setCategory = (category: RecognitionCategory) =>
    setValues((prev) => ({ ...prev, category }));

  const setMessage = (message: string) =>
    setValues((prev) => ({ ...prev, message }));

  const resetForm = () => setValues(defaultValues);

  return (
    <RecognitionFormContext.Provider
      value={{
        values,
        setRecipientId,
        setCategory,
        setMessage,
        resetForm,
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
