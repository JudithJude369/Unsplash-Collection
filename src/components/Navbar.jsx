import logo from "@/assets/images/Logo.svg";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      aria-label="Main Navigation"
      className="bg-white/80 backdrop-blur-md font-display flex justify-between items-center p-4 shadow fixed top-0 left-0 w-full z-50"
    >
      <img src={logo} alt="company-logo" className="h-8" />

      <div className="flex items-center gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-3.5 py-2 rounded-md text-center ${
              isActive ? "bg-[#E5E7EB] text-[#121826]" : "text-[#6C727F]"
            } hover:bg-[#E5E7EB] hover:text-[#121826] transition-colors duration-200`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/collections"
          className={({ isActive }) =>
            `px-3.5 py-2 rounded-md text-center ${
              isActive ? "bg-[#E5E7EB] text-[#121826]" : "text-[#6C727F]"
            } hover:bg-[#E5E7EB] hover:text-[#121826] transition-colors duration-200`
          }
        >
          Collections
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
