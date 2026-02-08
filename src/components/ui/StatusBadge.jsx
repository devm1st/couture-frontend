import clsx from "clsx";

const StatusBadge = ({ status }) => {
  const styles = {
    pending:
      "bg-white/5 text-gray-200 border-white/10",
    in_progress:
      "bg-[#D4AF37]/15 text-[#F6E7A6] border-[#D4AF37]/30",
    ready:
      "bg-emerald-500/15 text-emerald-200 border-emerald-500/30",
    collected:
      "bg-sky-500/15 text-sky-200 border-sky-500/30",
  };

  const dots = {
    pending: "bg-gray-400",
    in_progress: "bg-[#D4AF37]",
    ready: "bg-emerald-400",
    collected: "bg-sky-400",
  };

  const v = status || "pending";

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs capitalize border backdrop-blur-md",
        styles[v] || "bg-white/5 text-gray-200 border-white/10"
      )}
    >
      <span
        className={clsx(
          "h-1.5 w-1.5 rounded-full",
          dots[v] || "bg-gray-400"
        )}
      />
      {v}
    </span>
  );
};

export default StatusBadge;
