import { useContext } from "react";
import NotificationContext from "../contexts/components/NotificationContext";

export default function useNotification() {
  return useContext(NotificationContext);
}
