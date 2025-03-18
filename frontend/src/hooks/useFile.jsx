import { FileContext } from "@/contexts/utils/FileContext";
import { useContext } from "react";

export default function useFile() {
  return useContext(FileContext);
}
