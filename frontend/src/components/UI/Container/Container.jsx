function Container({ children, shadow, rounded, extraStyles = "" }) {
  return (
    <div
      className={`${extraStyles} ${shadow ? "shadow-md" : ""} ${
        rounded ? "rounded-[8px]" : ""
      }`}
    >
      {children}
    </div>
  );
}

export default Container;
