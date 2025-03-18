import DropdownContent from "@/contexts/DropdownContext";
import { useContext } from "react";

export function useDropdown() {
  return useContext(DropdownContent);
}
