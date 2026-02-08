import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, X } from "lucide-react";

const linkBase =
  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm";
const linkInactive =
  "text-white/70 hover:text-white hover:bg-white/5";
const linkActive =
  "text-white glass border-[#D4AF37]/25 shadow-[0_12px_40px_rgba(0,0,0,0.35)]";

const NavItems = ({ onNavigate }) => (
  <nav className="p-4 flex-1">
    <NavLink
      to="/"
      end
      onClick={onNavigate}
      className={({ isActive }) =>
        `${linkBase} ${isActive ? linkActive : linkInactive}`
      }
    >
      <LayoutDashboard className="w-5 h-5 text-[#D4AF37]" />
      Dashboard
    </NavLink>

    <NavLink
      to="/customers"
      onClick={onNavigate}
      className={({ isActive }) =>
        `${linkBase} mt-2 ${isActive ? linkActive : linkInactive}`
      }
    >
      <Users className="w-5 h-5 text-[#D4AF37]" />
      Customers
    </NavLink>
  </nav>
);

const Sidebar = ({ mobile = false, open = false, onClose }) => {
  if (!mobile) {
    return (
      <aside className="hidden md:flex md:flex-col w-64 h-screen border-r border-white/10 bg-[#070118]/70 backdrop-blur-xl">
        <div className="p-5 border-b border-white/10">
          <h1 className="text-lg font-semibold text-white">Ibrahim Couture</h1>
          <p className="text-xs text-white/45 mt-1">Couture Management</p>
        </div>

        <NavItems />

        <div className="p-4 border-t border-white/10">
          <div className="text-xs text-white/35">Luxury theme • MVP</div>
        </div>
      </aside>
    );
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      <aside className="absolute left-0 top-0 h-full w-72 bg-[#070118]/70 backdrop-blur-xl border-r border-white/10 flex flex-col">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-white">Ibrahim Couture</h1>
            <p className="text-xs text-white/45 mt-1">Couture Management</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl glass text-gray-200 hover:bg-white/10 hover:border-[#D4AF37]/30 transition"
            aria-label="Close menu"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <NavItems onNavigate={onClose} />

        <div className="p-4 border-t border-white/10">
          <div className="text-xs text-white/35">Luxury theme • MVP</div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
