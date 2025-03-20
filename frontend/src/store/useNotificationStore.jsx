import { create } from "zustand";

const useNotificationStore = create((set) => ({
  visible: false,
  textContent: "",
  notificationType: "",
  actions: {
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
  },
}));

export const useVisible = () => useNotificationStore((state) => state.visible);
export const useTextContent = () =>
  useNotificationStore((state) => state.textContent);
export const useNotificationType = () =>
  useNotificationStore((state) => state.notificationType);
export const useNotificationActions = () =>
  useNotificationStore((state) => state.actions);

export default useNotificationStore;
