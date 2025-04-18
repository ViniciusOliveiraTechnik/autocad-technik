import axios from "axios";

export const FileConnection = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      "http://127.0.0.1:8000/api/recieve-file/",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
