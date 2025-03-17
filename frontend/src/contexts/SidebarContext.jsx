import { createContext, useState } from "react";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [isSidebarActivated, setIsSidebarActivated] = useState(false);

  const handleIsSidebarActivated = () => {
    setIsSidebarActivated(!isSidebarActivated);
  };
  return (
    <SidebarContext.Provider
      value={{
        isSidebarActivated,
        setIsSidebarActivated,
        handleIsSidebarActivated,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export default SidebarContext;
