import { createContext, useState } from "react";
import ExtractTags from "../api/ExtractTags";
import useNotification from "../hooks/useNotification";

const TagContext = createContext(null);

export function TagProvider({ children }) {
  const [tagResponse, setTagsResponse] = useState(null);
  const [isExtractionRunning, setIsExtractionRunning] = useState(false);

  const { showNotification } = useNotification();

  const handleExtractTags = async (fileResponseId) => {
    setIsExtractionRunning(true);

    if (!fileResponseId) {
      showNotification(
        "Não foi possível localizar o arquivo desejado",
        "error",
        2000
      );
      setTagsResponse(null);
      setIsExtractionRunning(false);
      return;
    }

    const response = await ExtractTags(fileResponseId);

    if (response.error) {
      showNotification(`Erro | ${response.error}`, "error", 2000);
      setTagsResponse(null);
      setIsExtractionRunning(false);
      return;
    }
    console.log(response);

    showNotification(`${response.length} tags extraídas`, "normal", 2000);
    setTagsResponse(response);
    setIsExtractionRunning(false);
  };

  return (
    <TagContext.Provider
      value={{
        tagResponse,
        setTagsResponse,
        isExtractionRunning,
        setIsExtractionRunning,
        handleExtractTags,
      }}
    >
      {children}
    </TagContext.Provider>
  );
}

export default TagContext;
