import axios from "axios";

export default async function ExtractTags(file_id) {
  if (!file_id) return;

  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/extract-tags/${file_id}`,
      {},
      {
        headers: {
          "Content-Type": "application.json",
        },
      }
    );
    
    return response.data;

  } catch (error) {
    return error.response
      ? error.response.data
      : { error: "Erro desconhecido" };
  }
}
