import { Grid2x2X } from "lucide-react";

export default function NotData() {
  return (
    <div className="flex items-center justify-center gap-3">
      <Grid2x2X
        className="size-8 md:size-9"
        aria-label="Ícone de tabela vazia"
      />
      <div className="flex flex-col items-start justify-center">
        <h2 className="text-default-sm md:text-default-md font-semibold">
          Nenhuma tag extraída
        </h2>
        <p className="text-small-sm md:text-small-md font-normal">
          Extraia ou verifique os dados do arquivo
        </p>
      </div>
    </div>
  );
}
