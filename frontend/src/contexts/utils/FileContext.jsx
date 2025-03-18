import { createContext, useState } from "react";

import useNotification from "@/hooks/useNotification";
import useTag from "@/hooks/useTag";

import { RecieveFile } from "@/api/RecieveFile";

export const FileContext = createContext();

export function FileProvider({ children }) {
  const [fileConnectionState, setFileConnectionState] = useState({
    fileName: "Nenhum arquivo selecionado",
    connectionState: "Se conecte à um arquivo",
  });
  const [isFileConnectionLoading, setIsFileConnectionLoading] = useState(false);
  const [fileResponse, setFileResponse] = useState(null);
  const [pingEffect, setPingEffect] = useState("neutral");

  const { showNotification } = useNotification();

  const { setExtractResponse } = useTag();

  const handleFileConnection = async (event) => {
    setExtractResponse(null);
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

  return (
    <FileContext.Provider
      value={{
        fileResponse,
        fileConnectionState,
        isFileConnectionLoading,
        pingEffect,
        handleFileConnection,
      }}
    >
      {children}
    </FileContext.Provider>
  );
}
