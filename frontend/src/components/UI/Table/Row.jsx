import Input from "../Input/Input";

export default function Row({ tag }) {
  return (
    <tr className="bg-white border-b border-gray-200 hover:bg-gray-100 h-12 md:h-14 text-left">
      <th className="px-5 font-medium text-gray-700 whitespace-nowrap">
        {tag.old}
      </th>
      <td className="px-5">
        <Input placeholder="Insira a nova TAG" spanText="TECH"/>
      </td>
    </tr>
  );
}
