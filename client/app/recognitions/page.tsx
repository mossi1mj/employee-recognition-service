"use client";

import {
  Avatar,
  AvatarGroup,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Skeleton,
} from "@heroui/react";
import { ChevronUp, Send, ThumbsUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef } from "react";
import Link from "next/link";

import { useUserContext } from "@/context/UserContext";
import { useUserRecognitions } from "@/hooks/useUserRecognitions";
import { RecognitionResponse, RecognitionType } from "@/config/openapi_client";
import { formatter } from "@/config/date";


export const RecognitionCard = ({
  recognition,
}: {
  recognition: RecognitionResponse;
}) => (
  <Card className="w-full mb-1">
    <CardHeader className="flex justify-between items-center">
      <div className="flex items-center gap-3 flex-grow">
        <AvatarGroup isBordered size={recognition.message ? "md" : "sm"}>
          <Avatar src={recognition.sender.image || ""} />
          <Avatar src={recognition.recipient.image || ""} />
        </AvatarGroup>
        <div>
          <p className="text-body-md">{recognition.headline}</p>
          <p className="text-form-label text-gray-600">
            {formatter.format(new Date(recognition?.created_at))}
          </p>
        </div>
      </div>
    </CardHeader>
    <Divider />
    <CardBody>{recognition.message}</CardBody>
  </Card>
);

const EmptyState = ({
  type,
}: {
  type: RecognitionType.RECEIVED | RecognitionType.SENT;
}) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <div className="bg-gradient-to-br from-primary to-secondary rounded-full p-6 mb-4">
      {type === RecognitionType.RECEIVED ? (
        <ThumbsUp className="text-secondary" size={32} />
      ) : (
        <Send className="text-secondary" size={32} />
      )}
    </div>
    <h3 className="text-2xl font-semibold mb-2">
      {type === RecognitionType.RECEIVED
        ? "No recognition received yet"
        : "You haven't sent any recognition yet"}
    </h3>
    <p className="text-gray-600 max-w-xs">
      {type === RecognitionType.RECEIVED
        ? "Keep up the great work! Your contributions will be recognized soon."
        : "Recognize your colleagues for their great work and contributions."}
    </p>
    {type === "sent" && (
      <Link href="/">
        <Button className="mt-4" color="primary">
          Give Recognition
        </Button>
      </Link>
    )}
  </div>
);

export default function Recognition() {
  const [viewType, setViewType] = useState<RecognitionType>(
    RecognitionType.RECEIVED
  );
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { user } = useUserContext();

  const {
    recognitions: sent,
    isLoading: loadingSent,
    error: errorSent,
  } = useUserRecognitions(user?.id || 0, RecognitionType.SENT);

  const {
    recognitions: received,
    isLoading: loadingReceived,
    error: errorReceived,
  } = useUserRecognitions(user?.id || 0, RecognitionType.RECEIVED);

  const recognitions = viewType === RecognitionType.RECEIVED ? received : sent;
  const isLoading =
    viewType === RecognitionType.RECEIVED ? loadingReceived : loadingSent;
  const error =
    viewType === RecognitionType.RECEIVED ? errorReceived : errorSent;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setShowScrollTop(e.currentTarget.scrollTop > 200);
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        {user && (
          <div className="flex gap-2">
            <Avatar className="w-16 h-16" src={user.image} />
            <div>
              <h1 className="text-2xl font-semibold">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-sm text-gray-500">{user.company.title}</p>
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-4 md:mt-0">
          <Card className="border border-primary/20">
            <CardBody className="py-2 px-4">
              👏 {received?.length || 0} Received
            </CardBody>
          </Card>
          <Card className="border border-secondary/20">
            <CardBody className="py-2 px-4">
              🎉 {sent?.length || 0} Sent
            </CardBody>
          </Card>
        </div>
      </div>

      <div className="flex items-center mb-4">
        <ButtonGroup radius="lg">
          <Button
            onPress={() => setViewType(RecognitionType.RECEIVED)}
            color={
              viewType === RecognitionType.RECEIVED ? "primary" : "default"
            }
            variant={viewType === RecognitionType.RECEIVED ? "solid" : "flat"}
          >
            Received
          </Button>
          <Button
            onPress={() => setViewType(RecognitionType.SENT)}
            color={viewType === RecognitionType.SENT ? "primary" : "default"}
            variant={viewType === RecognitionType.SENT ? "solid" : "flat"}
          >
            Sent
          </Button>
        </ButtonGroup>
      </div>

      <Card>
        <CardBody className="p-0">
          <div
            ref={scrollRef}
            className="max-h-[70vh] overflow-y-auto"
            onScroll={handleScroll}
          >
            <div className="p-4">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full mb-2 rounded" />
                ))
              ) : error ? (
                "Error loading data"
              ) : recognitions?.length === 0 ? (
                <EmptyState
                  type={
                    viewType as RecognitionType.SENT | RecognitionType.RECEIVED
                  }
                />
              ) : (
                recognitions?.map((r) => (
                  <RecognitionCard key={r.id} recognition={r} />
                ))
              )}
            </div>
          </div>
        </CardBody>

        {(recognitions ?? []).length > 0 && (
          <CardFooter className="justify-center py-3 text-sm text-gray-600">
            Showing {(recognitions ?? []).length} recognitions
          </CardFooter>
        )}
      </Card>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            animate={{ opacity: 0.9, scale: 1 }}
            className="fixed bottom-6 right-6 bg-primary text-white p-3 rounded-full shadow-lg z-10"
            exit={{ opacity: 0, scale: 0.8 }}
            initial={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
