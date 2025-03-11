import { useState } from "react";
import ActiveFileButton from "./ActiveFileButton";
import ExtractButton from "./ExtractButton";
import TagTable from "./TagTable";
import NotFoundTable from "./NotFoundTable";
import ModifyButton from "./ModifyButton";
import ExtractTags from "../api/ExtractTags";
import useFileConnection from "../hooks/useFileConnection";
import useNotification from "../hooks/useNotification";
import Notification from "./UI/Notification/Notification";

function Content() {
  const {
    fileConnectionState,
    isFileConnected,
    isFileConnectionLoading,
    pingEffect,
    handleFileConnection,
  } = useFileConnection();

  const { visible, textContent, notificationType, showNotification } =
    useNotification();

  const [fileData, setFileData] = useState(null);
  const [isLoadingExtract, setIsLoadingExtract] = useState(false);
  const [extractedTags, setExtractedTags] = useState(null);

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

  return (
    <section className="h-screen overflow-y-auto flex flex-col gap-4 p-6 bg-gray-100">
      <Notification
        textContent={textContent}
        hidden={visible}
        type={notificationType}
      />

      {/* Botão de Arquivo Ativo */}
      <ActiveFileButton
        pingEffect={pingEffect}
        onChange={handleFileConnection}
        fileConnectionState={fileConnectionState}
        isFileConnectionLoading={isFileConnectionLoading}
      />

      {/* Botão de Extração */}
      <ExtractButton
        disabled={!isFileConnected || isLoadingExtract}
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
