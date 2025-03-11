import Row from "./UI/Table/Row";

export default function TagTable({ tagResponse }) {
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
          {tagResponse.map((tag) => (
            <Row key={tag.id} content={tag.old_tag} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
