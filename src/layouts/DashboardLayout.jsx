import React, { use } from "react";
import { NavLink, Outlet } from "react-router";
import logImg from "../assets/logo.png";
import { AuthContext } from "../providers/AuthContext";
import { toast } from "react-toastify";

const DashboardLayout = () => {
  const { logout } = use(AuthContext);
  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success("Successfully SignOut");
      })
      .catch((error) => {
        console.log(error.massage);
      });
  };

  return (
    <div className="drawer lg:drawer-open max-w-11/12 md:max-w-10/11 mx-auto">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none ">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
        </div>
        {/* Page content here */}
        <Outlet></Outlet>
        {/* Page content here */}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <div className="flex items-center gap-2">
            <div className="md:w-12 w-10">
              <img
                src={logImg}
                alt="Logo"
                className="w-full rounded-md mx-auto mb-2"
              />
            </div>
            <a className="hidden md:block text-xl md:text-2xl">
              Recipe Book App
            </a>
          </div>
          <li>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? "bg-primary text-white font-medium btn duration-1000 ease-in-out transition-colors"
                  : "border-b-4 border-b-primary border-secondary text-primary font-medium btn duration-1000 ease-in-out transition-colors"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashBoard/dashboardAllRecipes"}
              className={({ isActive }) =>
                isActive
                  ? "bg-primary text-white font-medium btn duration-1000 ease-in-out transition-colors"
                  : "border-b-4 border-b-primary border-secondary text-primary font-medium btn duration-1000 ease-in-out transition-colors"
              }
            >
              All Recipes
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashBoard/addRecipe"}
              className={({ isActive }) =>
                isActive
                  ? "bg-primary text-white font-medium btn duration-1000 ease-in-out transition-colors"
                  : "border-b-4 border-b-primary border-secondary text-primary font-medium btn duration-1000 ease-in-out transition-colors"
              }
            >
              Add Recipe
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashBoard/dashboardMyRecipes"}
              className={({ isActive }) =>
                isActive
                  ? "bg-primary text-white font-medium btn duration-1000 ease-in-out transition-colors"
                  : "border-b-4 border-b-primary border-secondary text-primary font-medium btn duration-1000 ease-in-out transition-colors"
              }
            >
              My Recipes
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashBoard/aboutUs"}
              className={({ isActive }) =>
                isActive
                  ? "bg-primary text-white font-medium btn duration-1000 ease-in-out transition-colors"
                  : "border-b-4 border-b-primary border-secondary text-primary font-medium btn duration-1000 ease-in-out transition-colors"
              }
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashBoard/support"}
              className={({ isActive }) =>
                isActive
                  ? "bg-primary text-white font-medium btn duration-1000 ease-in-out transition-colors"
                  : "border-b-4 border-b-primary border-secondary text-primary font-medium btn duration-1000 ease-in-out transition-colors"
              }
            >
              Support
            </NavLink>
          </li>
          <button
            onClick={() => {
              handleLogout();
            }}
            className="w-full border-primary text-black border rounded-md px-4 py-2 text-sm hover:bg-primary cursor-pointer text-center"
          >
            Logout
          </button>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
