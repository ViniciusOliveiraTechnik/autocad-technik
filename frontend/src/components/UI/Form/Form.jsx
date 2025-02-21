function Form({ children, extraStyles = "", ...props }) {
  return (
    <form
      className={`flex gap-5 flex-col text-[16px] md:text-[20px] ${extraStyles}`}
      {...props}
    >
      {children}
    </form>
  );
}

export default Form;
