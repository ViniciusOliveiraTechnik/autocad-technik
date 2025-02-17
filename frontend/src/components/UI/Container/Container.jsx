function Container({
  children,
  itemsCenter,
  justifyCenter,
  flex,
  shadow,
  bgColor,
  rounded,
  padding,
  extraStyles = "",
}) {
  return (
    <div
      className={`
        ${rounded ? "rounded-[8px]" : ""}
        ${flex ? "flex flex-col gap-3" : ""}
        ${itemsCenter ? "items-center" : ""}
        ${justifyCenter ? "justify-center" : ""}
        ${bgColor || "bg-white"}
        ${shadow ? "shadow-lg" : "shadow-none"}
        ${padding || ""}
        ${extraStyles}
      `}
    >
      {children}
    </div>
  );
}

export default Container;
