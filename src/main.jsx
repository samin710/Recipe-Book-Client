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
import Loading from "./components/Loading";
import SupportPage from "./pages/SupportPage";
import AboutUs from "./pages/AboutUs";
import CategoryRecipes from "./pages/CategoryRecipes";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardOverview from "./pages/DashboardOverview";
import DashboardAllRecipes from "./pages/DashboardAllRecipes";
import DashboardMyRecipes from "./pages/DashboardMyRecipes";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        hydrateFallbackElement: <Loading></Loading>,
        loader: () =>
          fetch("https://recipe-book-app-server-mu.vercel.app/recipes/top6"),
        Component: Home,
      },
      {
        path: "allRecipes",
        hydrateFallbackElement: <Loading></Loading>,
        loader: () =>
          fetch("https://recipe-book-app-server-mu.vercel.app/recipes"),
        Component: AllRecipes,
      },

      {
        path: "recipeDetails/:id",
        hydrateFallbackElement: <Loading></Loading>,
        loader: ({ params }) =>
          fetch(
            `https://recipe-book-app-server-mu.vercel.app/recipes/${params.id}`
          ),
        element: (
          <PrivateRoute>
            <RecipeDetails></RecipeDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "support",
        Component: SupportPage,
      },
      {
        path: "aboutUs",
        Component: AboutUs,
      },
      {
        path: "categories",
        Component: CategoryRecipes,
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
    path: "dashBoard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardOverview,
      },
      {
        path: "dashboardMyRecipes",
        hydrateFallbackElement: <Loading></Loading>,
        loader: () =>
          fetch("https://recipe-book-app-server-mu.vercel.app/recipes"),
        element: (
          <PrivateRoute>
            <DashboardMyRecipes></DashboardMyRecipes>
          </PrivateRoute>
        ),
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
        path: "dashboardAllRecipes",
        hydrateFallbackElement: <Loading></Loading>,
        loader: () =>
          fetch("https://recipe-book-app-server-mu.vercel.app/recipes"),
        Component: DashboardAllRecipes,
      },
      {
        path: "recipeDetails/:id",
        hydrateFallbackElement: <Loading></Loading>,
        loader: ({ params }) =>
          fetch(
            `https://recipe-book-app-server-mu.vercel.app/recipes/${params.id}`
          ),
        element: (
          <PrivateRoute>
            <RecipeDetails></RecipeDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "support",
        Component: SupportPage,
      },
      {
        path: "aboutUs",
        Component: AboutUs,
      },
    ],
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
