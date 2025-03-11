import { useState } from "react";
import { RecieveFile } from "../api/RecieveFile";
import useNotification from "./useNotification";
import useExtractTag from "./useExtractTags";

export default function useFileConnection() {
  const [fileConnectionState, setFileConnectionState] = useState({
    fileName: "Nenhum arquivo selecionado",
    connectionState: "Se conecte à um arquivo",
  });
  const [isFileConnectionLoading, setIsFileConnectionLoading] = useState(false);
  const [fileResponse, setFileResponse] = useState(null);
  const [pingEffect, setPingEffect] = useState("neutral");

  const { showNotification } = useNotification();

  const {
    tagResponse,
    setTagsResponse,
    isExtractionRunning,
    setIsExtractionRunning,
    handleExtractTags,
  } = useExtractTag();

  const handleFileConnection = async (event) => {
    setTagsResponse(null);
    setFileResponse(null);
    setIsFileConnectionLoading(true);

    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      setFileConnectionState({
        fileName: "Nenhum arquivo selecionado",
        connectionState: "Se conecte à um arquivo",
      });
      setPingEffect("neutral");
      setIsFileConnectionLoading(false);
      showNotification("Nenhum arquivo selecionado", "error", 1500);

      return;
    }

    const response = await RecieveFile(selectedFile);

    if (response.error) {
      setFileConnectionState({
        fileName: "Falha na conexão",
        connectionState: "Houve um erro durante a conexão",
      });
      setPingEffect("fail");
      setIsFileConnectionLoading(false);
      showNotification(`Erro: ${response.error}`, "error", 2000);
      return;
    }

    setFileResponse(response.data);
    setFileConnectionState({
      fileName: response.data.file_name,
      connectionState: "Conectado com sucesso",
    });
    setPingEffect("success");
    setIsFileConnectionLoading(false);
    showNotification(
      `${response.data.file_name} foi conectado com sucesso`,
      "normal",
      2000
    );
  };

  return {
    fileResponse,
    fileConnectionState,
    isFileConnectionLoading,
    pingEffect,
    handleFileConnection,
  };
}
