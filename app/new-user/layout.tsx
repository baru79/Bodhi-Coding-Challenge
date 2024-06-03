"use client";

import { MultiStepFormContextProvider } from "@/context/multistep-form-context";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="flex flex-col items-center">
      <MultiStepFormContextProvider>{children}</MultiStepFormContextProvider>
    </main>
  );
}
