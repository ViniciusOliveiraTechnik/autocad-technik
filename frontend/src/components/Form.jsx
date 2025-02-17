import FileUploadButton from "./FileUploadButton"; // Corrigido o nome do componente
import FormActionGroup from "./FormActionGroup";
import FormHeader from "./FormHeader";
import Input from "./Input";
import { useState } from "react";
import "../App.css";

function Form({ handleApiLoading }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setErrorMessage("");
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
  };

  const handleExtract = () => {
    if (selectedFile) {
      console.log("Extraindo dados do arquivo:", selectedFile.name);
      return handleApiLoading();
    }
    console.log("Nenhum arquivo selecionado");
  };

  return (
      <div className="p-6 flex flex-col gap-5 rounded bg-white drop-shadow w-[95%] h-[95%] xl:w-[80%] xl:h-[80%]">
        <FormHeader
          title="Extração de TAGs"
          paragraph="Selecione um arquivo para extrair"
        />
        <FileUploadButton onChange={handleFileChange} />

        {/* Exibe o nome do arquivo selecionado */}
        <Input
          placeholder={
            selectedFile ? selectedFile.name : "Nenhum arquivo selecionado"
          }
          disabled
          type="text"
        />

        <FormActionGroup
          buttons={[
            {
              text: "Limpar",
              onClick: handleClear,
              style: "bg-white border border-gray-300 text-red-500",
            },
            {
              text: "Extrair",
              onClick: handleExtract,
              style: "bg-gradient-to-r from-red-800 to-red-500 text-white",
            },
          ]}
        />
      </div>
  );
}

export default Form;
