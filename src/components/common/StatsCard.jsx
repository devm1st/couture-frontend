import { Card, CardContent } from "./Card";

export default function StatsCard({ label, value, icon, hint }) {
  return (
    <Card className="h-full">
      <CardContent className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-white/55">{label}</p>
          <p className="mt-1 text-3xl font-semibold text-white">{value}</p>
          {hint ? <p className="mt-2 text-xs text-white/45">{hint}</p> : null}
        </div>

        {icon ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-yellow-300">
            {icon}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
