"use client";

import React from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
  Textarea,
} from "@heroui/react";
import { SendHorizonal, UserRoundSearch } from "lucide-react";
import { useTheme } from "next-themes";
import { StaticImageData } from "next/image";
import { Category } from "./category";



const FormSkeleton: React.FC = () => (
  <Card>
    <CardHeader>
      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg" />
      </Skeleton>
    </CardHeader>
    <CardBody>
      <Skeleton className="rounded-lg">
        <div className="h-72 rounded-lg" />
      </Skeleton>
    </CardBody>
    <CardFooter>
      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg" />
      </Skeleton>
    </CardFooter>
  </Card>
);

const animals = [
  {
    label: "Cat",
    key: "cat",
    description: "The second most popular pet in the world",
  },
  {
    label: "Dog",
    key: "dog",
    description: "The most popular pet in the world",
  },
  {
    label: "Elephant",
    key: "elephant",
    description: "The largest land animal",
  },
  { label: "Lion", key: "lion", description: "The king of the jungle" },
  { label: "Tiger", key: "tiger", description: "The largest cat species" },
  { label: "Giraffe", key: "giraffe", description: "The tallest land animal" },
];

export const Form: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Card className="mb-6">
      <CardHeader className="pb-0 pt-4 px-4">
        <h2 className="text-2xl font-bold">Give Recognition</h2>
      </CardHeader>
      <CardBody className="px-4">
        <Autocomplete
          isRequired
          defaultItems={animals}
          label="Employee"
          labelPlacement="outside"
          placeholder="Who's the employee superstar?"
          startContent={<UserRoundSearch color="gray" />}
          variant="underlined"
        >
          {(item) => (
            <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
          )}
        </Autocomplete>
        <Category
          isDark={theme === "dark"}
          onCategorySelect={(category: any) => {
            // Optional: handle the selection in the parent component if needed
            console.log("Selected category:", category);
          }}
        />
        <Textarea
          variant="underlined"
          placeholder="Enter your recognition message..."
          label="Message"
        />
      </CardBody>
      <CardFooter className="pt-0 pb-4 px-4 flex justify-end">
        <Button
          color="primary"
          variant="solid"
          endContent={<SendHorizonal size={18} />}
        >
          Send Applause
        </Button>
      </CardFooter>
    </Card>
  );
};