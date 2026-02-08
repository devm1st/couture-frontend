import Spinner from "../common/Spinner";

export default function Loader({ label = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-14">
      <div className="glass rounded-2xl px-6 py-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        <div className="flex items-center gap-3">
          <Spinner size="lg" />
          <div className="min-w-0">
            <p className="text-sm text-white/80 font-medium">{label}</p>
            <p className="text-xs text-white/45 mt-0.5">
              Please wait a moment…
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
