export default function StatusIndicatorPing({ pingEffect }) {
  const pingCondition = {
    color: {
      success: "bg-primary-blue",
      fail: "bg-primary-red",
      neutral: "bg-slate-400",
    },

    effect: {
      success: "bg-primary-blue/50 animate-ping",
      fail: "bg-primary-red/50 animate-ping",
      neutral: "bg-slate-300",
    },
  };

  return (
    <span className="relative flex size-3 md:size-4">
      <span
        className={`ping-effect ${pingCondition["effect"][pingEffect]}`}
      ></span>
      <span
        className={`ping ${pingCondition["color"][pingEffect]}`}
      ></span>
    </span>
  );
}
