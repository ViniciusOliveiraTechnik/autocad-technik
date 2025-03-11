import { NotificationProvider } from "../contexts/NotificationContext";

export default function AppProvider({ children }) {
  return <NotificationProvider>{children}</NotificationProvider>;
}
