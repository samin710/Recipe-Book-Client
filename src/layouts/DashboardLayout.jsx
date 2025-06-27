import React, { use } from "react";
import { Link, NavLink, Outlet } from "react-router";
import logImg from "../assets/logo.png";
import { AuthContext } from "../providers/AuthContext";
import { toast } from "react-toastify";

const DashboardLayout = () => {
  const { logout } = use(AuthContext);

  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success("Successfully signed out");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  // Shared navlink styles
  const navLinkClass = ({ isActive }) =>
    `btn text-left justify-start font-medium w-full transition-all duration-300 ${
      isActive
        ? "bg-primary text-white"
        : "text-primary border-l-4 border-transparent hover:border-primary hover:bg-base-300"
    }`;

  return (
    <div className="drawer lg:drawer-open max-w-11/12 md:max-w-10/11 mx-auto">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Content Area */}
      <div className="drawer-content flex flex-col min-h-screen">
        {/* Mobile Navbar */}
        <div className="navbar shadow-lg shadow-secondary lg:hidden px-4 sticky top-0 items-center mt-3">
          <div className="flex-none ">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <img src={logImg} alt="Logo" className="w-12 h-12 rounded-md" />
          <div className="text-xl font-semibold ml-4">Dashboard</div>
        </div>

        {/* Main Content */}
        <main className="p-4 flex-grow">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-40">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <aside className="menu bg-secondary p-4 text-base-content min-h-full space-y-4 shadow-md ">
          {/* Logo & Title */}
          <Link to={"/dashBoard"}>
            {" "}
            <div className="flex items-center justify-center gap-3 mb-4 border border-primary md:p-4 p-2 rounded-2xl">
              <img src={logImg} alt="Logo" className="w-12 h-12 rounded-md" />
              <span className="text-2xl font-bold hidden md:inline-block">
                Recipe Book App
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <ul className="space-y-2">
            <li>
              <NavLink to="/dashBoard" end className={navLinkClass}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashBoard/dashboardAllRecipes"
                className={navLinkClass}
              >
                All Recipes
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashBoard/addRecipe" className={navLinkClass}>
                Add Recipe
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashBoard/dashboardMyRecipes"
                className={navLinkClass}
              >
                My Recipes
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashBoard/aboutUs" className={navLinkClass}>
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashBoard/support" className={navLinkClass}>
                Support
              </NavLink>
            </li>
          </ul>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="btn btn-outline btn-primary w-full mt-6 hover:bg-primary hover:text-white transition"
          >
            Logout
          </button>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
