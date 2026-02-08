import Button from "./Button";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="glass-strong noise rounded-2xl p-6 w-full max-w-md shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-white text-lg font-semibold">{title}</h2>
            <p className="text-xs text-white/45 mt-1">Manage details below</p>
          </div>

          <Button variant="ghost" onClick={onClose} className="rounded-xl">
            ✕
          </Button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
