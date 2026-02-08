import clsx from "clsx";

export default function Spinner({ size = "md", className }) {
  const sizes = { sm: "h-4 w-4", md: "h-6 w-6", lg: "h-10 w-10" };

  return (
    <span
      className={clsx(
        "inline-block animate-spin rounded-full border-2 border-white/20 border-t-yellow-400",
        sizes[size],
        className
      )}
    />
  );
}
