import React, { use, useState } from "react";
import { AuthContext } from "../providers/AuthContext";
import { useLoaderData } from "react-router";
import { FaEdit, FaHeart, FaTrash } from "react-icons/fa";
import Loading from "../components/Loading";

const MyRecipes = () => {
  const { user, loading } = use(AuthContext);
  const allRecipes = useLoaderData();
  const filteredRecipes = allRecipes.filter((r) => r.userEmail === user.email);
  const [recipes, setRecipes] = useState(filteredRecipes);

  if (loading) return <Loading></Loading>;

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/recipes/${id}`, {
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
        }
      });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <h1>Total: {recipes.length}</h1>
      {recipes.map((recipe) => (
        <div key={recipe._id} className="card shadow-xl">
          <figure>
            <img
              src={recipe.imgUrl}
              alt={recipe.title}
              className="h-52 w-full object-cover"
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
              <span className="flex items-center gap-1 text-primary">
                <FaHeart />{" "}
                <span className="text-black">{recipe.likeCount || 0}</span>
              </span>
              <div className="flex gap-2">
                <button className="btn btn-sm btn-outline">
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(recipe._id)}
                  className="btn btn-sm btn-error text-white"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyRecipes;
