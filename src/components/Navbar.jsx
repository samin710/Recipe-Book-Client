import React, { use, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import logImg from "../assets/logo.png";
import { AuthContext } from "../providers/AuthContext";
import { toast } from "react-toastify";
import Loading from "./Loading";
import { useState } from "react";

const Navbar = () => {
  const { user, logout, loading } = use(AuthContext);
  const navigate = useNavigate();

  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

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
      <div className="navbar bg-base-100 shadow-md shadow-secondary my-3 md:my-8 ">
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
          {user ? (
            <div className="menu-horizontal gap-3">
              <button
                onClick={handleLogout}
                className="border-b-4 border-b-primary border-secondary  bg-white text-primary font-medium btn"
              >
                SignOut
              </button>
              <NavLink>
                <img className="w-10 rounded-full" src={user.photoURL} />
              </NavLink>
            </div>
          ) : (
            <div className=" menu-horizontal gap-3">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary text-white font-medium btn"
                    : "border-b-4 border-b-primary border-secondary bg-secondary text-primary font-medium btn"
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
          )}

          <label className="flex cursor-pointer gap-2 ">
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
              // checked={theme}
              // onChange={(e) => setTheme(e.target.checked)}
              onClick={toggleTheme}
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
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </label>
        </div>
      </div>
    </>
  );
};

export default Navbar;
