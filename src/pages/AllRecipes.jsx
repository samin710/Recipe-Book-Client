import React, { useState } from "react";
import { Link, useLoaderData } from "react-router";

const AllRecipes = () => {
  const recipes = useLoaderData();
  const [selectedCuisine, setSelectedCuisine] = useState("");

  const handleCuisineChange = (e) => {
    setSelectedCuisine(e.target.value);
  };

  const filteredRecipes =
    selectedCuisine === ""
      ? recipes
      : recipes.filter((r) => r.cuisineType === selectedCuisine);

  return (
    <>
      <div className="flex gap-2">
        <label className="label text-accent pb-1">Cuisine Type</label>
        <select
          name="cuisineType"
          className="select focus:outline-none md:w-1/5 focus:border-primary"
          defaultValue=""
          onChange={handleCuisineChange}
        >
          <option value="" disabled>
            Select Cuisine Type
          </option>
          <option value="">All</option>
          <option>Italian</option>
          <option>Mexican</option>
          <option>Indian</option>
          <option>Chinese</option>
          <option>Others</option>
        </select>
      </div>
      <div className="py-10">
        <h2 className="text-3xl font-bold text-center mb-10">All Recipes</h2>
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredRecipes.map((recipe) => (
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
        ) : (
          <p className="text-center text-accent">
            No recipes found for selected cuisine.
          </p>
        )}
      </div>
    </>
  );
};

export default AllRecipes;
