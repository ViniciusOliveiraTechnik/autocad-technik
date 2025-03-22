import TableContent from "./TableContent";
import TableHeader from "./TableHeader";

export default function TestTable() {

  return (
    <div className="flex flex-col bg-white rounded-md p-4 overflow-auto shadow-md">
      <div className="overflow-y-auto overflow-x-auto custom-scrollbar">
        <TableHeader />
        <TableContent />
      </div>
    </div>
  );
}
