export default function EmptyState({ title, subtitle, action }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
      <p className="text-white font-semibold text-lg">{title}</p>
      {subtitle ? <p className="mt-2 text-white/60">{subtitle}</p> : null}
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  );
}
