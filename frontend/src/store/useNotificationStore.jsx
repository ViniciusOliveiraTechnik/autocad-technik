import { create } from "zustand";

const useNotificationStore = create((set) => ({
  visible: false,
  TextContent: "",
  notificationType: "",

  showNotification: (textContent, notificationType, timeOut = 2500) => {
    set({
      visible: true,
      textContent: textContent,
      notificationType: notificationType,
    });

    setTimeout(() => {
      set({ visible: false });
    }, timeOut);
  },
}));

export default useNotificationStore;
