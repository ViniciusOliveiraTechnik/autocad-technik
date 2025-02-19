import FileUploadButton from "./UI/Button/FileUploadButton";
import Container from "./UI/Container/Container";
import Title from "./UI/Title/Title";
import Subtitle from "./UI/Title/Subtitle";
import Form from "./UI/Form/Form";
import Input from "./UI/Input/Input";
import { useState } from "react";
import Button from "./UI/Button/Button";
import FormSubmitContainer from "./UI/Container/FormSubmitContainer";
import SubmitButton from "./UI/Button/SubmitButton";

function MainForm() {
  const [filename, setFilename] = useState("");
  const [file, setFile] = useState();
  const [error, setError] = useState("");

  const handleSelectedFile = (e) => {
    setFilename(e.target.files[0].name);
    setFile(e.target.files[0]);
  };

  const handleCancel = () => {
    setFile(null);
    setFilename("");
    setError("");
  };

  const handleUpload = () => {
    if (!file) {
      setError("Selecione um arquivo");
      return;
    }

    console.log(file);
  };

  return (
    <Container
      flex
      padding="p-6"
      rounded
      shadow
      extraStyles="w-[90%] h-[60%] md:w-[60%] md:h-[65%]"
    >
      <Container>
        <Title>Extração de TAGs</Title>
        <Subtitle>Selecione um arquivo para extrair</Subtitle>
      </Container>

      <Form extraStyles="h-full justify-between py-4">
        <Container flex justifyCenter>
          <FileUploadButton onChange={handleSelectedFile} />
          <Input
            placeholder="Arquivo selecionado"
            type="text"
            value={filename}
          />

          {error && <p className="text-red-600">{error}</p> }
        </Container>

        <FormSubmitContainer>
          <Button
            textColor={"text-red-500"}
            bgColor={"bg-white"}
            border={"border-1 border-red-500"}
            rounded={"rounded-[8px]"}
            shadow
            onClick={handleCancel}
          >
            Cancelar
          </Button>

          <SubmitButton onClick={handleUpload}>Extrair</SubmitButton>
        </FormSubmitContainer>
      </Form>
    </Container>
  );
}

export default MainForm;
