import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayout = ({ title, children, showBack = false }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen text-[#E5E7EB] relative overflow-hidden bg-[#070118]">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[#D4AF37]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-sky-500/10 blur-3xl" />

      <div className="flex relative">
        <Sidebar />

        <Sidebar mobile open={mobileOpen} onClose={() => setMobileOpen(false)} />

        <div className="flex-1 min-w-0">
          <Header
            title={title}
            showBack={showBack}
            onMenuClick={() => setMobileOpen(true)}
          />

          <main className="px-4 md:px-6 py-6">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
