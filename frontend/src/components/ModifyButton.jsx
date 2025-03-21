import { useCallback } from "react";

import { Pencil } from "lucide-react";

import Spinner from "./UI/Spinner/Spinner";

import { useModifyLoading, useTagActions } from "@/store/useTagStore";
import { useFileData } from "@/store/useFileStore";
import { useTableData } from "@/store/useTableStore";

export default function ModifyButton() {
  // useTagStore
  const modifyLoading = useModifyLoading();
  const { fetchModifyTag } = useTagActions();

  // useTableStore
  const tableData = useTableData();

  // useFileStore
  const fileData = useFileData();

  const isDisabled = modifyLoading;
  const iconContent = modifyLoading ? (
    <Spinner extraStyles="text-gray-400" />
  ) : (
    <Pencil className="size-3 md:size-4" />
  );
  const handleClick = useCallback(
    () => fetchModifyTag(fileData.id, tableData),
    [fetchModifyTag, fileData, tableData]
  );

  return (
    <button
      className="btn-primary flex gap-4 md:gap-5 items-center justify-center p-3"
      aria-label="Modificar TAGs"
      disabled={isDisabled}
      onClick={handleClick}
    >
      <span>{iconContent}</span>
      <span className="text-default-sm md:text-default-md">Modificar</span>
    </button>
  );
}
