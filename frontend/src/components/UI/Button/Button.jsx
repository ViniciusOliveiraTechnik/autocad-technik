function Button({
  children,
  type = "button",
  bgColor,
  border,
  textColor,
  rounded,
  full,
  shadow,
  extraStyles = "",
}) {
  return (
    <button
      type={type}
      className={`
        ${bgColor || "bg-blue-500"}
        ${border || ""}
        ${textColor || "text-white"}
        ${rounded || "rounded-md"}
        ${full ? "w-full" : "w-[50%]"}
        ${shadow ? "shadow-md" : "shadow-none"}
        px-4 py-2 font-semibold transition hover:opacity-[85%] cursor-pointer h-12 md:h-15
        ${extraStyles}
      `}
    >
      {children}
    </button>
  );
}

export default Button;
