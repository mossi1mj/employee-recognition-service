"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  addToast,
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
} from "@heroui/react";

import RecognitionModal from "./modal";

import { useRecognitions } from "@/hooks/useRecognitions";
import { formatter } from "@/config/date";
import { useLiveRecognitions } from "@/hooks/useLiveRecognitions";
import { useWebSocket } from "@/hooks/useWebSocket";
import { url } from "@/config/site";

const FeedSkeleton: React.FC = () => (
  <Card className="mb-2">
    <CardBody className="py-2 px-4">
      <div className="flex items-center gap-3">
        <Skeleton className="rounded-full w-8 h-8" />
        <div className="flex-1">
          <Skeleton className="w-4/5 h-4 mb-1 rounded-md" />
          <Skeleton className="w-2/5 h-3 rounded-md" />
        </div>
      </div>
    </CardBody>
  </Card>
);

export const Feed: React.FC = () => {
  const {
    recognitions: liveRecognitions,
    loading,
    error,
  } = useLiveRecognitions();
  const { recognitions, isLoading, error: failed } = useRecognitions();
  const { isConnected } = useWebSocket(url);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader
          className="pb-0 pt-4 px-4 flex justify-between items-center"
          id="talk-of-town-feed"
        >
          <h2 className="text-2xl font-bold">Talk of the Town</h2>
          <div className="flex gap-2">
            {isConnected && (
              <div className="flex items-center">
                <motion.div
                  className="w-2 h-2 bg-green-500 rounded-full mr-2"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span className="text-sm font-semibold text-green-500">
                  LIVE
                </span>
              </div>
            )}
            <Button
              color="primary"
              size="sm"
              variant="ghost"
              onPress={openModal}
            >
              View All
            </Button>
          </div>
        </CardHeader>
        <CardBody className="py-2 px-4">
          {error ? (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-default-100 text-500">
                <CardBody>
                  <p>{error || "Unexpected Error Occured."}</p>
                </CardBody>
              </Card>
            </motion.div>
          ) : loading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, index) => (
                <FeedSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              <AnimatePresence initial={false}>
                {liveRecognitions?.slice(0, 5).map((item, _) => (
                  <motion.div
                    key={item.created_at}
                    initial={{ opacity: 0, y: -20, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      opacity: { duration: 0.2 },
                    }}
                  >
                    <Card className="w-full mb-1">
                      <CardHeader className="flex justify-between items-center">
                        <div className="flex items-center gap-3 flex-grow">
                          <AvatarGroup
                            isBordered
                            size={`${item.message ? "md" : "sm"}`}
                          >
                            <Avatar src={item.sender.image || ""} />
                            <Avatar src={item.recipient.image || ""} />
                          </AvatarGroup>
                          <div>
                            <p className={"text-body-md"}>{item.headline}</p>
                            <p className="text-form-label text-gray-600">
                              {formatter.format(new Date(item?.created_at))}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </CardBody>
      </Card>
      <RecognitionModal
        homePage
        data={recognitions || []}
        error={failed}
        isLoading={isLoading}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
