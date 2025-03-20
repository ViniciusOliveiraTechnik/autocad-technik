import { useCallback } from "react";

import { SquarePenIcon } from "lucide-react";

import Spinner from "./UI/Spinner/Spinner";

import {
  useModifyLoading,
  useTagActions,
} from "@/store/useTagStore";
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
    <SquarePenIcon className="w-5 h-5 md:w-6 md:h-6" />
  );
  const handleClick = useCallback(
    () => fetchModifyTag(fileData.id, tableData),
    [fetchModifyTag, fileData.id, tableData]
  );

  return (
    <button
      className="w-full btn-secondary flex items-center justify-center gap-5 h-10 md:h-14"
      aria-label="Modificar TAGs"
      disabled={isDisabled}
      onClick={handleClick}
    >
      <span>{iconContent}</span>
      <span className="flex items-center justify-start text-button-mobile lg:text-button-desktop">
        Modificar TAGs
      </span>
    </button>
  );
}
