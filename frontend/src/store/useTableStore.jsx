import { create } from "zustand";

const useTableStore = create((set) => ({
  tableData: [],
  updateTableData: (tableData) => set({ tableData }),
  updateTableRow: (id, field, value) =>
    set((state) => ({
      tableData: state.tableData.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      ),
    })),
}));

export default useTableStore;
