import { NotificationProvider } from "../contexts/NotificationContext";
import { TagProvider } from "../contexts/TagContext";

export default function AppProvider({ children }) {
  return (
    <NotificationProvider>
      <TagProvider>{children}</TagProvider>
    </NotificationProvider>
  );
}
