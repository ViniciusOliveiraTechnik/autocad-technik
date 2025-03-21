import TableInput from "../Table/TableInput";

export default function TableCards() {
  return (
    <div>
      <div className="bg-white p-3 rounded flex flex-col gap-3">
        <div>
          <h2 className="text-lg">Tag Antiga</h2>
          <p>TESTE-XXXX</p>
        </div>
        <div>
          <h2>Tag nova</h2>
          <TableInput text="TECH" placeholder="Insira a nova tag" />
        </div>
      </div>
    </div>
  );
}
