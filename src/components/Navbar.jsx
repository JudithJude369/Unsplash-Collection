import logo from "@/assets/images/Logo.svg";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className=" bg-[#FFFFFF] font-display flex justify-between px-8 py-4 shadow items-center backdrop-blur-md fixed top-0 left-0 w-full z-50">
      <img src={logo} alt="company-logo" />
      <div className="flex  text-[#6C727F] items-center">
        <NavLink
          to="/"
          className="hover:bg-[#E5E7EB] text-center px-3.5 py-2 rounded-md hover:text-[#121826]"
        >
          Home
        </NavLink>
        <NavLink
          to="/collections"
          className="hover:bg-[#E5E7EB] text-center px-3.5 py-2 rounded-md hover:text-[#121826]"
        >
          Collections
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
