import { TableContext } from "@/contexts/components/TableContext";
import { useContext } from "react";

export default function useTable() {
  return useContext(TableContext);
}
