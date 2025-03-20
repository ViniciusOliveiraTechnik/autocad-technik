import { useCallback } from "react";

import { SquarePenIcon } from "lucide-react";

import Spinner from "./UI/Spinner/Spinner";

import useTagStore from "@/store/useTagStore";
import useFileStore from "@/store/useFileStore";
import useTableStore from "@/store/useTableStore";

export default function ModifyButton() {
  const { modifyLoading, fetchModifyTag } = useTagStore();
  const { tableData } = useTableStore();
  const { fileData } = useFileStore();

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
