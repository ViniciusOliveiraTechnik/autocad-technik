function Form({ children, extraStyles="" }) {
  return (
    <form className={`flex gap-5 flex-col text-[16px] md:text-[20px] ${extraStyles}`}>
      {children}
    </form>
  );
}

export default Form;
