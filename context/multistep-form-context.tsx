import { User } from "@/app/types";
import { createUser } from "@/services/user.service";
import { createContext, useState } from "react";

export interface MultiStepFormContextProps {
  user: Partial<User> | null;
  updateUserData: (user: Partial<User>, isLastStep?: boolean) => void;
}

export const MultiStepFormContext =
  createContext<MultiStepFormContextProps | null>({
    user: null,
    updateUserData: () => null,
  });

export function MultiStepFormContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<Partial<User> | null>(null);

  const updateUserData = async (
    values: Partial<User>,
    isLastStep?: boolean
  ) => {
    const newUser = { ...user, ...values };
    setUser(newUser);
    if (isLastStep) {
      await createUser(newUser);
      setUser(null);
    }
  };

  return (
    <MultiStepFormContext.Provider value={{ user, updateUserData }}>
      {children}
    </MultiStepFormContext.Provider>
  );
}
