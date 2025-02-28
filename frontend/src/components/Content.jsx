import { useState } from "react";
import ActiveFileButton from "./ActiveFileButton";
import ExtractButton from "./ExtractButton";
import TagTable from "./TagTable";
import NotFoundTable from "./NotFoundTable";
import ModifyButton from "./ModifyButton";
import { connectFile } from "../api/connectFile";

function Content() {
  const [fileInfo, setFileInfo] = useState({
    filename: "Nenhum arquivo",
    details: "Se conecte a um arquivo",
  });
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isFileConected, setIsFileConected] = useState(false);
  const [pingEffect, setPingEffect] = useState("neutral");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleLoadConnection = () => {
    return;
  };
  
  const handleSelectFile = async (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    if (!selectedFile) {
      setFileInfo({
        filename: "Nenhum arquivo",
        details: "Se conecte a um arquivo",
      });
      setPingEffect("neutral");
      setIsFileConected(false);
      setFile(null);
      return;
    }

    try {
      const response = await connectFile(selectedFile);

      if (response.error) {
        console.log("Erro recebido:", response.error);
        setError(response.error);
        setPingEffect("fail");
      } else {
        setError(null);
        setPingEffect("success");
        setFileInfo({
          filename: response.filename,
          details: response.details,
        });
        setIsFileConected(true);
      }
    } catch (err) {
      console.error(err);
      setError("Erro inesperado ao conectar o arquivo");
      setPingEffect("fail");
    }
  };

  return (
    <section className="h-screen overflow-y-auto flex flex-col gap-4 p-6 bg-gray-100">
      {/* Botão de Arquivo Ativo */}
      <ActiveFileButton
        pingEffect={pingEffect}
        onChange={handleSelectFile}
        fileInfo={fileInfo}
      />

      {/* Botão de Extração */}
      <ExtractButton disabled={!isFileConected} />

      {/* Conteúdo Dinâmico */}
      {isDataLoaded ? (
        <div className="flex flex-col gap-4">
          {/* Tabela de Tags */}
          <TagTable />

          {/* Botão de Modificação */}
          <ModifyButton />
        </div>
      ) : (
        <NotFoundTable />
      )}
    </section>
  );
}

export default Content;
