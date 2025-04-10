export default function TableHead() {
  return (
    <thead
      className="
        sticky top-0 
        h-14 md:h-16  
        text-left text-small-sm md:text-small-md
        bg-white/70 backdrop-blur-[5px]
      "
    >
      <tr className="border-b border-gray-300 text-gray-900">
        <th className="px-5" scope="col">
          <h2>TAG ANTIGA</h2>
        </th>
        <th className="px-5" scope="col">
          <h2>TAG NOVA</h2>
        </th>
      </tr>
    </thead>
  );
}
