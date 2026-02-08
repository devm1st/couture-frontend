import { LogOut, Menu } from "lucide-react";
import Button from "../common/Button";
import { useAuth } from "../../hooks/useAuth";

const Header = ({ title = "Dashboard", onMenuClick, showBack = false }) => {
  const { user, logout } = useAuth();

  return (
    <header className="w-full sticky top-0 z-40 border-b border-white/10 bg-[#070118]/60 backdrop-blur-xl">
      <div className="px-4 md:px-6 py-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-xl glass text-gray-200 hover:bg-white/10 hover:border-[#D4AF37]/30 transition"
            aria-label="Open menu"
            type="button"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="min-w-0">
            <h2 className="text-white text-lg font-semibold truncate">{title}</h2>
            <p className="text-xs text-white/45 mt-1 truncate">
              {user?.email || "Admin"}
            </p>
          </div>
        </div>

        <Button variant="secondary" onClick={logout} className="flex items-center gap-2">
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Header;
