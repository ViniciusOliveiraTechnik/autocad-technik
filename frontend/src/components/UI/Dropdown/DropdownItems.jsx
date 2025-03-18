export default function DropdownItems() {
  return (
    <div
      className={`w-full bg-white rounded mt-1 overflow-hidden transition-all origin-top text-slate-800 ease-in-out ${
        isActive
          ? "scale-y-100 opacity-100 max-h-[300px] overflow-y-auto"
          : "scale-y-0 opacity-0 max-h-0"
      }`}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-3 px-3 py-2 border-b last:border-none hover:bg-gray-100 transition-colors cursor-pointer"
          onClick={() => {
            setActiveApplication(item);
            setIsActive(false);
          }}
        >
          {item.icon}
          <div>
            <h1 className="text-[14px] font-semibold">{item.title}</h1>
            <p className="text-[12px] text-gray-500">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
