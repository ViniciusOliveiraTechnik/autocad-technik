import Input from "./TableInput";
import { useTableData } from "@/store/useTableStore";

export default function Table() {
  const tableData = useTableData();
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-[500px] 2xl:max-h-[600px]">
      <table className="table-primary">
        <thead className="text-default-mobile md:text-default-desktop text-gray-500 bg-gray-50">
          <tr>
            <th className="px-5 py-2">Tag Antiga</th>
            <th className="px-5 py-2">Tag Nova</th>
          </tr>
        </thead>
        <tbody className="text-default-mobile md:text-default-desktop">
          {tableData.map((tag) => (
            <tr
              key={tag.id}
              className="bg-white border-b border-gray-200 hover:bg-gray-100 h-12 md:h-14 text-left"
            >
              <th className="px-5 font-medium text-gray-700 whitespace-nowrap">
                {tag.old_tag_regex}
              </th>
              <td>
                <Input
                  spanText="TECH"
                  placeholder="Insira a nova Tag"
                  id={tag.id}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
