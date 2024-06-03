export enum Roles {
  user = "user",
  administrator = "administrator",
}
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: Roles;
  preferences: UserPreferences;
  createdById: string;
  createdAtDate: Date;
  updatedById: string;
  updatedAtDate: Date;
}

export interface UserPreferences {
  receiveEmails: boolean;
  receiveNotifications?: boolean;
}
