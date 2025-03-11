import ActiveFileButton from "./ActiveFileButton";
import ExtractButton from "./ExtractButton";
import TagTable from "./TagTable";
import NotFoundTable from "./NotFoundTable";
import ModifyButton from "./ModifyButton";
import useFileConnection from "../hooks/useFileConnection.jsx";
import useNotification from "../hooks/useNotification";
import Notification from "./UI/Notification/Notification";
import useExtractTags from "../hooks/useExtractTags.jsx";

function Content() {
  const {
    fileResponse,
    fileConnectionState,
    isFileConnectionLoading,
    pingEffect,
    handleFileConnection,
  } = useFileConnection();

  const { visible, textContent, notificationType } = useNotification();

  const { tagResponse, isExtractionRunning, handleExtractTags } =
    useExtractTags();

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
        disabled={!fileResponse || isExtractionRunning}
        onClick={() => handleExtractTags(fileResponse.id)}
        isLoadingExtract={isExtractionRunning}
      />

      {/* Conteúdo Dinâmico */}
      {tagResponse ? (
        <div className="flex flex-col gap-4">
          {/* Tabela de Tags */}
          <TagTable tagResponse={tagResponse} />

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
