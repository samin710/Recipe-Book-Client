import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthContext";
import { useLoaderData } from "react-router";
import { FaEdit, FaHeart, FaTimes, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const MyRecipes = () => {
  useEffect(() => {
    document.title = "Recipe Book App | My Recipes";
  }, []);

  const { user } = use(AuthContext);
  const allRecipes = useLoaderData();
  const filteredRecipes = allRecipes.filter((r) => r.userEmail === user.email);
  const [recipes, setRecipes] = useState(filteredRecipes);

  const [selectedRecipe, setSelectedRecipe] = useState(null); 

  useEffect(() => {
    if (selectedRecipe) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [selectedRecipe]);

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
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(recipes),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              const remainingRecipes = recipes.filter(
                (recipe) => recipe._id !== id
              );
              setRecipes(remainingRecipes);
              Swal.fire({
                title: "Deleted!",
                text: "Your recipe has been deleted.",
                icon: "success",
              });
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
        headers: {
          "content-type": "application/json",
        },
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

  if (!recipes.length) {
    return (
      <p className="text-center mt-10 text-gray-600">
        You haven't added any recipes yet.
      </p>
    );
  }

  return (
    <>
      <div className=" py-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="card shadow-lg shadow-secondary">
            <figure>
              <img
                src={recipe.imgUrl}
                alt={recipe.title}
                className="w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{recipe.title}</h2>
              <p>
                <strong>Ingredients:</strong> {recipe.ingredients}
              </p>
              <p>
                <strong>Instructions:</strong> {recipe.instructions}
              </p>
              <p>
                <strong>Cuisine Type:</strong> {recipe.cuisineType}
              </p>
              <p>
                <strong>Preparation Time:</strong> {recipe.preparationTime}{" "}
                minutes
              </p>
              <p>
                <strong>Category:</strong> {recipe.categories}
              </p>
              <div className="flex items-center justify-between mt-3">
                <p className="flex items-center gap-2">
                  <FaHeart className="text-primary text-xl md:text-2xl" />{" "}
                  <span className="text-lg md:text-xxl">
                    {recipe.likeCount || 0}
                  </span>
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedRecipe(recipe)}
                    className="btn btn-sm btn-outline duration-1000 ease-in-out transition-colors"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(recipe._id)}
                    className="btn btn-sm btn-warning duration-1000 ease-in-out transition-colors"
                  >
                    <FaTrash className=" hover:text-red-600 transition-colors duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
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
              <div>
                <label className="block font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={selectedRecipe.title}
                  className="input focus:outline-none w-full focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Ingredients</label>
                <textarea
                  name="ingredients"
                  defaultValue={selectedRecipe.ingredients}
                  className="textarea focus:outline-none w-full focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Instructions</label>
                <textarea
                  name="instructions"
                  defaultValue={selectedRecipe.instructions}
                  className="textarea focus:outline-none w-full focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Cuisine Type</label>
                <input
                  type="text"
                  name="cuisineType"
                  defaultValue={selectedRecipe.cuisineType}
                  className="input focus:outline-none w-full focus:border-primary"
                />
              </div>
              <div>
                <label className="block font-medium">
                  Preparation Time (minutes)
                </label>
                <input
                  type="number"
                  name="preparationTime"
                  defaultValue={selectedRecipe.preparationTime}
                  className="input focus:outline-none w-full focus:border-primary"
                  min={0}
                />
              </div>
              <div>
                <label className="block font-medium">Categories</label>
                <input
                  type="text"
                  name="categories"
                  defaultValue={selectedRecipe.categories}
                  className="input focus:outline-none w-full focus:border-primary"
                />
              </div>
              <div>
                <label className="block font-medium">Image URL</label>
                <input
                  type="text"
                  name="imgUrl"
                  defaultValue={selectedRecipe.imgUrl}
                  className="input focus:outline-none w-full focus:border-primary"
                />
              </div>

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
    </>
  );
};

export default MyRecipes;
