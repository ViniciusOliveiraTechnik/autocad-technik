import { create } from "zustand";

const useTableStore = create((set) => ({
  tableData: [],
  actions: {
    updateTableData: (tableData) => set({ tableData }),
    updateTableRow: (id, field, value) =>
      set((state) => ({
        tableData: state.tableData.map((row) =>
          row.id === id ? { ...row, [field]: value } : row
        ),
      })),
  },
}));

export const useTableData = () => useTableStore((state) => state.tableData);
export const useTableActions = () => useTableStore((state) => state.actions);

export default useTableStore;
