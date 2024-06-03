import { MultiStepFormContext } from "@/context/multistep-form-context";
import { useContext } from "react";

export default function useMultiStepFormContext() {
    const context = useContext(MultiStepFormContext);
    if (!context) {
      throw new Error(
        "useMultiStepFormContext must be used within a MultiStepFormContextProvider",
      );
    }
  
    return context;
  }