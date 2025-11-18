import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import LeftSideBar from "./LeftSideBar";

const DashboardLayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const closeMobileSidebar = () => setIsMobileSidebarOpen(false);

  return (
    <div className="relative flex min-h-screen bg-slate-50">
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/30 md:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      <LeftSideBar
        isCollapsed={isCollapsed}
        toggleCollapse={() => setIsCollapsed((prev) => !prev)}
        isMobileOpen={isMobileSidebarOpen}
        onMobileLinkClick={closeMobileSidebar}
        onMobileClose={closeMobileSidebar}
      />

      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between px-4 py-4 md:hidden">
          <button
            type="button"
            onClick={() => setIsMobileSidebarOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm"
          >
            <Menu size={18} />
            Menu
          </button>
        </div>
        <div className="flex-1 px-4 pb-10 md:px-6 md:py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
