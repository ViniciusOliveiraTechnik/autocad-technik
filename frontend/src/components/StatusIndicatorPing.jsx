export default function StatusIndicatorPing({ pingEffect }) {
  const pingCondition = {
    color: {
      success: "bg-sky-500",
      fail: "bg-red-500",
      neutral: "bg-slate-400",
    },

    effect: {
      success: "bg-sky-500/50 animate-ping",
      fail: "bg-red-500/50 animate-ping",
      neutral: "bg-slate-300",
    },
  };

  return (
    <span className="relative flex size-3 md:size-4">
      <span
        className={`ping-effect ${pingCondition["effect"][pingEffect]}`}
      ></span>
      <span className={`ping ${pingCondition["color"][pingEffect]}`}></span>
    </span>
  );
}
