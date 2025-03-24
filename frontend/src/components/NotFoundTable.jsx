import { useFileInputRef } from "@/store/useFileStore";
import { Database } from "lucide-react";
import { useCallback } from "react";

export default function NotFoundTable() {
  // useFileStore
  const fileInputRef = useFileInputRef();

  // Component Attrs

  // Component Methods
  const handleClick = useCallback(
    () => fileInputRef?.current.click(),
    [fileInputRef]
  );

  return (
    <div className="h-full w-full flex gap-3 items-center justify-center bg-transparent rounded-lg text-gray-400 text-center">
      <Database
        className="size-8 md:size-9"
        aria-label="Ícone de tabela vazia"
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
