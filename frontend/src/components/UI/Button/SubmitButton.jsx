import Button from "./Button";

function SubmitButton({ children, onClick }) {
  return (
    <Button
      rounded={"rounded-[8px]"}
      shadow
      extraStyles="bg-gradient-to-r from-red-800 to-red-500"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default SubmitButton;
