import { User } from "@/app/types";
import api from "./api.service";
import isUser from "@/utils/user.util";

export async function getAllUsers(): Promise<User[]> {
  try {
    const { data } = await api.get("/users");
    return data;
  } catch (error) {
    throw new Error("There was a problem with your request.");
  }
}

export async function getUserById(id: string): Promise<User> {
  try {    
    const { data } = await api.get(`/users/${id}`);
    return data;
  } catch (error) {
    throw new Error("There was a problem with your request.");
  }
}

export async function createUser(user: Partial<User>): Promise<User> {
  if (isUser(user)) {
    try {
      const { data } = await api.post("/users", user);
      return data;
    } catch (error) {
      throw new Error("There was a problem with your request.");
    }
  } else {
    throw new Error("User has not all fields completed!");
  }
}

export async function updateUser(
  id: string,
  user: Partial<User>,
): Promise<User> {
  const existUser = await getUserById(id);
  if (!existUser) {
    throw new Error("User not exist!");
  }
  if (isUser(user)) {
    try {
      const { data } = await api.patch(`/users/${id}`, user);
      return data;
    } catch (error) {
      throw new Error("There was a problem with your request.");
    }
  } else {
    throw new Error("User has not all fields completed!");
  }
}

export async function deleteUser(id: string) {
  const existUser = await getUserById(id);
  if (!existUser) {
    throw new Error("User not exist!");
  }
  try {
    return api.delete(`/users/${id}`);
  } catch (error) {
    throw new Error("There was a problem with your request.");
  }
}
