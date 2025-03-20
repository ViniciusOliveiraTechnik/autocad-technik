import { FileConnection } from "@/api/FileConnection";
import { create } from "zustand";
import useNotificationStore from "./useNotificationStore";
import useTableStore from "./useTableStore";

const useFileStore = create((set) => ({
  fileData: null,
  loadingFile: false,
  fileName: "Nenhum arquivo selecionado",
  connectionState: "Se conecte à um arquivo",
  pingState: "neutral",

  fetchFileConnection: async (event) => {
    // import global states
    const { showNotification } = useNotificationStore.getState();
    const { updateTableData } = useTableStore.getState();

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
}));

export default useFileStore;
