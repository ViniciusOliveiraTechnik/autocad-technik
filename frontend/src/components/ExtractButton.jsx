import { DiamondPlusIcon } from "lucide-react";
import Spinner from "./UI/Spinner/Spinner";

export default function ExtractButton({
  disabled,
  isLoadingExtract,
  ...props
}) {
  return (
    <div>
      <button
        className="btn-primary h-8 md:h-10 px-5 flex flex-row items-center justify-center gap-5"
        aria-label="Extrair TAGs"
        disabled={disabled}
        {...props}
      >
        <span className="flex items-center justify-center">
          {isLoadingExtract ? (
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
