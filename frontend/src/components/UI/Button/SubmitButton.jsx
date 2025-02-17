import Button from "./Button";

function SubmitButton({ children }) {
  return (
    <Button
      rounded={"rounded-[8px]"}
      shadow
      extraStyles="bg-gradient-to-r from-red-800 to-red-500"
    >
      {children}
    </Button>
  );
}

export default SubmitButton;
