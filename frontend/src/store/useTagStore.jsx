import ExtractTags from "@/api/ExtractTags";
import { create } from "zustand";
import useNotificationStore from "./useNotificationStore";
import ModifyTags from "@/api/ModifyTags";
import useTableStore from "./useTableStore";

const useTagStore = create((set) => ({
  extractLoading: false,
  modifyLoading: false,
  actions: {
    updateExtractData: (extractData) => set({ extractData }),

    fetchExtractTag: async (fileID) => {
      // import global states
      const { showNotification } = useNotificationStore.getState().actions;
      const { updateTableData } = useTableStore.getState().actions;

      // Verify if fileID exists
      if (!fileID) {
        set({ extractLoading: false });
        updateTableData([]);
        showNotification("ID do arquivo não existente", "error");
        return;
      }

      set({ extractLoading: true }); // Starts running
      updateTableData([]);

      try {
        // Try to get
        const response = await ExtractTags(fileID); // Get tags
        updateTableData(response);
        showNotification(`${response.length} tags extraídas`, "normal");
        return;

        // Error
      } catch (error) {
        updateTableData([]);
        showNotification(
          error.response?.data?.error || "Erro desconhecido",
          "error"
        );
        return;

        // Activate button
      } finally {
        set({ extractLoading: false });
      }
    },

    fetchModifyTag: async (fileID, tableContent) => {
      // import global states
      const { showNotification } = useNotificationStore.getState().actions;

      if (!fileID || !tableContent) {
        set({ modifyLoading: false });
        showNotification(
          "ID do arquivo ou conteúdo da tabela não encontrado",
          "error"
        );
        return;
      }

      set({ modifyLoading: true }); // Starts modify

      try {
        // Try modify tags
        const response = await ModifyTags(fileID, tableContent);
        showNotification("Tags modificadas com sucesso!", "normal");
        return;

        // Error notification
      } catch (error) {
        showNotification(
          error.response?.data?.error || "Erro desconhecido",
          "error"
        );
        return;

        // Default reset operation
      } finally {
        set({ modifyLoading: false });
      }
    },
  },
}));

export const useExtractLoading = () =>
  useTagStore((state) => state.extractLoading);
export const useModifyLoading = () =>
  useTagStore((state) => state.modifyLoading);
export const useTagActions = () => useTagStore((state) => state.actions);

export default useTagStore;
