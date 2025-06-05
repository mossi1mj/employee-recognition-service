"use client";

import React from "react";
import {
  addToast,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Spinner,
  Textarea,
} from "@heroui/react";
import { SendHorizonal } from "lucide-react";

import { Category } from "./category";
import Input from "./input";

import { useRecognitionForm } from "@/context/FormContext";
import { useSubmitRecognition } from "@/hooks/useSubmitRecognition";

export const Form: React.FC = () => {
  const { values, setMessage } = useRecognitionForm();
  const { submit, loading } = useSubmitRecognition();

  return (
    <Card className="mb-6">
      <CardHeader className="pb-0 pt-4 px-4">
        <h2 className="text-2xl font-bold">Give Recognition</h2>
      </CardHeader>
      <CardBody className="px-4">
        <Input />
        <Category />
        <Textarea
          className="hidden sm:block"
          label="Message"
          placeholder="Enter your recognition message..."
          value={values.message ?? ""}
          variant="underlined"
          onChange={(e) => setMessage(e.target.value)}
        />
      </CardBody>
      <CardFooter className="pt-2 pb-4 px-4 flex justify-center sm:justify-end">
        <Button
          color="primary"
          disabled={loading}
          endContent={
            loading ? (
              <Spinner color="white" size="sm" />
            ) : (
              <SendHorizonal size={18} />
            )
          }
          variant="solid"
          onPress={submit}
          className="w-full sm:w-auto"
        >
          Send Recognition
        </Button>
      </CardFooter>
    </Card>
  );
};
