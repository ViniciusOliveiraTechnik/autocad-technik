import axios from "axios";

export default async function ModifyTags(file_id, tableContent) {
  if (!file_id) return;

  try {
    const jsonData = JSON.stringify({ data: tableContent });

    const response = await axios.post(
      `http://127.0.0.1:8000/api/modify-tags/${file_id}`,
      jsonData,
      {
        headers: {
          "Content-Type": "application/json",
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
