import { createContext, useState } from "react";

import ExtractTags from "@/api/ExtractTags";
import ModifyTags from "@/api/ModifyTags";

import useNotification from "@/hooks/useNotification";
import useTable from "@/hooks/useTable";

const TagContext = createContext();

export function TagProvider({ children }) {
  const [extractResponse, setExtractResponse] = useState(null);
  const [isExtractionRunning, setIsExtractionRunning] = useState(false);

  const [isModifyingRunning, setIsModifyingRunning] = useState(false);

  const { showNotification } = useNotification();
  const { tableData, setTableData } = useTable();

  const handleExtractTags = async (fileResponseId) => {
    setIsExtractionRunning(true);
    setTableData(null);

    if (!fileResponseId) {
      showNotification(
        "Não foi possível localizar o arquivo desejado",
        "error",
        2500
      );
      setTableData(null);
      return;
    }

    try {
      const response = await ExtractTags(fileResponseId);

      if (response.error) {
        showNotification(response.error, "error", 2500);
        setTableData(null);
        return;
      }

      showNotification(`${response.length} tags extraídas`, "normal", 2500);
      setTableData(response);
    } catch (error) {
      showNotification(
        `Erro ao tentar extrair as tags: ${error}`,
        "error",
        2500
      );
    } finally {
      setIsExtractionRunning(false);
    }
  };

  const handleModifyTags = async (fileID) => {
    if (!fileID) {
      showNotification("ID do arquivo não encontrado", "error", 2500);
      return;
    }

    setIsModifyingRunning(true);

    try {
      const response = await ModifyTags(fileID, tableData);

      if (response.error) {
        showNotification(`${response.error}`, "error", 2500);
      }

      showNotification(`Tags modificadas com sucesso!`, "normal", 2500);
    } catch (error) {
      showNotification(
        `Erro ao tentar modificar tags: ${error}`,
        "error",
        2500
      );
    } finally {
      setIsModifyingRunning(false);
    }
  };

  return (
    <TagContext.Provider
      value={{
        extractResponse,
        setExtractResponse,
        isExtractionRunning,
        setIsExtractionRunning,
        handleExtractTags,
        handleModifyTags,
        isModifyingRunning,
        setIsModifyingRunning,
      }}
    >
      {children}
    </TagContext.Provider>
  );
}

export default TagContext;
