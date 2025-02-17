import { CloudUpload } from "lucide-react";

function FileUploadButton({ onChange }) {
  return (
    <div className="flex flex-col gap-4">
      <label
        className="p-4 bg-gradient-to-r from-red-800 to-red-500 rounded-lg flex justify-center items-center gap-4 text-white text-xl md:text-2xl cursor-pointer"
        htmlFor="file-upload"
      >
        <CloudUpload className="h-6 w-6 md:h-7 xl:w-7" />
        <span>Selecionar Arquivo</span>
      </label>
      <input
        id="file-upload"
        type="file"
        className="hidden"
        onChange={onChange}
      />
    </div>
  );
}

export default FileUploadButton;
