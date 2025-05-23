import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { FaUtensils } from "react-icons/fa";

const ErrorPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Page Not Found | Recipe Book";
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-200 to-yellow-50 text-center px-4">
      <FaUtensils className="text-orange-500 text-7xl mb-4 animate-bounce" />
      <h1 className="text-5xl font-bold text-orange-700 mb-2 font-cursive">
        Oops! Something’s cooking...
      </h1>
      <p className="text-lg text-gray-700 mb-3">
        We couldn’t find the page you were looking for. Maybe the recipe got
        burned!
      </p>
      <p className="text-md text-red-600 font-semibold mb-8">
        Error Code: <span className="text-red-800 font-bold">404</span>
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-orange-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-orange-600 transition-all duration-300 ease-in-out"
      >
        🍲 Go Back to Home
      </button>
    </div>
  );
};

export default ErrorPage;
