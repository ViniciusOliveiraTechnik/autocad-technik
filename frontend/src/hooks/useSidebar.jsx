import { useContext } from "react";
import SidebarContext from "../contexts/SidebarContext";

export default function useSidebar() {
  return useContext(SidebarContext);
}
