import { useTableData, useTableSearch } from "@/store/useTableStore";
import TableInput from "./TableInput";
import { SearchX } from "lucide-react";

export default function TableBody() {
  // useTableStore
  const tableData = useTableData();
  const tableSearch = useTableSearch();

  // Component Methods
  const filteredData = tableData.filter((row) =>
    row.old_tag_regex.toLowerCase().includes(tableSearch.toLowerCase())
  );

  return (
    <tbody className="text-left text-small-sm md:text-small-md">
      {filteredData.length > 0 ? (
        filteredData.map((tag) => (
          <tr key={tag.id} className="h-14 md:h-16 border-b border-gray-200">
            <td className="px-5 font-normal text-gray-700 overflow-x-auto custom-scrollbar">
              {tag.old_tag_regex}
            </td>
            <td className="px-5">
              <TableInput
                text="TECH"
                placeholder="Insira a nova tag"
                id={tag.id}
              />
            </td>
          </tr>
        ))
      ) : (
        <tr className="h-14 md:h-16 border-b border-gray-200">
          <td className="px-5 text-default-sm md:text-default-md font-normal">
            <div className="flex items-center justify-start gap-5 text-gray-700">
              <SearchX className="size-4 md:size-5" />
              <h2 className="font-normal text-small-sm md:text-small-md">
                Nenhum dado encontrado
              </h2>
            </div>
          </td>
        </tr>
      )}
    </tbody>
  );
}
