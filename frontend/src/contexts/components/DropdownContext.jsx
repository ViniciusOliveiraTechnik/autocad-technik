import { createContext, useState } from "react";

const DropdownContent = createContext();

export function DropdownProvider({ children }) {
  const [isActive, setIsActive] = useState(false);
  const [ActiveItem, setActiveItem] = useState({});

  return (
    <DropdownContent.Provider
      value={{ isActive, setIsActive, ActiveItem, setActiveItem }}
    >
      {children}
    </DropdownContent.Provider>
  );
}

export default DropdownContent;
