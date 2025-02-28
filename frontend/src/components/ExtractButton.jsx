import { DiamondPlusIcon } from "lucide-react";

export default function ExtractButton({ disabled }) {
  return (
    <div>
      <button
        className="btn-primary h-8 md:h-10 px-5 flex flex-row items-center justify-center gap-5"
        aria-label="Extrair TAGs"
        disabled={disabled}
      >
        <span className="flex items-center justify-center">
          <DiamondPlusIcon className="size-4 md:size-5" />
          {/* Ícone responsivo */}
        </span>
        <span className="flex items-center justify-start text-button-mobile lg:text-button-desktop">
          Extrair TAGs
        </span>
      </button>
    </div>
  );
}
