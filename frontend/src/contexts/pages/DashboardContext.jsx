import { TableProvider } from "../components/TableContext";
import { NotificationProvider } from "../components/NotificationContext";

export function DashboardProvider({ children }) {
  return (
    <NotificationProvider>
      <TableProvider>{children}</TableProvider>
    </NotificationProvider>
  );
}
