import ActiveFileButton from "./ActiveFileButton";
import ModifyButton from "./ModifyButton";
import ExtractButton from "./ExtractButton";
import TagTable from "./TagTable";
import NotFoundTable from "./NotFoundTable";
import Notification from "./UI/Notification/Notification";

import useFileConnection from "../hooks/useFileConnection.jsx";
import useNotification from "../hooks/useNotification";
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
      {tagResponse ? <TagTable tagResponse={tagResponse} fileID={fileResponse.id} /> : <NotFoundTable />}
    </section>
  );
}

export default Content;
