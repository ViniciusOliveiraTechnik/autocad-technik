import { useTableActions, useTableSearch } from "@/store/useTableStore";
import { SearchIcon } from "lucide-react";
import { useCallback } from "react";

export default function SearchInput(props) {
  // useTableStore
  const tableSearch = useTableSearch();
  const { updateTableSearch } = useTableActions();

  const iconContent = (
    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
  );

  const handleChange = useCallback(
    (event) => updateTableSearch(event.target.value),
    [updateTableSearch]
  );

  return (
    <div className="relative flex items-center justify-center">
      {iconContent}
      
      <input
        onChange={(event) => handleChange(event)}
        type="text"
        className="
          w-full h-9 md:h-10 pl-10 pr-5
          border border-gray-400 bg-white rounded-md placeholder:text-gray-400
          outline-none focus:ring-1 focus:ring-sky-400
          transition-all duration-300
        "
        {...props}
      />
    </div>
  );
}
