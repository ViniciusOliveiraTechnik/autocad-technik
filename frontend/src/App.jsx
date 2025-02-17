import ImageContainer from "./components/ImageContainer";
import autocad2016 from "./assets/autocad-bg.png";
import "./App.css";
import { useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Form from "./components/Form";

function App() {
  const [loading, setLoading] = useState(false);

  const handleApiLoading = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/1",
        {
          method: "GET",
        }
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 h-screen w-full xl:h-[90%] xl:w-[90%] shadow-container">
          {/* Contêiner da imagem */}
          <div className="rounded-l-[10px] hidden md:hidden xl:block bg-white">
            <ImageContainer imageUrl={autocad2016} imageAlt={"AutoCAD"} />
          </div>

          {/* Formulário */}
          <div className="bg-gray-200 flex justify-center items-center rounded-r-[10px]">
            <Form handleApiLoading={handleApiLoading} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
