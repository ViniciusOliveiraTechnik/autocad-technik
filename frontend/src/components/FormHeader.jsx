function FormHeader(props) {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl md:text-3xl font-medium">{props.title}</h1>
      <div className="w-[120px] h-2 bg-gradient-to-r from-red-800 to-red-500 rounded-lg"></div>
      <p className="text-xl md:text-2xl font-light text-black">{props.paragraph}</p>
    </div>
  );
}

export default FormHeader;
