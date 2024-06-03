import { Button } from "@/components/ui/button";
import UserTable from "@/components/user-table";
import Link from "next/link";
import React from "react";

const UserManagement = async () => {
  return (
    <div className="container mx-auto">
      <div className="text-center text-lg mb-4">User Management</div>
      <UserTable />
      <Link href={"/"}>
        <Button className="mt-4 mx-auto flex">Go Home</Button>
      </Link>
    </div>
  );
};

export default UserManagement;
