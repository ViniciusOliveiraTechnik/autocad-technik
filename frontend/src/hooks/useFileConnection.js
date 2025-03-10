import { useState } from "react";
import { RecieveFile } from "../api/RecieveFile";
import { useNotification } from "../hooks/useNotification";

export default function useFileConnection() {
  const [fileConnectionState, setFileConnectionState] = useState({
    fileName: "Nenhum arquivo selecionado",
    connectionState: "Se conecte à um arquivo",
  });
  const [isFileConnected, setIsFileConnected] = useState(false);
  const [isFileConnectionLoading, setIsFileConnectionLoading] = useState(false);
  const [pingEffect, setPingEffect] = useState("neutral");

  const { showNotification } = useNotification();

  const handleFileConnection = async (event) => {
    setIsFileConnectionLoading(true);
    showNotification("teste");

    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      setFileConnectionState({
        fileName: "Nenhum arquivo selecionado",
        connectionState: "Se conecte à um arquivo",
      });
      setPingEffect("neutral");
      setIsFileConnected(false);
      setIsFileConnectionLoading(false);

      return;
    }

    const response = await RecieveFile(selectedFile);

    if (response.error) {
      setFileConnectionState({
        fileName: "Falha na conexão",
        connectionState: "Houve um erro durante a conexão",
      });
      setPingEffect("fail");
      setIsFileConnected(false);
      setIsFileConnectionLoading(false);
      return;
    }

    setFileConnectionState({
      fileName: response.data.file_name,
      connectionState: "Conectado com sucesso",
    });
    setPingEffect("success");
    setIsFileConnectionLoading(false);
    setIsFileConnected(true);
  };

  return {
    fileConnectionState,
    isFileConnected,
    isFileConnectionLoading,
    pingEffect,
    handleFileConnection,
  };
}
