import TableBody from "./TableBody";
import TableHead from "./TableHead";

export default function TableContent() {
  return (
    <table className="table-fixed w-full">
      <TableHead />
      <TableBody />
    </table>
  );
}
