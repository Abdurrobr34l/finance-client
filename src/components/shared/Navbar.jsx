import { NavLink } from "react-router";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { PiSignInBold, PiSignOutBold } from "react-icons/pi";
import useTheme from "../../hooks/useTheme";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  const navigationLinks = [
    { id: 1, path: "/", pathName: "Home" },
    { id: 2, path: "/pricing", pathName: "Pricing" },
    { id: 3, path: "/transactions", pathName: "Transaction" },
    { id: 4, path: "/dashboard", pathName: "Dashboard" },
  ];

  const user = null;

  return (
    <header className="navbar bg-base-100 shadow-sm px-4 py-4 md:px-8">
      {/* LEFT SIDE: Logo */}
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost p-0 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-200 rounded-box mt-3 w-52 p-2 shadow-lg z-50">
            {navigationLinks.map(({ id, path, pathName }) => (
              <li key={id}>
                <NavLink to={path}>{pathName}</NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-xl font-bold text-primary">WealthWise</div>
      </div>

      {/* MIDDLE: Desktop Navigation */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 px-1">
          {navigationLinks.map(({ id, path, pathName }) => (
            <li key={id}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md transition-colors ${isActive ? "text-accent font-bold" : "hover:text-accent"}`
                }
              >
                {pathName}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT SIDE */}
      <div className="navbar-end gap-4">

        {/* 🌗 Theme Toggle */}
        <label className="swap swap-rotate hover:bg-base-300 p-2 rounded-full transition-colors cursor-pointer">
          <input
            type="checkbox"
            onChange={toggleTheme}
            checked={theme === "dark"}  // ← controlled, not defaultChecked
          />
          <MdOutlineLightMode className="swap-off h-5 w-5 text-warning" />
          <MdOutlineDarkMode className="swap-on h-5 w-5 text-accent" />
        </label>

        {/* Auth Buttons */}
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border border-accent">
              <div className="w-10 rounded-full">
                <img alt="User Profile" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-200 rounded-box mt-3 w-52 p-2 shadow-lg z-50">
              <li><NavLink to="/dashboard">Dashboard</NavLink></li>
              <li><NavLink to="/settings">Settings</NavLink></li>
              <li className="text-error"><a>Logout</a></li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <NavLink to="/login" className="btn btn-primary btn-sm md:btn-md gap-2">
              <PiSignInBold className="text-xl" />
              <span className="hidden sm:inline">Login</span>
            </NavLink>
            <NavLink to="/register" className="btn btn-outline btn-accent btn-sm md:btn-md gap-2">
              <PiSignOutBold className="text-xl" />
              <span className="hidden sm:inline">Sign Up</span>
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;