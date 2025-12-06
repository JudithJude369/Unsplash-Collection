import { Navbar } from "@/components";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div>
      <Navbar />
      <main className="bg-[#FFFFFF] font-display ">
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;
