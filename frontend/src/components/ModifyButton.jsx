import { SquarePenIcon } from "lucide-react";
import Spinner from "./UI/Spinner/Spinner";

export default function ModifyButton({ isModifyingRunning, ...props }) {
  return (
    <button
      className="w-full btn-secondary flex items-center justify-center gap-5 h-10 md:h-14"
      aria-label="Modificar TAGs"
      {...props}
    >
      <span className="flex items-center justify-center">
        {isModifyingRunning ? (
          <Spinner extraStyles="text-gray-400" />
        ) : (
          <SquarePenIcon className="w-5 h-5 md:w-6 md:h-6" />
        )}
      </span>
      <span className="flex items-center justify-start text-button-mobile lg:text-button-desktop">
        Modificar TAGs
      </span>
    </button>
  );
}
