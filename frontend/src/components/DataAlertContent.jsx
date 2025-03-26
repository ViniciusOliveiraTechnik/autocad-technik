import { useTableData } from "@/store/useTableStore";
import NotConnection from "./NotConnection";
import NotData from "./NotData";
import { useFileData } from "@/store/useFileStore";

export default function DataAlertContent() {
  // useTableStore
  const tableData = useTableData();

  // useFileStore
  const fileData = useFileData();

  return (
    <div className="h-full w-full flex items-center justify-center bg-transparent rounded-lg text-gray-400 text-center">
      {fileData && !tableData.length ? <NotData /> : <NotConnection />}
    </div>
  );
}
