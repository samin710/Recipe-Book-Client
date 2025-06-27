import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link, useLoaderData } from "react-router";

const DashboardAllRecipes = () => {
  const recipes = useLoaderData();

  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [searchText, setSearchText] = useState("");

  const handleCuisineChange = (e) => {
    setSelectedCuisine(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCuisine =
      selectedCuisine === "" || recipe.cuisineType === selectedCuisine;
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    return matchesCuisine && matchesSearch;
  });

  return (
    <div className="overflow-x-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        All Recipes (Dashboard)
      </h2>

      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          className="input input-bordered w-full md:w-1/3"
          value={searchText}
          onChange={handleSearchChange}
        />

        <select
          name="cuisineType"
          className="select select-bordered w-full md:w-1/4"
          value={selectedCuisine}
          onChange={handleCuisineChange}
        >
          <option value="">All Cuisines</option>
          <option>Italian</option>
          <option>Mexican</option>
          <option>Indian</option>
          <option>Chinese</option>
          <option>Others</option>
        </select>
      </div>

      <table className="table w-full table-zebra">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Cuisine</th>
            <th>Likes</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecipes.map((recipe) => (
            <tr key={recipe._id}>
              <td>
                <img
                  src={recipe.imgUrl}
                  alt={recipe.title}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td>{recipe.title}</td>
              <td>{recipe.cuisineType}</td>
              <td className="text-primary font-semibold flex items-center gap-2">
                <FaHeart /> {recipe.likeCount || 0}
              </td>
              <td>
                <Link
                  to={`/dashBoard/recipeDetails/${recipe._id}`}
                  className="btn btn-sm btn-outline btn-primary"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredRecipes.length === 0 && (
        <p className="text-center mt-6 text-error">No recipes found.</p>
      )}
    </div>
  );
};

export default DashboardAllRecipes;
