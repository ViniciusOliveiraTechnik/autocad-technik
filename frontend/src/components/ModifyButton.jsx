import { SquarePenIcon } from "lucide-react";

export default function ModifyButton() {
  return (
    <button
      className="w-full btn-secondary flex items-center justify-center gap-5 h-10 md:h-14"
      aria-label="Modificar TAGs"
    >
      <span className="flex items-center justify-center">
        <SquarePenIcon className="w-5 h-5 md:w-6 md:h-6" />
        {/* Ícone responsivo */}
      </span>
      <span className="flex items-center justify-start text-button-mobile lg:text-button-desktop">
        Modificar TAGs
      </span>
    </button>
  );
}
