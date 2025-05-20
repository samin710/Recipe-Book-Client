import React, { useEffect } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "ErrorPage";
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-secondary to-white text-center px-4">
      <FaExclamationTriangle className="text-red-500 text-6xl mb-4" />
      <h1 className="text-5xl font-bold text-gray-800 mb-2">Oops!</h1>
      <p className="text-lg text-gray-600 md:mb-4 mb-3">
        We couldn't find the page you were looking for.
      </p>
      <p className="text-md text-accent mb-8">
        Error code: <span className="text-red-600">404</span>
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 hover:bg-primary hover:text-white rounded-full shadow-primary hover:shadow-lg hover:shadow-secondary shadow"
      >
        Back to Home
      </button>
    </div>
  );
};

export default ErrorPage;
