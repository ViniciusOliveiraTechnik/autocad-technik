import { useTableData } from "@/store/useTableStore";
import TableInput from "./TableInput";

export default function TableBody() {
  const tableData = useTableData();

  return (
    <tbody className="text-left text-[12px] md:text-[14px]">
      {tableData.map((tag) => (
        <tr
          key={tag.id}
          className="
            h-14 md:h-16 
            border-b border-gray-200
          "
        >
          <td
            className="
              px-5 
              font-normal text-gray-700 
              overflow-x-auto custom-scrollbar
            "
          >
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
      ))}
    </tbody>
  );
}
