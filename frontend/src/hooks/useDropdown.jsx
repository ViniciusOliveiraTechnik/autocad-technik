import DropdownContent from "@/contexts/components/DropdownContext";
import { useContext } from "react";

export function useDropdown() {
  return useContext(DropdownContent);
}
