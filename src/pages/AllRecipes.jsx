import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";
import { FaHeart } from "react-icons/fa";

const AllRecipes = () => {
  useEffect(() => {
    document.title = "Recipe Book App | All Recipes";
  }, []);

  const recipes = useLoaderData();

  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [searchText, setSearchText] = useState("");

  const handleCuisineChange = (e) => {
    setSelectedCuisine(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  // Filter logic: by cuisine and search text
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCuisine =
      selectedCuisine === "" || recipe.cuisineType === selectedCuisine;
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    return matchesCuisine && matchesSearch;
  });

  return (
    <div className="py-10">
      <h2 className="text-4xl font-bold text-center mb-10">All Recipes</h2>

      {/* Layout: Sidebar + Recipes */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="bg-base-200 p-4 rounded-xl shadow-md lg:col-span-1 lg:sticky lg:top-24 h-fit">
          <h3 className="text-xl font-semibold mb-4">Filter Recipes</h3>

          {/* Search */}
          <div className="form-control mb-4">
            <label className="label text-accent pb-1">Search by Title</label>
            <input
              type="text"
              placeholder="e.g. Chicken Curry"
              className="input input-bordered w-full"
              value={searchText}
              onChange={handleSearchChange}
            />
          </div>

          {/* Cuisine Filter */}
          <div className="form-control">
            <label className="label text-accent pb-1">Cuisine Type</label>
            <select
              name="cuisineType"
              className="select select-bordered w-full"
              value={selectedCuisine}
              onChange={handleCuisineChange}
            >
              <option value="">All</option>
              <option>Italian</option>
              <option>Mexican</option>
              <option>Indian</option>
              <option>Chinese</option>
              <option>Others</option>
            </select>
          </div>
        </aside>

        {/* Recipes */}
        <main className="lg:col-span-3">
          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <div
                  key={recipe._id}
                  className="card bg-base-100 shadow-md hover:shadow-xl transition rounded-xl"
                >
                  <figure>
                    <img
                      src={recipe.imgUrl}
                      alt={recipe.title}
                      className="w-full h-48 object-cover rounded-t-xl"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{recipe.title}</h2>
                    <p>
                      <strong>Cuisine:</strong> {recipe.cuisineType}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaHeart className="text-primary text-xl" />{" "}
                      <span className="text-lg">{recipe.likeCount || 0}</span>
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
            <p className="text-center text-accent mt-6">
              No recipes found with current filters.
            </p>
          )}
        </main>
      </div>
    </div>
  );
};

export default AllRecipes;
