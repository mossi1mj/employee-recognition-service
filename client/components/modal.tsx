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
import { ApplauseResponse } from "@/config/openapi_client";


interface ApplauseModalProps {
  isOpen: boolean;
  onClose: () => void;
  applauseData: ApplauseResponse[];
  isLoading: boolean;
  error: Error | null;
  type?: "given" | "received";
  memberEmail?: string | null;
  name?: string | null;
  page: boolean;
}
const ApplauseModal: React.FC<ApplauseModalProps> = ({
  isOpen,
  onClose,
  applauseData,
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
                    type === "given" ? "Applause Given" : "Applause Received"
                  } by
      ${name}`}
            </ModalHeader>
            <ModalBody>
              <div className="w-full flex justify-center">
                <div className="w-[90%]">
                  {isLoading ? (
                    <Spinner label="Loading applause data..." />
                  ) : error ? (
                    <p>Error: {error.message}</p>
                  ) : (
                    applauseData.map((applause, index) => (
                      //   <ApplauseCard
                      //     key={index}
                      //     applause={applause}
                      //     message={page ? false : true}
                      //   />
                      <Card className="w-full mb-1" key={applause.id}>
                        <CardHeader className="flex justify-between items-center">
                          <div className="flex items-center gap-3 flex-grow">
                            <AvatarGroup
                              isBordered
                              size={`${applause.message ? "md" : "sm"}`}
                            >
                              <Avatar src={applause.sender.image || ""} />
                              <Avatar src={applause.recipient.image || ""} />
                            </AvatarGroup>
                            <div>
                              <p className={"text-body-md"}>{applause.headline}</p>
                              <p className="text-form-label text-gray-600">
                                {applause.created_at}
                              </p>
                            </div>
                          </div>
                          {/* {categoryInfo && (
                          <div className="flex-shrink-0 ml-2">
                            <Image
                              src={categoryInfo.icon}
                              alt={categoryInfo.displayName}
                              width={30}
                              height={30}
                            />
                          </div>
                        )} */}
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
export default ApplauseModal;
