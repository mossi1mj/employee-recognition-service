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
import { RecognitionResponse } from "@/config/openapi_client";

interface RecognitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  recognitionData: RecognitionResponse[];
  isLoading: boolean;
  error: Error | null;
  type?: "given" | "received";
  memberEmail?: string | null;
  name?: string | null;
  page: boolean;
}
const RecognitionModal: React.FC<RecognitionModalProps> = ({
  isOpen,
  onClose,
  recognitionData,
  isLoading,
  error,
  type,
  name,
  page,
}) => {
  const { onOpenChange } = useDisclosure({ isOpen, onClose });

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="5xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {page
                ? "Talk of the Town"
                : `${
                    type === "given" ? "Recognition Given" : "Recognition Received"
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
                    recognitionData.map((recognition, index) => (
                      <Card className="w-full mb-1" key={recognition.id}>
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
                                {recognition.created_at}
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
