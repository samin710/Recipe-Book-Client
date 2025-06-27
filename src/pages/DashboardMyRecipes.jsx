import React, { use, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaEdit, FaHeart, FaTimes, FaTrash } from "react-icons/fa";
import { AuthContext } from "../providers/AuthContext";
import { useLoaderData } from "react-router";

const DashboardMyRecipes = () => {
  const { user } = use(AuthContext);
  const allRecipes = useLoaderData();
  const filteredRecipes = allRecipes.filter((r) => r.userEmail === user.email);
  const [recipes, setRecipes] = useState(filteredRecipes);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [detailsRecipe, setDetailsRecipe] = useState(null);

  useEffect(() => {
    document.title = "Recipe Book App | My Recipes";
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://recipe-book-app-server-mu.vercel.app/recipes/${id}`, {
          method: "DELETE",
          headers: { "content-type": "application/json" },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              const remainingRecipes = recipes.filter(
                (recipe) => recipe._id !== id
              );
              setRecipes(remainingRecipes);
              Swal.fire("Deleted!", "Your recipe has been deleted.", "success");
            }
          });
      }
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updatedRecipeData = Object.fromEntries(formData.entries());

    fetch(
      `https://recipe-book-app-server-mu.vercel.app/recipes/${selectedRecipe._id}`,
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(updatedRecipeData),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          setRecipes((prevRecipes) =>
            prevRecipes.map((r) =>
              r._id === selectedRecipe._id ? { ...r, ...updatedRecipeData } : r
            )
          );
          setSelectedRecipe(null);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your recipe has been updated",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className="overflow-x-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">My Recipes</h2>

      <table className="table w-full table-zebra">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Cuisine</th>
            <th>Prep Time</th>
            <th>Likes</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => (
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
              <td>{recipe.preparationTime} min</td>
              <td className="text-primary font-semibold flex items-center gap-2">
                <FaHeart /> {recipe.likeCount || 0}
              </td>
              <td>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => setDetailsRecipe(recipe)}
                    className="btn btn-sm btn-primary text-white"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => setSelectedRecipe(recipe)}
                    className="btn btn-sm btn-outline"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(recipe._id)}
                    className="btn btn-sm btn-warning"
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {recipes.length === 0 && (
        <p className="text-center mt-6 text-error">No recipes found.</p>
      )}

      {/* Edit Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/30 flex items-center justify-center">
          <div className="bg-white dark:bg-base-100 dark:text-accent rounded-lg shadow-lg w-11/12 md:w-8/12 p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedRecipe(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-xl"
            >
              <FaTimes />
            </button>
            <h3 className="text-2xl font-semibold mb-4">Update Recipe</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                name="title"
                defaultValue={selectedRecipe.title}
                className="input w-full"
                required
              />
              <textarea
                name="ingredients"
                defaultValue={selectedRecipe.ingredients}
                className="textarea w-full"
                required
              />
              <textarea
                name="instructions"
                defaultValue={selectedRecipe.instructions}
                className="textarea w-full"
                required
              />
              <input
                type="text"
                name="cuisineType"
                defaultValue={selectedRecipe.cuisineType}
                className="input w-full"
              />
              <input
                type="number"
                name="preparationTime"
                defaultValue={selectedRecipe.preparationTime}
                className="input w-full"
                min={0}
              />
              <input
                type="text"
                name="categories"
                defaultValue={selectedRecipe.categories}
                className="input w-full"
              />
              <input
                type="text"
                name="imgUrl"
                defaultValue={selectedRecipe.imgUrl}
                className="input w-full"
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setSelectedRecipe(null)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {detailsRecipe && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/30 flex items-center justify-center">
          <div className="bg-white dark:bg-base-100 dark:text-accent rounded-lg shadow-lg w-11/12 md:w-8/12 p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setDetailsRecipe(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-xl"
            >
              <FaTimes />
            </button>
            <h3 className="text-2xl font-bold mb-4">{detailsRecipe.title}</h3>
            <img
              src={detailsRecipe.imgUrl}
              alt={detailsRecipe.title}
              className="w-full h-64 object-cover rounded mb-4"
            />
            <p>
              <strong>Ingredients:</strong> {detailsRecipe.ingredients}
            </p>
            <p>
              <strong>Instructions:</strong> {detailsRecipe.instructions}
            </p>
            <p>
              <strong>Cuisine:</strong> {detailsRecipe.cuisineType}
            </p>
            <p>
              <strong>Prep Time:</strong> {detailsRecipe.preparationTime} min
            </p>
            <p>
              <strong>Categories:</strong> {detailsRecipe.categories}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardMyRecipes;
