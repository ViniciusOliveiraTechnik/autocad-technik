import { DiamondPlusIcon } from "lucide-react";
import Spinner from "./UI/Spinner/Spinner";
import useTagStore from "@/store/useTagStore";
import useFileStore from "@/store/useFileStore";

export default function ExtractButton2() {
  const { extractLoading, fetchExtractTag } = useTagStore();
  const { fileData } = useFileStore();

  return (
    <div>
      <button
        className="btn-primary h-8 md:h-10 px-5 flex flex-row items-center justify-center gap-5"
        aria-label="Extrair TAGs"
        disabled={!fileData || extractLoading}
        onClick={() => fetchExtractTag(fileData.id)}
      >
        <span className="flex items-center justify-center">
          {extractLoading ? (
            <Spinner extraStyles="text-gray-400" />
          ) : (
            <DiamondPlusIcon className="size-4 md:size-5" />
          )}
        </span>
        <span className="flex items-center justify-start text-button-mobile lg:text-button-desktop">
          Extrair TAGs
        </span>
      </button>
    </div>
  );
}
