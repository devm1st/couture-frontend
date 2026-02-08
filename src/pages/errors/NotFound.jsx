import { Link } from "react-router-dom";
import { Home, TriangleAlert } from "lucide-react";
import Button from "../../components/common/Button";

const NotFound = () => {
  return (
    <div className="min-h-screen text-[#E5E7EB] flex items-center justify-center px-4 relative overflow-hidden bg-[#070118]">
      {/* glow */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[#D4AF37]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-sky-500/10 blur-3xl" />

      <div className="w-full max-w-lg glass-strong noise border-white/10 rounded-2xl p-8 shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-2xl glass border-white/10 flex items-center justify-center">
            <TriangleAlert className="w-6 h-6 text-[#D4AF37]" />
          </div>

          <div className="min-w-0">
            <h1 className="text-4xl font-bold text-white leading-none">404</h1>
            <p className="text-white/55 mt-2">This page doesn’t exist.</p>

            <div className="mt-6">
              <Link to="/">
                <Button>
                  <Home className="w-4 h-4" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>

            <p className="text-xs text-white/35 mt-5">
              If you think this is a bug, check the URL or go home.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
