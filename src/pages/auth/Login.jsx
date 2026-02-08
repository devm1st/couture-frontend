import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, ArrowRight } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const ok = await login(email, password);

    setLoading(false);
    if (ok) navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-[#070118]">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[#D4AF37]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-sky-500/10 blur-3xl" />

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md glass-strong noise rounded-2xl p-8 shadow-[0_30px_90px_rgba(0,0,0,0.55)]"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[#D4AF37]">Ibrahim Couture</h1>
          <p className="text-white/50 text-sm mt-1">Admin Login</p>
        </div>

        <div className="relative mb-4">
          <User className="absolute left-3 top-3.5 w-5 h-5 text-[#D4AF37]" />
          <input
            type="email"
            placeholder="Email"
            className="w-full pl-10 px-3 py-3 rounded-xl glass text-white placeholder:text-white/35 border border-white/10
                       focus:ring-2 focus:ring-[#D4AF37]/60 outline-none transition shadow-[0_12px_40px_rgba(0,0,0,0.25)]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="relative mb-6">
          <Lock className="absolute left-3 top-3.5 w-5 h-5 text-[#D4AF37]" />
          <input
            type="password"
            placeholder="Password"
            className="w-full pl-10 px-3 py-3 rounded-xl glass text-white placeholder:text-white/35 border border-white/10
                       focus:ring-2 focus:ring-[#D4AF37]/60 outline-none transition shadow-[0_12px_40px_rgba(0,0,0,0.25)]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#E6C35C] text-black font-semibold py-3 rounded-xl transition
                     disabled:opacity-60 shadow-[0_10px_30px_rgba(212,175,55,0.18)] active:translate-y-[1px]"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <span className="h-4 w-4 rounded-full border-2 border-black/25 border-t-black/70 animate-spin" />
              Logging in...
            </span>
          ) : (
            <>
              Login <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <p className="text-center text-xs text-white/35 mt-5">
          Secure access • Luxury theme
        </p>
      </form>
    </div>
  );
};

export default Login;
