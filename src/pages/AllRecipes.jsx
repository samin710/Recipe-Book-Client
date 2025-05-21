import React from "react";
import { Link, useLoaderData } from "react-router";

const AllRecipes = () => {
  const recipes = useLoaderData();
  return (
    <div className="py-10">
      <h2 className="text-3xl font-bold text-center mb-10">All Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe._id}
            className="card bg-base-100 shadow-xl border border-base-300"
          >
            <figure>
              <img
                src={recipe.imgUrl}
                alt={recipe.title}
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{recipe.title}</h2>
              <p>
                <strong>Cuisine:</strong> {recipe.cuisineType}
              </p>
              <p>
                <strong>Likes:</strong> {recipe.likeCount || 0}
              </p>
              <div className="card-actions justify-end">
                <Link to={`/recipeDetails/${recipe._id}`}>
                  <button className="btn btn-primary btn-sm">
                    See Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRecipes;
