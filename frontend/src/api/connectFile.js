import axios from "axios";

export const connectFile = async (file) => {
  // if (!file) {
  //   return { error: "Nenhum arquivo selecionado" };
  // }
  console.log("Called");
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      "http://127.0.0.1:8000/api/connect-file/",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log('Erro da api', error);
    return error.response?.data.error || "Erro ao conectar o arquivo";
  }
};
