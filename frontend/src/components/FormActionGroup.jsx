function FormActionGroup({ buttons }) {
  return (
    <div className="flex flex-row gap-4">
      {buttons.map(({ text, onClick, style }, index) => (
        <button
          className={`p-4 w-[50%] text-xl md:text-2xl font-semibold cursor-pointer drop-shadow-lg rounded-lg ${style}`}
          key={index}
          onClick={onClick}
        >
          {text}
        </button>
      ))}
    </div>
  );
}

export default FormActionGroup;
