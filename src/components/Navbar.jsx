import React, { use } from "react";
import { NavLink, useNavigate } from "react-router";
import logImg from "../assets/logo.png";
import { AuthContext } from "../providers/AuthContext";
import { toast } from "react-toastify";
import { useState } from "react";
import Loading from "./Loading";

const Navbar = () => {
  const { user, logout, toggleTheme, theme, loading } = use(AuthContext);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  if (loading) return <Loading></Loading>;

  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success("Successfully SignOut");
        navigate("/");
      })
      .catch((error) => {
        console.log(error.massage);
      });
  };

  return (
    <>
      <div className="navbar bg-base-100 shadow-md shadow-secondary my-3 md:my-8 duration-1000 ease-in-out transition-colors sticky top-0 z-50">
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
                <NavLink to={"/"}>Home</NavLink>
              </li>
              <li>
                <NavLink to={"/allRecipes"}>All Recipes</NavLink>
              </li>
              <li>
                <NavLink to={"/addRecipe"}>Add Recipe</NavLink>
              </li>
              <li>
                <NavLink to={"/myRecipes"}>My Recipes</NavLink>
              </li>
              {user ? (
                <>
                  {" "}
                  <li>
                    <NavLink to={"/dashBoard"}>Dashboard</NavLink>
                  </li>
                  <div className="p-2 border border-primary rounded-2xl text-center bg-secondary">
                    <button onClick={handleLogout}>SignOut</button>
                  </div>
                </>
              ) : (
                <div className="">
                  <li>
                    <NavLink to={"/signIn"}>SignIn</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/signUp"}>SignUp</NavLink>
                  </li>
                </div>
              )}
            </ul>
          </div>
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
        </div>
        <div className="navbar-center hidden lg:flex ">
          <ul className="menu menu-horizontal px-1 gap-5">
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
                to={"/allRecipes"}
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary text-white font-medium btn duration-1000 ease-in-out transition-colors"
                    : "border-b-4 border-b-primary border-secondary text-primary font-medium btn duration-1000 ease-in-out transition-colors"
                }
              >
                All Recipes
              </NavLink>
            </li>

            {user && (
              <>
                {" "}
                <li>
                  <NavLink
                    to={"/dashBoard"}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-primary text-white font-medium btn duration-1000 ease-in-out transition-colors"
                        : "border-b-4 border-b-primary border-secondary text-primary font-medium btn duration-1000 ease-in-out transition-colors"
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
              </>
            )}

            <li>
              <NavLink
                to={"/aboutUs"}
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
                to={"/support"}
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary text-white font-medium btn duration-1000 ease-in-out transition-colors"
                    : "border-b-4 border-b-primary border-secondary text-primary font-medium btn duration-1000 ease-in-out transition-colors"
                }
              >
                Support
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end hidden md:flex">
          {user ? (
            <div className="relative menu-horizontal gap-3">
              {/* Avatar Button */}
              <div className="relative">
                <button onClick={() => setShowDropdown(!showDropdown)}>
                  <img
                    className="w-10 h-10 rounded-full"
                    src={user.photoURL}
                    alt="User Avatar"
                  />
                </button>

                {/* Dropdown */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-secondary border border-primary rounded-lg shadow-md z-10  p-1 space-y-2">
                    <div className="px-4 py-2 text-sm border border-primary rounded-md text-black">
                      {user.displayName}
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setShowDropdown(false);
                      }}
                      className="w-full border-primary text-black border rounded-md px-4 py-2 text-left text-sm hover:bg-primary cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="menu-horizontal gap-3">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary text-white font-medium btn duration-1000 ease-in-out transition-colors"
                    : "border-b-4 border-b-primary border-secondary text-primary font-medium btn duration-1000 ease-in-out transition-colors"
                }
                to={"/signIn"}
              >
                SignIn
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary text-white font-medium btn duration-1000 ease-in-out transition-colors"
                    : "border-b-4 border-b-primary border-secondary text-primary font-medium btn duration-1000 ease-in-out transition-colors"
                }
                to={"/signUp"}
              >
                SignUp
              </NavLink>
            </div>
          )}
          {/* Theme Toggle */}
          <label className="flex cursor-pointer gap-2 items-center ml-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>

            <input
              type="checkbox"
              className="toggle"
              onChange={toggleTheme}
              checked={theme === "dark"}
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </label>
        </div>

        <div className="navbar-end md:hidden">
          {/* Theme Toggle */}
          <label className="flex cursor-pointer gap-2 items-center ml-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>

            <input
              type="checkbox"
              className="toggle"
              onChange={toggleTheme}
              checked={theme === "dark"}
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </label>
        </div>
      </div>
    </>
  );
};

export default Navbar;
