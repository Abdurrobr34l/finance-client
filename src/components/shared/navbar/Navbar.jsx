import { NavLink } from "react-router";
import { MdOutlineLightMode, MdOutlineDarkMode, MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { PiSignInBold, PiSignOutBold } from "react-icons/pi";
import useTheme from "../../../hooks/useTheme";
import Container from "../Container";
import GetStartedDropdown from "./GetStartedDropdown";
import DropdownMenu from "./DropdownMenu";
import { AuthContext } from "../../../Context/AuthContext";
import { useContext } from "react";
import Logo from "../../ui/Logo";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logOut } = useContext(AuthContext);

  const navigationLinks = [
    { id: 1, path: "/", pathName: "Home" },
    { id: 2, path: "/pricing", pathName: "Pricing" },
    { id: 3, path: "/transactions", pathName: "Transaction" },
    { id: 4, path: "/dashboard", pathName: "Dashboard" },
  ];

  return (
    <header className="bg-base-200">
      <Container className="navbar py-4">
        {/* LEFT SIDE: Logo */}
        <div className="navbar-start">
          <Logo/>
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
          <label className="swap swap-rotate bg-base-300 hover:bg-base-100 p-2 rounded-full transition-colors duration-300 ease-linear cursor-pointer">
            <input
              type="checkbox"
              onChange={toggleTheme}
              checked={theme === "dark"}
            />
            <MdOutlineLightMode className="swap-off h-5 w-5 text-accent" />
            <MdOutlineDarkMode className="swap-on h-5 w-5 text-accent" />
          </label>

          {/* Dropdown Menu */}
          <DropdownMenu />


          {/* Auth Buttons */}
          {user ? (
            <div className="dropdown dropdown-end">
              {/* Avatar */}
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle size-14 avatar border border-accent hover:scale-105 transition"
              >
                <div className="w-14 rounded-full">
                  <img
                    referrerPolicy="no-referrer"
                    src={
                      user?.photoURL ||
                      "https://img.icons8.com/ultraviolet/40/user-male-circle.png"
                    }
                    alt="User Avatar"
                  />
                </div>
              </div>

              {/* Dropdown */}
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-4 w-64 bg-base-200 shadow-xl rounded-2xl p-4 z-50 border border-base-300"
              >
                {/* User Info */}
                <div className="pb-3 mb-3 border-b border-base-300">
                  <h3 className="font-bold text-primary">
                    {user?.displayName || "User"}
                  </h3>

                  <p className="text-xs text-secondary break-all">
                    {user?.email}
                  </p>
                </div>

                {/* Links */}
                <li>
                  <NavLink
                    to="/dashboard"
                    className="font-medium"
                  >
                    Dashboard
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/profile"
                    className="font-medium"
                  >
                    Profile
                  </NavLink>
                </li>

                <div className="divider my-1"></div>

                <li>
                  <button
                    onClick={logOut}
                    className="text-error font-medium"
                  >
                    <PiSignOutBold />
                    Logout
                  </button>
                </li>
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