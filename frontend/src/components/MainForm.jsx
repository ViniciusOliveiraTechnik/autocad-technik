import FileUploadButton from "./UI/Button/FileUploadButton";
import Container from "./UI/Container/Container";
import Title from "./UI/Title/Title";
import Subtitle from "./UI/Title/Subtitle";
import Input from "./UI/Input/Input";
import { useRef, useState } from "react";
import Button from "./UI/Button/Button";
import SubmitButton from "./UI/Button/SubmitButton";
import { UploadDwgFile } from "../api/UploadDwgFile";
import { UploadCloud } from "lucide-react";

function MainForm() {
  const fileInputRef = useRef(null);

  const [errors, setErrors] = useState(null);
  const [tags, setTags] = useState([]);
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFile = (event) => {
    if (!event.target.files) {
      return;
    }

    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFilename(selectedFile.name);
  };

  const handleExtract = async () => {
    if (!file) {
      alert("Por favor, selecione um arquivo primeiro.");
      return;
    }

    setIsExtracting(true);
    setErrors(null)
    setTags([])

    const response = await UploadDwgFile(file);

    if (!response.data) {
      setErrors(response.error);
    } else {
      setTags(response.data);
    }

    setIsExtracting(false);
  };

  return (
    <Container
      shadow
      rounded
      extraStyles="bg-white w-[90%] md:w-[80%] h-[50%] p-[25px] flex flex-col gap-3"
    >
      <Container>
        <Title>Extração de Tags</Title>
        <Subtitle>Selecione um arquivo para extrair</Subtitle>
      </Container>

      <Container extraStyles="w-full h-full flex flex-col justify-between gap-4 text-[16px] md:text-[18px]">
        <Container extraStyles="flex flex-col gap-3">
          <Button
            extraStyles="bg-red-200 flex flex-row items-center justify-center gap-3 bg-gradient-to-r from-red-800 to-red-500 text-white w-full"
            onClick={handleFileUploadClick}
          >
            <UploadCloud />
            Selecionar arquivo
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFile}
          />
          <Input placeholder="Arquivo selecionado" readOnly value={filename} />
          {errors && <p>{errors}</p>}
        </Container>

        <Container extraStyles="flex gap-3">
          <Button
            extraStyles="bg-red-200 flex flex-row items-center justify-center gap-3 bg-gradient-to-r from-red-800 to-red-500 text-white w-full"
            onClick={handleExtract}
            disabled={isExtracting}
          >
            {isExtracting ? <p className="animate-spin"></p> : <p className="animate-spin"></p>}
          </Button>
          
        </Container>
      </Container>
    </Container>
  );
}

export default MainForm;
