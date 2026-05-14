import { useState } from "react";
import { NavLink } from "react-router";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { PiSignInBold, PiSignOutBold } from "react-icons/pi";

const GetStartedDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="hidden relative lg:block "
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsOpen(false);
        }
      }}
      tabIndex={-1}
    >
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-primary btn-sm md:btn-md flex items-center gap-1"
      >
        Get Started
        <MdOutlineKeyboardArrowDown
          className="text-xl transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {/* Dropdown Menu */}
      <ul
        className="absolute right-0 mt-0 border w-52 bg-base-200 rounded-box p-2 shadow-lg z-50 transition-all duration-300 ease-in-out origin-top"
        style={{
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "translateY(14px)" : "translateY(-40px)",
          visibility: isOpen ? "visible" : "hidden",
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        <li>
          <NavLink
            to="/login"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-base-300 transition-colors"
          >
            <PiSignInBold className="text-lg" />
            Sign In
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/register"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-base-300 transition-colors"
          >
            <PiSignOutBold className="text-lg" />
            Sign Up
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default GetStartedDropdown;