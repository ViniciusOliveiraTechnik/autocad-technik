import { FileProvider } from "../utils/FileContext";
import { TagProvider } from "../utils/TagContext";

import { TableProvider } from "../components/TableContext";
import { NotificationProvider } from "../components/NotificationContext";

export function DashboardProvider({ children }) {
  return (
    <NotificationProvider>
      <TableProvider>
        <TagProvider>
          <FileProvider>{children}</FileProvider>
        </TagProvider>
      </TableProvider>
    </NotificationProvider>
  );
}
