import useSidebar from "@/hooks/useSidebar";
import { Building2, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

export default function DropdownSwitch({ items }) {
  const [isActive, setIsActive] = useState(false);
  const [activeAplication, setActiveAplication] = useState({
    title: "Technik",
    description: "Corporation",
    icon: <Building2 className="size-6" />,
    link: "/",
  });

  const { isSidebarActivated, setIsSidebarActivated } = useSidebar();

  const toggleActive = () => setIsActive((prev) => !prev);

  const handleItemClick = (item) => {
    setActiveAplication(item);
    setIsActive(false);
  };

  const sidebarContent = isSidebarActivated ? (
    <div
      className="flex w-full items-center justify-between rounded bg-white hover:bg-gray-100 px-3 py-2 cursor-pointer text-slate-800"
      onClick={toggleActive}
    >
      <div className="flex items-center gap-3">
        <span className="text-white p-1 bg-black rounded">
          {activeAplication.icon}
        </span>
        <div>
          <h1 className="text-[16px] font-semibold text-gray-800">
            {activeAplication.title}
          </h1>
          <p className="text-[14px] text-gray-500">
            {activeAplication.description}
          </p>
        </div>
      </div>
      <ChevronsUpDown
        className={`size-5 text-gray-600 transition-transform ${
          isActive ? "rotate-180" : ""
        }`}
      />
    </div>
  ) : (
    <div className="flex items-center justify-center mt-3">
      <span
        className="bg-black hover:bg-gray-700 text-white p-3 rounded-md cursor-pointer transition-all duration-300"
        onClick={() => setIsSidebarActivated(true)}
      >
        {activeAplication.icon}
      </span>
    </div>
  );

  const dropdownContent = isSidebarActivated && (
    <div
      className={`w-full bg-white rounded mt-1 overflow-hidden transition-all origin-top text-slate-800 ease-in-out ${
        isActive
          ? "scale-y-100 opacity-100 max-h-[300px] overflow-y-auto"
          : "scale-y-0 opacity-0 max-h-0"
      }`}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-3 px-3 py-2 border-b last:border-none hover:bg-gray-100 transition-colors cursor-pointer"
          onClick={() => handleItemClick(item)}
        >
          {item.icon}
          <div>
            <h1 className="text-[14px] font-semibold">{item.title}</h1>
            <p className="text-[12px] text-gray-500">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col p-2">
      {sidebarContent}
      {dropdownContent}
    </div>
  );
}
