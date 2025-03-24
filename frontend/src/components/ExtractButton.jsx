import { DiamondPlusIcon } from "lucide-react";

import Spinner from "./UI/Spinner/Spinner";

import { useExtractLoading, useTagActions } from "@/store/useTagStore";
import { useFileData } from "@/store/useFileStore";

import { useCallback } from "react";

export default function ExtractButton2() {
  // useTagStore
  const extractLoading = useExtractLoading();
  const { fetchExtractTag } = useTagActions();

  // useFileStore
  const fileData = useFileData();

  const isDisabled = !fileData || extractLoading;
  const iconContent = extractLoading ? (
    <Spinner extraStyles="text-gray-400" />
  ) : (
    <DiamondPlusIcon className="size-4 md:size-5" />
  );

  const fileID = fileData?.id;
  const handleClick = useCallback(
    () => fetchExtractTag(fileID),
    [fileID, fetchExtractTag]
  );

  return (
    <div>
      <button
        className="btn-primary flex items-center justify-center gap-5 p-2 md:p-3"
        aria-label="Extrair TAGs"
        disabled={isDisabled}
        onClick={handleClick}
      >
        <span>{iconContent}</span>
        <span>Extrair TAGs</span>
      </button>
    </div>
  );
}
