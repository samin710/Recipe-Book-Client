import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import Loading from "../components/Loading";
import { FaHeart } from "react-icons/fa";

const CategoryRecipes = () => {
  const location = useLocation();
  const category = location.state?.category;

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (category?.name) {
      fetch("https://recipe-book-app-server-mu.vercel.app/recipes")
        .then((res) => res.json())
        .then((data) => {
          const matched = data.filter(
            (recipe) =>
              recipe.cuisineType?.toLowerCase() === category.name.toLowerCase()
          );
          setRecipes(matched);
          setLoading(false);
        });
    }
  }, [category]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header with category image */}
      <div className="text-center mb-10">
        <img
          src={category.image}
          alt={category.name}
          className="w-full max-h-64 object-cover rounded-xl mb-6 shadow"
        />
        <h1 className="text-3xl font-bold text-primary mb-2">
          {category.name} Recipes
        </h1>
        <p className="text-base-content max-w-xl mx-auto">
          Explore delicious {category.name} recipes curated just for you!
        </p>
      </div>

      {/* Recipes Display */}
      {loading ? (
        <Loading></Loading>
      ) : recipes.length === 0 ? (
        <p className="text-center text-gray-400">
          No recipes found in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="card bg-base-100 shadow-xl shadow-secondary duration-1000 ease-in-out transition-colors"
            >
              <figure>
                <img
                  src={recipe.imgUrl}
                  alt={recipe.title}
                  className=" w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{recipe.title}</h2>
                <p>
                  <strong>Cuisine:</strong> {recipe.cuisineType}
                </p>
                <p className="flex items-center gap-2">
                  <FaHeart className="text-primary text-xl md:text-2xl" />{" "}
                  <span className="text-lg md:text-xxl">
                    {recipe.likeCount || 0}
                  </span>
                </p>
                <div className="card-actions justify-end">
                  <Link to={`/recipeDetails/${recipe._id}`}>
                    <button className="btn btn-primary btn-sm md:btn-md">
                      See Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryRecipes;
