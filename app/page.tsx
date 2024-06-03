import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="text-center">
      <div className="flex flex-col gap-2 m-auto">
        <Link href={"new-user/step-one"}>
          <Button className="bg-blue-500 w-48">Create new user</Button>
        </Link>
        <Link href={"user-management"}>
          <Button className="bg-green-500 w-48">User Management</Button>
        </Link>
      </div>
    </main>
  );
}
