import clsx from "clsx";

export const Table = ({ className, children }) => (
  <div className="w-full overflow-x-auto rounded-2xl border border-white/10">
    <table
      className={clsx(
        "min-w-full text-sm text-white/85",
        className
      )}
    >
      {children}
    </table>
  </div>
);

export const THead = ({ children }) => (
  <thead className="bg-white/5 text-white/70">{children}</thead>
);

export const TR = ({ children, className }) => (
  <tr className={clsx("border-b border-white/10", className)}>{children}</tr>
);

export const TH = ({ children, className }) => (
  <th className={clsx("px-4 py-3 text-left font-semibold", className)}>
    {children}
  </th>
);

export const TD = ({ children, className }) => (
  <td className={clsx("px-4 py-3", className)}>{children}</td>
);

export const EmptyState = ({ title = "No data", subtitle, action }) => (
  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
    <p className="text-white font-semibold">{title}</p>
    {subtitle ? <p className="text-white/60 mt-1">{subtitle}</p> : null}
    {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
  </div>
);
