import { FileConnection } from "@/api/FileConnection";
import { create } from "zustand";

const useFileStore = create((set) => ({
  fileData: null,
  loadingFile: false,
  fileName: "Nenhum arquivo selecionado",
  connectionState: "Se conecte à um arquivo",
  pingState: "neutral",

  fetchFileConnection: async (event) => {
    const file = event.target.files[0]; // Get file

    // Verify if file doesn't exist
    if (!file) {
      set({
        fileData: null,
        fileName: "Nenhum arquivo selecionado",
        connectionState: "Se conecte à um arquivo",
        pingState: "neutral",
      });
      return;
    }

    set({ loadingFile: true }); // Start the loading

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

      // Error state
    } catch (error) {
      set({
        fileData: null,
        fileName: "Erro de conexão",
        connectionState: "Falha ao se conectar ao arquivo",
        pingState: "fail",
      });
      console.error(error);

      // Loading state goes to false
    } finally {
      set({ loadingFile: false });
    }
  },
}));

export default useFileStore;
