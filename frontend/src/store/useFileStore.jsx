import { create } from "zustand";

import { FileConnection } from "@/api/FileConnection";

import useNotificationStore from "./useNotificationStore";
import useTableStore from "./useTableStore";

const useFileStore = create((set) => ({
  fileInputRef: null,
  fileData: null,
  loadingFile: false,
  fileName: "Nenhum arquivo selecionado",
  connectionState: "Se conecte à um arquivo",
  pingState: "neutral",
  actions: {
    fetchFileConnection: async (event) => {
      // import global states
      const { showNotification } = useNotificationStore.getState().actions;
      const { updateTableData } = useTableStore.getState().actions;

      const file = event.target.files[0]; // Get file

      updateTableData([]);

      // Verify if file doesn't exist
      if (!file) {
        set({
          fileData: null,
          fileName: "Nenhum arquivo selecionado",
          connectionState: "Se conecte à um arquivo",
          pingState: "neutral",
        });
        showNotification("Selecione um arquivo para começar", "error");
        return;
      }

      set({ loadingFile: true, fileData: null }); // Start the loading

      try {
        // Try to connect
        const response = await FileConnection(file);

        // Set new state for the success
        set({
          fileData: response.data,
          fileName: response.data.file_name,
          connectionState: "Conectado com sucesso",
          pingState: "success",
        });
        showNotification(
          `${response.data.file_name} conectado com sucesso!`,
          "normal"
        );

        // Error state
      } catch (error) {
        set({
          fileData: null,
          fileName: "Erro de conexão",
          connectionState: "Falha ao se conectar ao arquivo",
          pingState: "fail",
        });
        showNotification(
          error.response?.data?.error || "Erro desconhecido",
          "error"
        );

        // Loading state goes to false
      } finally {
        set({ loadingFile: false });
      }
    },

    updateFileInputRef: (fileInputRef) => set({ fileInputRef }),
  },
}));

export const useFileInputRef = () =>
  useFileStore((state) => state.fileInputRef);
export const useFileData = () => useFileStore((state) => state.fileData);
export const useLoadingFile = () => useFileStore((state) => state.loadingFile);
export const useConnectionState = () =>
  useFileStore((state) => state.connectionState);
export const usePingState = () => useFileStore((state) => state.pingState);
export const useFileActions = () => useFileStore((state) => state.actions);

export default useFileStore;
