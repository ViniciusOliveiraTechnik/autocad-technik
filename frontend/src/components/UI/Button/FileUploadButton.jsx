import { CloudUpload } from "lucide-react";

function FileUploadButton({ onChange }) {
  return (
    <>
      <label
        htmlFor="upload-file"
        className="bg-gradient-to-r from-red-800 to-red-500 text-white text-center flex justify-center items-center gap-3 h-12 md:h-15 rounded-[8px] cursor-pointer"
      >
        <CloudUpload className="h-6 w-6 xl:h-7 xl:w-7" />
        <span>Selecionar Arquivo</span>
      </label>
      <input
        onChange={onChange}
        className="hidden"
        type="file"
        name="upload-file"
        id="upload-file"
      />
    </>
  );
}

export default FileUploadButton;
