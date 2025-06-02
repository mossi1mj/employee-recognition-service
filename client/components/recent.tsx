"use client";

import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Tooltip,
  User,
  Button,
  Spinner,
} from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useUserContext } from "@/context/UserContext";
import { useUserRecognitions } from "@/hooks/useUserRecognitions";
import { recognitionCategoryMeta } from "@/config/category_selector";
import { RecognitionType } from "@/config/openapi_client";

export const Recent: React.FC = () => {
  const router = useRouter();
  const { user, recognitions } = useUserContext();
  const { isLoading } = useUserRecognitions(
    user?.id || null,
    RecognitionType.ALL,
  );

  return (
    <Card>
      <CardHeader className="pb-0 pt-4 px-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Recent Recognitions</h2>
        <Button
          color="primary"
          size="sm"
          variant="ghost"
          onPress={() => router.push("/recognitions")}
        >
          View All
        </Button>
      </CardHeader>
      <CardBody className="py-2 px-4">
        <Table>
          <TableHeader>
            <TableColumn className="text-xs hidden md:table-cell">
              Type
            </TableColumn>
            <TableColumn className="text-xs">Action</TableColumn>
            <TableColumn className="text-xs">Employee</TableColumn>
            <TableColumn className="text-xs hidden md:table-cell">
              Date
            </TableColumn>
          </TableHeader>
          <TableBody
            isLoading={isLoading}
            loadingContent={<Spinner size="sm" />}
          >
            {(recognitions || []).map((recognition) => {
              const isGiven = recognition.sender.id === user?.id;
              const person = isGiven
                ? recognition.recipient
                : recognition.sender;
              const categoryMeta =
                recognitionCategoryMeta[recognition.category];

              return (
                <TableRow key={recognition.id}>
                  <TableCell className="hidden md:table-cell">
                    <Tooltip content={categoryMeta?.label}>
                      <Image
                        alt={categoryMeta?.label}
                        height={40}
                        src={categoryMeta?.icon}
                        width={40}
                      />
                    </Tooltip>
                  </TableCell>
                  <TableCell className="font-semibold">
                    {isGiven ? "Given" : "Received"}
                  </TableCell>
                  <TableCell className="py-1">
                    <User
                      avatarProps={{
                        src: person.image,
                        size: "md",
                      }}
                      description={person.company.title}
                      name={`${person.firstName} ${person.lastName}`}
                    />
                  </TableCell>
                  <TableCell className="py-1 hidden md:table-cell">
                    {new Date(recognition?.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
};
