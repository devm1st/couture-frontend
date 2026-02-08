const Input = ({ label, name, type = "text", className, ...props }) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-medium text-white/60">
          {label}
        </label>
      )}

      <input
        name={name}
        type={type}
        className={`
          glass
          rounded-xl
          px-3 py-2.5
          text-white
          placeholder:text-white/35
          outline-none
          focus:ring-2 focus:ring-[#D4AF37]/60
          focus:border-[#D4AF37]/40
          transition-all
          shadow-[0_12px_40px_rgba(0,0,0,0.25)]
          ${className || ""}
        `}
        {...props}
      />
    </div>
  );
};

export default Input;
