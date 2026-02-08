import clsx from "clsx";

const Button = ({ children, variant = "primary", className, loading, ...props }) => {
  const base =
    "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 " +
    "focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/70 disabled:opacity-50 disabled:cursor-not-allowed " +
    "active:translate-y-[1px]";

  const variants = {
    primary:
      "bg-[#D4AF37] text-black hover:bg-[#E6C35C] shadow-[0_10px_30px_rgba(212,175,55,0.18)]",
    secondary:
      "glass text-white hover:border-[#D4AF37]/40 hover:bg-white/10",
    danger:
      "bg-red-500 text-white hover:bg-red-600",
    ghost:
      "text-gray-300 hover:text-white hover:bg-white/5",
  };

  return (
    <button
      className={clsx(base, variants[variant], className)}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white/80 animate-spin" />
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
