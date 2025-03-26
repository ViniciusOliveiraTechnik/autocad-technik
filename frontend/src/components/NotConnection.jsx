import { useFileInputRef } from "@/store/useFileStore";
import { Database } from "lucide-react";
import { useCallback } from "react";

export default function NotConnection() {
  // useFileStore
  const fileInputRef = useFileInputRef();

  // Component Attrs

  // Component Methods
  const handleClick = useCallback(
    () => fileInputRef?.current.click(),
    [fileInputRef]
  );

  return (
    <div className="flex items-center justify-center gap-3">
      <Database
        className="size-8 md:size-9"
        aria-label="Ícone de banco de dados"
      />
      <div className="flex flex-col items-start justify-center">
        <h2 className="text-default-sm md:text-default-md font-semibold">
          Sem dados contectados
        </h2>
        <p className="text-small-sm md:text-small-md font-normal">
          <span
            className="text-sky-500 cursor-pointer hover:underline"
            onClick={handleClick}
          >
            Conecte-se
          </span>{" "}
          à um arquivo
        </p>
      </div>
    </div>
  );
}
