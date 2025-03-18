import { useDropdown } from "@/hooks/useDropdown";
import useSidebar from "@/hooks/useSidebar";
import { ChevronsUpDown } from "lucide-react";

export default function DropdownToggle() {
  const { isActive, setIsActive, ActiveItem, setActiveItem } = useDropdown();
  const {
    isSidebarActivated,
    setIsSidebarActivated,
    handleIsSidebarActivated,
  } = useSidebar();

  return (
    <div
      className="flex w-full items-center justify-between rounded bg-white hover:bg-gray-100 px-3 py-2 cursor-pointer text-slate-800"
      onClick={() => setIsActive((prev) => !prev)}
    >
      <div className="flex items-center gap-3">
        <span className="text-white p-1 bg-black rounded">
          {ActiveItem.icon}
        </span>
        <div>
          <h1 className="text-[16px] font-semibold text-gray-800">
            {ActiveItem.title}
          </h1>
          <p className="text-[14px] text-gray-500">{ActiveItem.description}</p>
        </div>
      </div>
      <ChevronsUpDown
        className={`size-5 text-gray-600 transition-transform ${
          isActive ? "rotate-180" : ""
        }`}
      />
    </div>
  );
}
