import { useState } from "react";

export default function useNotification() {
  const [visible, setVisible] = useState(false);
  const [textContent, setTextContent] = useState("");

  const showNotification = (message, timeOut = 3000) => {
    setTextContent(message);
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
    }, timeOut);
  };

  return { visible, textContent, showNotification };
}
