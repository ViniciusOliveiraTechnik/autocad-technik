import { use, useState } from "react";
import ActiveFileButton from "./ActiveFileButton";
import ExtractButton from "./ExtractButton";
import TagTable from "./TagTable";
import NotFoundTable from "./NotFoundTable";
import ModifyButton from "./ModifyButton";
import { RecieveFile } from "../api/RecieveFile";
import ExtractTags from "../api/ExtractTags";

function Content() {
  const [fileInfo, setFileInfo] = useState({
    filename: "Nenhum arquivo",
    details: "Se conecte a um arquivo",
  });
  const [fileData, setFileData] = useState(null);
  const [isFileConected, setIsFileConected] = useState(false);
  const [isFileConnectionLoading, setIsFileConnectionLoading] = useState(false);

  const [isLoadingExtract, setIsLoadingExtract] = useState(false);
  const [extractedTags, setExtractedTags] = useState(null);

  const [pingEffect, setPingEffect] = useState("neutral");

  const [error, setError] = useState(null);

  const handleExtractTags = async () => {
    setIsLoadingExtract(true);
    if (!fileData) {
      return;
    }

    const data = await ExtractTags(fileData.id);
    if (data.error) {
      return;
    }

    setExtractedTags(data);
    setIsLoadingExtract(false);
  };

  const handleSelectFile = async (event) => {
    setIsFileConnectionLoading(true);

    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      setFileInfo({
        filename: "Nenhum arquivo", // Corrigido o erro de digitação
        details: "Se conecte a um arquivo",
      });
      setPingEffect("neutral"); // Atualize o status diretamente
      setExtractedTags([]);

      setIsFileConnectionLoading(false);
      return;
    }

    const response = await RecieveFile(selectedFile);

    if (response.error) {
      setFileInfo({
        filename: "Falha na conexão",
        details: response.error,
      });
      setPingEffect("fail"); // Atualize o status diretamente

      setIsFileConnectionLoading(false);
      return;
    }

    // Caso tenha sucesso na conexão
    setFileInfo({
      filename: response.data.file_name,
      details: response.details,
    });
    setPingEffect("success");

    setFileData(response.data);
    setIsFileConnectionLoading(false);
    setIsFileConected(true);
  };

  return (
    <section className="h-screen overflow-y-auto flex flex-col gap-4 p-6 bg-gray-100">
      {/* Botão de Arquivo Ativo */}
      <ActiveFileButton
        pingEffect={pingEffect}
        onChange={handleSelectFile}
        fileInfo={fileInfo}
        isFileConnectionLoading={isFileConnectionLoading}
      />

      {/* Botão de Extração */}
      <ExtractButton
        disabled={!isFileConected || isLoadingExtract}
        onClick={handleExtractTags}
        isLoadingExtract={isLoadingExtract}
      />

      {/* Conteúdo Dinâmico */}
      {extractedTags ? (
        <div className="flex flex-col gap-4">
          {/* Tabela de Tags */}
          <TagTable tagItems={extractedTags} />

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
