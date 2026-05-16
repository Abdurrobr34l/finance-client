import React, { useContext, useState } from "react";
import { NavLink, Outlet } from "react-router";
import { FaHome, FaExchangeAlt, FaUser } from "react-icons/fa";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
import { PiSignOutBold } from "react-icons/pi";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { AuthContext } from "../Context/AuthContext";
import Logo from "../components/ui/Logo";
import useTheme from "../hooks/useTheme";

const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const dashboardLinks = [
    { name: "Overview", icon: <FaHome />, path: "/dashboard/overiew" },
    { name: "Transactions", icon: <FaExchangeAlt />, path: "/dashboard/transaction" },
    { name: "Profile", icon: <FaUser />, path: "/dashboard/profile" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-base-100">

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static z-50 h-full
          bg-base-200 border-r border-base-300
          transition-all duration-300
          ${mobileOpen ? "left-0" : "-left-full"}
          lg:left-0
          ${collapsed ? "w-19.5" : "w-62.5"}
        `}
      >
        <div className="flex flex-col h-full p-4">

          {/* Logo row */}
          <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"} mb-8`}>
            {!collapsed && (
              <h2 className="flex items-center gap-2 font-bold text-lg">
                <Logo customCss={"size-10!"} /> Wealthwise
              </h2>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex btn btn-ghost btn-circle text-accent"
            >
              {collapsed ? <RiMenuUnfoldLine size={22} /> : <RiMenuFoldLine size={22} />}
            </button>
          </div>

          {/* Mobile close */}
          <button
            onClick={() => setMobileOpen(false)}
            className="btn btn-circle btn-sm absolute top-3 right-6 lg:hidden"
          >
            ✕
          </button>

          {/* Nav links */}
          <ul className="space-y-2 flex-1 mt-3!">
            {!collapsed && (
              <p className="text-xs uppercase text-secondary px-4 mb-3">Navigation</p>
            )}
            {dashboardLinks.map((item) => (
              <li key={item.name}>
                <NavLink
                  end={item.path === "/dashboard"}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                    ${isActive
                      ? "bg-accent text-white"
                      : "text-secondary hover:text-accent hover:bg-base-300"
                    }`
                  }
                >
                  <span className="text-lg">{item.icon}</span>
                  {!collapsed && <span className="font-medium">{item.name}</span>}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Logout */}
          <div className="border-t border-base-300 pt-4">
            <button
              onClick={logOut}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-error hover:bg-error/10 transition"
            >
              <PiSignOutBold size={18} />
              {!collapsed && <span>Logout</span>}
            </button>
          </div>

        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Topbar */}
        <header className="h-16 border-b border-base-300 bg-base-200 px-6 flex items-center justify-between">

          {/* Left */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="btn btn-circle btn-ghost lg:hidden"
            >
              <RiMenuUnfoldLine size={22} />
            </button>
            <h1 className="text-xl font-bold text-primary">Dashboard</h1>
          </div>

          {/* Right — theme toggle always visible, text hidden on mobile */}
          <div className="flex items-center gap-3">

            {/* Theme toggle — flex-shrink-0 ensures it never gets squished */}
            <label className="swap swap-rotate shrink-0 bg-base-300 hover:bg-base-100 p-2 rounded-full transition-colors duration-300 ease-linear cursor-pointer">
              <input
                type="checkbox"
                onChange={toggleTheme}
                checked={theme === "dark"}
              />
              <MdOutlineLightMode className="swap-off h-5 w-5 text-accent" />
              <MdOutlineDarkMode className="swap-on h-5 w-5 text-accent" />
            </label>

            {/* User text — hidden on small screens */}
            <div className="hidden sm:block text-right">
              <h3 className="text-sm font-semibold text-primary leading-tight">
                {user?.displayName || "User"}
              </h3>
              <p className="text-xs text-secondary truncate max-w-45">
                {user?.email}
              </p>
            </div>

            {/* Avatar — always visible */}
            <div className="avatar shrink-0">
              <div className="w-11 rounded-full border-2 border-accent shadow-md">
                <img
                  src={user?.photoURL || "https://img.icons8.com/ultraviolet/40/user-male-circle.png"}
                  alt="user"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default Dashboard;