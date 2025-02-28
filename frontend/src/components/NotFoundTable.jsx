import { Table2Icon } from "lucide-react";

export default function NotFoundTable() {
  return (
    <div
      className="h-full w-full flex flex-col gap-3 items-center justify-center bg-white rounded-lg text-gray-400 text-center text-default-mobile md:text-default-desktop shadow-md"
      role="alert"
      aria-live="polite"
    >
      <Table2Icon
        className="size-8 md:size-10"
        aria-label="Ícone de tabela vazia"
      />
      <p>Nenhum dado encontrado</p>
    </div>
  );
}
