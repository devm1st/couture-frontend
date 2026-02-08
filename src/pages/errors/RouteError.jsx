import { useRouteError, Link } from "react-router-dom";
import { Home, Users, Bug } from "lucide-react";
import Button from "../../components/common/Button";

const RouteError = () => {
  const error = useRouteError();

  const title =
    error?.status === 404 ? "Page Not Found" : "Something went wrong";
  const message =
    error?.statusText || error?.message || "An unexpected error occurred.";

  return (
    <div className="min-h-screen text-[#E5E7EB] flex items-center justify-center px-4 relative overflow-hidden bg-[#070118]">
      {/* glow */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[#D4AF37]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-sky-500/10 blur-3xl" />

      <div className="w-full max-w-lg glass-strong noise border-white/10 rounded-2xl p-8 shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-2xl glass border-white/10 flex items-center justify-center">
            <Bug className="w-6 h-6 text-[#D4AF37]" />
          </div>

          <div className="min-w-0 w-full">
            <h1 className="text-2xl font-semibold text-white">{title}</h1>

            <p className="text-white/55 text-sm mt-2">{message}</p>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Link to="/">
                <Button className="w-full sm:w-auto">
                  <Home className="w-4 h-4" />
                  Go Home
                </Button>
              </Link>
              <Link to="/customers">
                <Button className="w-full sm:w-auto" variant="secondary">
                  <Users className="w-4 h-4" />
                  Customers
                </Button>
              </Link>
            </div>

            {import.meta.env.DEV && error && (
              <pre className="mt-6 text-xs text-white/60 bg-black/30 border border-white/10 rounded-2xl p-4 overflow-auto">
                {JSON.stringify(error, null, 2)}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteError;
