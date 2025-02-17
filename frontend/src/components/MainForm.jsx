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
  const [selectedFile, setSelectedFile] = useState();

  const handleSelectedFile = (e) => {
    setSelectedFile(e.target.files[0].name);
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
            value={selectedFile}
          />
        </Container>

        <FormSubmitContainer>
          <Button
            textColor={"text-red-500"}
            bgColor={"bg-white"}
            border={"border-1 border-red-500"}
            rounded={"rounded-[8px]"}
            shadow
          >
            Cancelar
          </Button>

          <SubmitButton>Extrair</SubmitButton>
        </FormSubmitContainer>
      </Form>
    </Container>
  );
}

export default MainForm;
