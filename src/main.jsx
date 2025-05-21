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
import AuthProvider from "./providers/AuthProvider";
import { ToastContainer } from "react-toastify";
import ErrorPage from "./pages/ErrorPage";
import PrivateRoute from "./providers/PrivateRoute";
import RecipeDetails from "./pages/RecipeDetails";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        loader: () => fetch("http://localhost:3000/recipes/top6"),
        Component: Home,
      },
      {
        path: "allRecipes",
        loader: () => fetch("http://localhost:3000/recipes"),
        Component: AllRecipes,
      },
      {
        path: "addRecipe",
        element: (
          <PrivateRoute>
            <AddRecipe></AddRecipe>
          </PrivateRoute>
        ),
      },
      {
        path: "myRecipes",
        Component: MyRecipes,
      },
      {
        path: "recipeDetails/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/recipes/${params.id}`),
        element: (
          <PrivateRoute>
            <RecipeDetails></RecipeDetails>
          </PrivateRoute>
        ),
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
  {
    path: "*",
    Component: ErrorPage,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer position="bottom-right"></ToastContainer>
    </AuthProvider>
  </StrictMode>
);
