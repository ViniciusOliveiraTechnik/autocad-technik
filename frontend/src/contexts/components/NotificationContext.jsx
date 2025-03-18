import { createContext, useRef, useState } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [visible, setVisible] = useState(false);
  const [textContent, setTextContent] = useState("");
  const [notificationType, setNotificationType] = useState("normal");
  const timeOutRef = useRef(null);

  const showNotification = (textContent, notificationType, timeOut = 3000) => {
    setTextContent(textContent);
    setNotificationType(notificationType);
    setVisible(true);

    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }

    timeOutRef.current = setTimeout(() => {
      setVisible(false);
      timeOutRef.current = null;
    }, timeOut);
  };

  return (
    <NotificationContext.Provider
      value={{ visible, textContent, notificationType, showNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
