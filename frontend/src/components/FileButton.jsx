import { useCallback, useRef } from "react";

import Spinner from "./UI/Spinner/Spinner";

import StatusIndicatorPing from "./StatusIndicatorPing";

import useFileStore, { useFileActions } from "@/store/useFileStore";
import { useExtractLoading } from "@/store/useTagStore";

export default function FileButton() {
  // useFileStore
  const { loadingFile, fileName, connectionState, pingState } = useFileStore();
  const { fetchFileConnection } = useFileActions();

  // useTagStore
  const extractLoading = useExtractLoading();

  const fileInputRef = useRef(null);
  const handleRefClick = useCallback(() => fileInputRef.current?.click(), []);

  const isDisabled = loadingFile || extractLoading;
  const fileStatus = connectionState;

  return (
    <div>
      <button
        className="flex items-center justify-between btn-secondary rounded-md w-full h-18 md:h-20 px-5 shadow-sm"
        onClick={handleRefClick}
        aria-label="Selecionar arquivo"
        aria-describedby="file-status"
        disabled={isDisabled}
      >
        <div className="text-start">
          <h2 className="text-title-sm md:text-title-md font-semibold text-gray-900">
            {fileName}
          </h2>
          <p className="text-default-sm md:text-default-md font-light text-gray-700">
            {fileStatus}
          </p>
        </div>
        {loadingFile ? (
          <Spinner extraStyles="text-red-500" />
        ) : (
          <StatusIndicatorPing pingEffect={pingState} />
        )}
      </button>

      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={fetchFileConnection}
        accept=".dwg"
      />
    </div>
  );
}
