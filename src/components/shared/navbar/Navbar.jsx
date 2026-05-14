import { NavLink } from "react-router";
import { MdOutlineLightMode, MdOutlineDarkMode, MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { PiSignInBold, PiSignOutBold } from "react-icons/pi";
import useTheme from "../../../hooks/useTheme";
import Container from "../Container";
import GetStartedDropdown from "./GetStartedDropdown";
import DropdownMenu from "./DropdownMenu";

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
    <header className="bg-base-200">
      <Container className="navbar">
        {/* LEFT SIDE: Logo */}
        <div className="navbar-start">
          <div className="text-xl font-bold text-primary">WealthWise</div>
        </div>

        {/* MIDDLE: Desktop Navigation */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-4 px-1">
            {navigationLinks.map(({ id, path, pathName }) => (
              <li key={id}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "nav-link-active" : "nav-link-inactive"
                    }`
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
          {/* Theme Toggle */}
          <label className="swap swap-rotate hover:bg-base-300 p-2 rounded-full transition-colors cursor-pointer">
            <input
              type="checkbox"
              onChange={toggleTheme}
              checked={theme === "dark"}
            />
            <MdOutlineLightMode className="swap-off h-5 w-5 text-warning" />
            <MdOutlineDarkMode className="swap-on h-5 w-5 text-accent" />
          </label>

          {/* Dropdown Menu */}
          <DropdownMenu />


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
            <GetStartedDropdown />
          )}
        </div>
      </Container>
    </header>
  );
};

export default Navbar;