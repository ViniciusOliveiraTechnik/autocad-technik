import useSidebar from "@/hooks/useSidebar";
import { PanelRight } from "lucide-react";

export default function SidebarTrigger() {
  const {
    isSidebarActivated,
    setIsSidebarActivated,
    handleIsSidebarActivated,
  } = useSidebar();

  return (
    <div>
      <PanelRight
        className="bg-white p-1 size-8 rounded shadow cursor-pointer"
        onClick={handleIsSidebarActivated}
      />
    </div>
  );
}
