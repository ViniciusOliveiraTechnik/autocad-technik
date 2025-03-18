import { useContext } from "react";
import SidebarContext from "../contexts/components/SidebarContext";

export default function useSidebar() {
  return useContext(SidebarContext);
}
