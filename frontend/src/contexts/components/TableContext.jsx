import { createContext, useState } from "react";

export const TableContext = createContext();

export function TableProvider({ children }) {
  const [tableData, setTableData] = useState(null);

  return (
    <TableContext.Provider value={{ tableData, setTableData }}>
      {children}
    </TableContext.Provider>
  );
}
