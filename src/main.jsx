import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import AllRecipes from "./pages/AllRecipes";
import AddRecipe from "./pages/AddRecipe";
import MyRecipes from "./pages/MyRecipes";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "allRecipes",
        Component: AllRecipes,
      },
      {
        path: "addRecipe",
        Component: AddRecipe,
      },
      {
        path: "myRecipes",
        Component: MyRecipes,
      },
    ],
  },
  {
    path: "signUp",
    Component: SignUp,
  },
  {
    path: "signIn",
    Component: SignIn,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
