import Button from "./Button";

function SubmitButton({ children, onClick }) {
  return (
    <Button
      extraStyles="bg-gradient-to-r from-red-800 to-red-500 text-white shadow-md"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default SubmitButton;
