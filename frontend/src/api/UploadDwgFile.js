import axios from "axios";

export const UploadDwgFile = async (file) => {
  if (!file) {
    console.error("Nenhum arquivo selecionado.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/upload-file/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Resposta da API:", response.data);
    return { data: response.data, error: null }; // Retorna os dados da API
  } catch (error) {
    console.error("Erro no upload:", error.response?.data || error.message);

    return {
      data: null,
      error:
        error.response?.data?.error || "Erro desconhecido ao enviar arquivo",
    };
  }
};
