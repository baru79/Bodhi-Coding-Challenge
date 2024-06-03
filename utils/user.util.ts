import { User } from "@/app/types";

export default function isUser(variable: any): variable is User {
  return (
    typeof variable === "object" &&
    variable !== null &&
    typeof variable.preferences === "object" &&
    variable.preferences !== null &&
    "firstName" in variable &&
    "lastName" in variable &&
    "email" in variable &&
    "email" in variable &&
    "password" in variable &&
    "phoneNumber" in variable &&
    "role" in variable &&
    "receiveEmails" in variable.preferences &&
    "receiveNotifications" in variable.preferences
  );
}
