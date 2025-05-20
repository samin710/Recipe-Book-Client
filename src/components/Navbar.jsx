import React from "react";
import { NavLink } from "react-router";
import logImg from "../assets/logo.png";

const Navbar = () => {
  return (
    <>
      <div className="navbar bg-base-100 shadow-md shadow-secondary my-3 md:my-8">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Item 1</a>
              </li>

              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <div className="flex items-center ">
            {" "}
            <div className="md:w-15 w-10">
              <img className="rounded-md w-full" src={logImg} alt="" />
            </div>
            <a className="btn btn-ghost text-xl md:text-2xl">Recipe Book App</a>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex ">
          <ul className="menu menu-horizontal px-1 gap-5">
            <li>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary text-white font-medium btn"
                    : "border-b-4 border-b-primary border-secondary  bg-white text-primary font-medium btn"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/allRecipes"}
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary text-white font-medium btn"
                    : "border-b-4 border-b-primary border-secondary  bg-white text-primary font-medium btn"
                }
              >
                All Recipes
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/addRecipe"}
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary text-white font-medium btn"
                    : "border-b-4 border-b-primary border-secondary  bg-white text-primary font-medium btn"
                }
              >
                Add Recipe
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/myRecipes"}
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary text-white font-medium btn"
                    : "border-b-4 border-b-primary border-secondary  bg-white text-primary font-medium btn"
                }
              >
                My Recipes
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <div className=" menu-horizontal gap-3">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-primary text-white font-medium btn"
                  : "border-b-4 border-b-primary border-secondary  bg-white text-primary font-medium btn"
              }
              to={"/signIn"}
            >
              SignIn
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-primary text-white font-medium btn"
                  : "border-b-4 border-b-primary border-secondary  bg-white text-primary font-medium btn"
              }
              to={"/signUp"}
            >
              SignUp
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
