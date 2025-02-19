function Button({ extraStyles = "", children, ...props }) {
  return (
    <button
      className={`h-12 md:h-15 w-[50%] rounded-[8px] cursor-pointer ${extraStyles}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
