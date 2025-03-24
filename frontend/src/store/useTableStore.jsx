import { create } from "zustand";

const useTableStore = create((set) => ({
  tableData: [],
  tableSearch: "",
  actions: {
    updateTableData: (tableData) => set({ tableData }),

    updateTableRow: (id, field, value) =>
      set((state) => ({
        tableData: state.tableData.map((row) =>
          row.id === id ? { ...row, [field]: value } : row
        ),
      })),

    updateTableSearch: (tableSearch) => set({ tableSearch }),
  },
}));

export const useTableData = () => useTableStore((state) => state.tableData);
export const useTableSearch = () => useTableStore((state) => state.tableSearch);
export const useTableActions = () => useTableStore((state) => state.actions);

export default useTableStore;
