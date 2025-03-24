import ModifyButton from "@/components/ModifyButton";
import SearchInput from "../Input/SearchInput";

export default function TableHeader() {
  return (
    <header className="flex flex-col md:flex-row items-start md:items-center justify-center md:justify-between gap-3 md:gap-0 px-5 py-5">
      <div className="flex flex-col gap-3">
        <div>
          <h2 className="text-[16px] md:text-[18px] text-gray-900 font-medium">
            Tabela de Tags
          </h2>
          <p className="text-[14px] md:text-[16px] font-light text-gray-700">
            Visualize todas as tags de texto extraídas
          </p>
        </div>
        <SearchInput placeholder="Pesquisar" />
      </div>
      <ModifyButton />
    </header>
  );
}
