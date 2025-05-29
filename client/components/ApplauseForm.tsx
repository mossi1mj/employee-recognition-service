"use client";

import React from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
} from "@heroui/react";
import { UserRoundSearch } from "lucide-react";

const ApplauseFormSkeleton: React.FC = () => (
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

export const ApplauseForm: React.FC = () => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-0 pt-4 px-4">
        <h2 className="text-2xl font-bold">Give Applause</h2>
      </CardHeader>
      <CardBody className="px-4">
        <Autocomplete
          isRequired
          label="Employee"
          labelPlacement="outside"
          placeholder="Who's your applause superstar?"
          startContent={<UserRoundSearch color="gray" />}
          variant="underlined"
        >
          {(item) => <AutocompleteItem>{item}</AutocompleteItem>}
        </Autocomplete>
      </CardBody>
    </Card>
  );
};
