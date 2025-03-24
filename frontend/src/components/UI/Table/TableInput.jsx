import { useTableActions } from "@/store/useTableStore";
import { useCallback } from "react";

export default function TableInput({ tag, text = "text", id, ...props }) {
  const { updateTableRow } = useTableActions();

  const handleChange = useCallback(
    (event) => updateTableRow(id, "new_tag", event.target.value),
    [updateTableRow, id]
  );

  return (
    <div className="flex items-center justify-center text-small-sm md:text-small-md">
      <span
        className="
          flex items-center justify-center text-center  
          px-3 h-10 rounded-l-md  
          border border-gray-400 border-r-0  
          text-gray-400 
        "
      >
        {text}
      </span>
      <input
        type="text"
        className="
          w-full h-10 px-3  
          border border-gray-400 rounded-r-md outline-none  

          placeholder:text-gray-400  
          focus:ring-1 ring-sky-400  
          transition-all duration-300
        "
        aria-label={`Modificar tag para ${tag}`}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
}
