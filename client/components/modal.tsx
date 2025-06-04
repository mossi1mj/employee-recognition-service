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
} from "@heroui/react";
import { RecognitionResponse, RecognitionType } from "@/openapi";
import { formatter } from "@/config/date";

interface RecognitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: RecognitionResponse[];
  isLoading: boolean;
  error: Error | null;
  type?: RecognitionType;
  homePage: boolean;
}
const RecognitionModal: React.FC<RecognitionModalProps> = ({
  isOpen,
  onClose,
  data,
  isLoading,
  error,
  type,
  homePage,
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
                  } by
      ${name}`}
            </ModalHeader>
            <ModalBody>
              <div className="w-full flex justify-center">
                <div className="w-[90%]">
                  {isLoading ? (
                    <Spinner label="Loading recognition data..." />
                  ) : error ? (
                    <p>Error: {error.message}</p>
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
                                  new Date(recognition?.created_at),
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
