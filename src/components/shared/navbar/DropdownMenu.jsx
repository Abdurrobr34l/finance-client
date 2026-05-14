import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";
import { PiSignInBold } from "react-icons/pi";

const DropdownMenu = ({ user = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const navigationLinks = [
    { id: 1, path: "/", pathName: "Home" },
    { id: 2, path: "/pricing", pathName: "Pricing" },
    { id: 3, path: "/transactions", pathName: "Transaction" },
    { id: 4, path: "/dashboard", pathName: "Dashboard" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <div ref={menuRef} className="relative lg:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="btn btn-ghost p-2 relative w-10 h-10"
        aria-label="menu"
      >
        <span
          className={`absolute h-0.5 w-6 bg-current rounded transition-all duration-300 ${
            isOpen ? "rotate-45" : "-translate-y-2"
          }`}
        />
        <span
          className={`absolute h-0.5 w-6 bg-current rounded transition-all duration-300 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`absolute h-0.5 w-6 bg-current rounded transition-all duration-300 ${
            isOpen ? "-rotate-45" : "translate-y-2"
          }`}
        />
      </button>

      {/* Dropdown */}
      <div
        className={`absolute right-0 top-16 w-56 bg-base-200 rounded-2xl shadow-2xl overflow-hidden z-50 transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] border
          ${
          isOpen
            ? "translate-y-0 opacity-100 scale-100"
            : "-translate-y-6 opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <ul className="menu menu-sm flex gap-2 p-4 w-full">
          {navigationLinks.map(({ id, path, pathName }) => (
            <li key={id}>
              <NavLink to={path} onClick={handleLinkClick}>
                {pathName}
              </NavLink>
            </li>
          ))}

          <div className="divider my-1" />

          {!user && (
            <>
              <li>
                <NavLink to="/login" onClick={handleLinkClick}>
                  <PiSignInBold />
                  Login
                </NavLink>
              </li>

              <li>
                <NavLink to="/register" onClick={handleLinkClick}>
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;