import ExtractTags from "@/api/ExtractTags";
import { create } from "zustand";

const useTagStore = create((set) => ({
  extractData: null,
  extractLoading: false,
  modifyLoading: false,

  fetchExtractTag: async (fileID) => {
    // Verify if fileID exists
    if (!fileID) {
      set({ extractLoading: false, extractData: null });
      return;
    }

    set({ extractLoading: true }); // Starts running

    try {
      // Try to get
      const response = await ExtractTags(fileID); // Get tags
      set({ extractData: response });
      return;

      // Error
    } catch (error) {
      console.error(error);
      set({ extractData: null });

      // Activate button
    } finally {
      set({ extractLoading: false });
    }
  },
}));

export default useTagStore;
