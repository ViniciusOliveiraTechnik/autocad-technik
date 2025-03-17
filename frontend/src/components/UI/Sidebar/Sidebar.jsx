import useSidebar from "@/hooks/useSidebar";

export default function Sidebar({ children }) {
  const { isSidebarActivated } = useSidebar();

  return (
    <div
      className={`h-screen transition-all duration-300 ease-in-out ${
        isSidebarActivated ? "w-[250px] opacity-100" : "w-[80px] opacity-100"
      }`}
    >
      {children}
    </div>
  );
}
