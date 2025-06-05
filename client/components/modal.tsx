import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
  useDisclosure,
  Card,
  CardHeader,
  AvatarGroup,
  Avatar,
  Alert,
} from "@heroui/react";
import { RecognitionResponse, RecognitionType } from "@/openapi";
import { formatter } from "@/config/date";
import { ThumbsUp, Send } from "lucide-react";

interface RecognitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: RecognitionResponse[];
  isLoading: boolean;
  error: Error | null;
  type?: RecognitionType;
  homePage: boolean;
  name?: string;
}

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
        : "No recognition sent yet"}
    </h3>
    <p className="text-gray-600 max-w-xs">
      {type === RecognitionType.RECEIVED
        ? "This person has not yet been recognized for their contributions."
        : "This person has not sent any recognition yet."}
    </p>
  </div>
);

const RecognitionModal: React.FC<RecognitionModalProps> = ({
  isOpen,
  onClose,
  data,
  isLoading,
  error,
  type,
  homePage,
  name,
}) => {
  const { onOpenChange } = useDisclosure({ isOpen, onClose });

  return (
    <Modal
      isOpen={isOpen}
      scrollBehavior="inside"
      size="5xl"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {homePage
                ? "Talk of the Town"
                : `${
                    type === RecognitionType.SENT
                      ? "Recognition Sent"
                      : "Recognition Received"
                  } by ${name}`}
            </ModalHeader>
            <ModalBody>
              <div className="w-full flex justify-center">
                <div className="w-[90%]">
                  {isLoading ? (
                    <Spinner label="Loading recognition data..." />
                  ) : error ? (
                    <Alert title={error.message} />
                  ) : data.length === 0 && type ? (
                    <EmptyState
                      type={
                        type as RecognitionType.SENT | RecognitionType.RECEIVED
                      }
                    />
                  ) : (
                    data.map((recognition) => (
                      <Card key={recognition.id} className="w-full mb-1">
                        <CardHeader className="flex justify-between items-center">
                          <div className="flex items-center gap-3 flex-grow">
                            <AvatarGroup
                              isBordered
                              size={`${recognition.message ? "md" : "sm"}`}
                            >
                              <Avatar src={recognition.sender.image || ""} />
                              <Avatar src={recognition.recipient.image || ""} />
                            </AvatarGroup>
                            <div>
                              <p className={"text-body-md"}>
                                {recognition.headline}
                              </p>
                              <p className="text-form-label text-gray-600">
                                {formatter.format(
                                  new Date(recognition?.created_at)
                                )}
                              </p>
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default RecognitionModal;
