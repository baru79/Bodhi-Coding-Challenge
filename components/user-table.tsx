"use client";

import { User, UserPreferences } from "@/app/types";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import { DataTable } from "./ui/data-table";
import { Checkbox } from "./ui/checkbox";
import { format, parseISO } from "date-fns";
import { deleteUser } from "@/services/user.service";
import { useListenToSSEUpdates } from "@/hooks/useListenToSSEUpdates";
import { useToast } from "./ui/use-toast";
import { Input } from "./ui/input";
import { isAxiosError } from "axios";
import DataTableRowActions from "./data-table-row-actions";
import UserUpdateForm from "./user-update-form";

interface UsersColumnsProps {
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export const getUsersColumns = ({
  onEdit,
  onDelete,
}: UsersColumnsProps): ColumnDef<User>[] => [
  {
    accessorKey: "_id",
    header: () => <div className="text-xs text-center">Id</div>,
  },
  {
    accessorKey: "firstName",
    header: () => <div className="text-xs text-center">First Name</div>,
  },
  {
    accessorKey: "lastName",
    header: () => <div className="text-xs text-center">Last Name</div>,
  },
  {
    accessorKey: "email",
    header: () => <div className="text-xs text-center">Email</div>,
  },
  {
    accessorKey: "password",
    header: () => <div className="text-xs text-center">Password</div>,
    cell: () => (
      <Input
        className="border-0 bg-inherit !cursor-text"
        type={"password"}
        value={"0123456789"}
        disabled
      />
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: () => <div className="text-xs text-center">Phone</div>,
  },
  {
    accessorKey: "role",
    header: () => <div className="text-xs text-center">Role</div>,
    cell: ({ row }) => {
      const val =
        row.getValue("role") === "administrator"
          ? "admin"
          : (row.getValue("role") as string);
      return <div>{val}</div>;
    },
  },
  {
    accessorKey: "preferences",
    header: () => <div className="text-xs text-center">Preferences</div>,
  },
  {
    accessorKey: "receiveEmails",
    header: () => <div className="text-xs text-center">Receive Emails</div>,
    cell: ({ row }) => {
      const preferences = row.getValue("preferences") as UserPreferences;
      return <Checkbox checked={preferences?.receiveEmails} />;
    },
  },
  {
    accessorKey: "receiveNotifications",
    header: () => (
      <div className="text-xs text-center">Receive Notifications</div>
    ),
    cell: ({ row }) => {
      const preferences = row.getValue("preferences") as UserPreferences;
      return <Checkbox checked={preferences?.receiveNotifications} />;
    },
  },
  {
    accessorKey: "createdById",
    header: () => <div className="text-xs text-center">Created by</div>,
  },
  {
    accessorKey: "updatedAtDate",
    header: () => <div className="text-xs text-center">Last update</div>,
    cell: ({ row }) => {
      const val = parseISO(row.getValue("updatedAtDate"));
      return <div>{format(val, "LLLL d HH:mm:ss yyyy")}</div>;
    },
  },
  {
    id: "actions",
    header: () => <div className="text-xs text-center">Actions</div>,
    cell: ({ row }) => (
      <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />
    ),
  },
];

const UserTable = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { users, isLoading } = useListenToSSEUpdates();
  const { toast } = useToast();

  const onEdit = (user: User) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const onDelete = async (user: User) => {
    const title = "Delete action";
    try {
      await deleteUser(user._id);
      toast({
        variant: "default",
        title,
        description: "User was deleted successfully.",
      });
    } catch (error) {
      let description;
      if (error instanceof Error) {
        description = error.message;
      }
      if (isAxiosError(error)) {
        if (error.response?.data.message === "Forbidden") {
          description = "User Default is protected and can not be deleted.";
        }
      }
      toast({
        variant: "destructive",
        title,
        description,
      });
    }
  };

  const columns = getUsersColumns({ onEdit, onDelete });

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <>
      <div className="flex-nowrap">
        <UserUpdateForm
          isOpen={isDialogOpen}
          user={selectedUser}
          onOpenChange={(value: any) => {
            setIsDialogOpen(value);
            if (!value) {
              setSelectedUser(null);
            }
          }}
        />
      </div>
      <DataTable columns={columns} data={users} />
    </>
  );
};

export default UserTable;
