export default function Input({ type = "text", spanText, ...props }) {
  return (
    <div className="flex items-center gap-3">
      {spanText && (
        <span className="bg-gray-100 p-2 rounded-md text-sm font-medium text-gray-400">
          {spanText}
        </span>
      )}
      <input
        className="w-full h-12 px-4 bg-white border-b text-gray-600 border-gray-400 outline-0 text-[14px] md:text-[16px] focus:bg-sky-50 transition-all"
        type={type}
        {...props}
      />
    </div>
  );
}
