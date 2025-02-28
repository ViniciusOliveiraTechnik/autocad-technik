import { useRef } from "react";
import StatusIndicatorPing from "./StatusIndicatorPing";

export default function ActiveFileButton({ pingEffect, onChange, fileInfo }) {
  const fileInputRef = useRef(null);

  const handleRefClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <button
        className="flex items-center justify-between btn-secondary rounded-lg w-full h-18 md:h-20 px-6 "
        onClick={handleRefClick}
        aria-label="Selecionar arquivo"
        aria-describedby="file-status"
      >
        <div className="text-start">
          <h2 className="text-title-mobile md:text-title-desktop font-semibold text-gray-900">
            {fileInfo.filename}
          </h2>
          <p
            id="file-status"
            className="text-default-mobile md:text-default-desktop font-light text-gray-600"
          >
            {fileInfo.details}
          </p>
        </div>

        <StatusIndicatorPing pingEffect={pingEffect} />
      </button>
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={onChange}
        accept=".dwg"
      />
    </div>
  );
}
