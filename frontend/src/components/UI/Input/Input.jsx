import { Paperclip } from "lucide-react";

function Input(props) {
  return (
    <div className="flex items-center h-12 md:h-15 w-full border border-gray-500 rounded-[8px] overflow-hidden">
      <span className="bg-gray-300 h-full flex items-center justify-center px-4 md:px-5">
        <Paperclip className="text-gray-500 w-5 h-5 md:w-6 md:h-6" />
      </span>
      <input className="h-full w-full px-4 outline-0 text-gray-500" {...props} disabled/>
    </div>
  );
}

export default Input;
