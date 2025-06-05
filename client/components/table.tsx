import { capitalize, columns, status, statusColorMap } from "@/config/table";
import { useUserContext } from "@/context/UserContext";
import { useFilteredUsers } from "@/hooks/useFilteredUsers";
import { useUserRecognitions } from "@/hooks/useUserRecognitions";
import { RecognitionType, User } from "@/openapi";
import {
  Chip,
  Tooltip,
  User as HeroUser,
  Table as HeroTable,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@heroui/react";
import { Eye, Edit, Delete, Send, Inbox } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import RecognitionModal from "./modal";

// Inject random statuses to users
function useUsersWithRandomStatus(users?: User[]) {
  const getRandomStatus = () =>
    status[Math.floor(Math.random() * status.length)];

  return useMemo(() => {
    if (!users) return [];

    return users.map((user) => ({
      ...user,
      _status: getRandomStatus(),
    }));
  }, [users]);
}

export const Table = () => {
  const { user } = useUserContext();
  const { users, isLoading } = useFilteredUsers({ userId: user?.id });
  const usersWithStatus = useUsersWithRandomStatus(users);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [modalType, setModalType] = useState<RecognitionType | undefined>();
  const [modalUserName, setModalUserName] = useState<string | undefined>();

  const {
    recognitions,
    isLoading: modalLoading,
    error: modalError,
  } = useUserRecognitions(
    selectedUserId || 0,
    modalType ?? RecognitionType.RECEIVED,
  );

  const openModal = (
    user: (typeof usersWithStatus)[0],
    type: RecognitionType,
  ) => {
    setSelectedUserId(user.id);
    setModalType(type);
    setModalUserName(`${user.firstName} ${user.lastName}`);
    setModalOpen(true);
  };

  const renderCell = useCallback(
    (user: User & { _status: string }, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof User];

      switch (columnKey) {
        case "name":
          return (
            <HeroUser
              avatarProps={{ radius: "lg", src: user.image }}
              description={user.email}
              name={`${user.firstName} ${user.lastName}`}
            />
          );

        case "role":
          return (
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user.company.title}</span>
              <span className="text-sm text-default-400">
                {user.company.department}
              </span>
            </div>
          );

        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[user._status]}
              size="sm"
              variant="flat"
            >
              {user._status}
            </Chip>
          );

        case "actions":
          return (
            <div className="relative flex justify-center items-center gap-4">
              <Tooltip content="View Received Recognitions">
                <Button
                  isIconOnly
                  variant="light"
                  color="default"
                  size="sm"
                  className="text-default-400"
                  onPress={() => openModal(user, RecognitionType.RECEIVED)}
                >
                  <Inbox />
                </Button>
              </Tooltip>
              <Tooltip content="View Sent Recognitions">
                <Button
                  isIconOnly
                  variant="light"
                  color="default"
                  size="sm"
                  className="text-default-400"
                  onPress={() => openModal(user, RecognitionType.SENT)}
                >
                  <Send />
                </Button>
              </Tooltip>
            </div>
          );

        default:
          return typeof cellValue === "object"
            ? JSON.stringify(cellValue)
            : cellValue;
      }
    },
    []
  );

  return (
    <>
      <HeroTable aria-label="Users Table" isHeaderSticky>
        <TableHeader columns={columns}>
          {(column) => {
            const isHiddenOnMobile =
              column.uid === "role" || column.uid === "status";

            return (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                className={isHiddenOnMobile ? "hidden sm:table-cell" : ""}
              >
                {column.name}
              </TableColumn>
            );
          }}
        </TableHeader>
        <TableBody
          emptyContent="No users found."
          isLoading={isLoading}
          items={usersWithStatus}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => {
                const isHiddenOnMobile =
                  columnKey === "role" || columnKey === "status";

                return (
                  <TableCell
                    className={isHiddenOnMobile ? "hidden sm:table-cell" : ""}
                  >
                    {renderCell(item, columnKey)}
                  </TableCell>
                );
              }}
            </TableRow>
          )}
        </TableBody>
      </HeroTable>
      <RecognitionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        data={recognitions || []}
        isLoading={modalLoading}
        error={modalError}
        type={modalType}
        homePage={false}
        name={modalUserName}
      />
    </>
  );
};
