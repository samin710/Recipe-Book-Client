import React, { use, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useLoaderData } from "react-router";
import { AuthContext } from "../providers/AuthContext";
import Swal from "sweetalert2";

const RecipeDetails = () => {
  const { user } = use(AuthContext);
  const loadedRecipe = useLoaderData();
  const [recipe, setRecipe] = useState(loadedRecipe);
  const [liked, setLiked] = useState(false);

  const handleLikeCount = () => {
    const { likeCount, userEmail, likedBy } = recipe;

    const { email } = user;
    if (userEmail === email) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You cannot like your own recipe",
      });
      return;
    }
    if (likedBy.includes(email)) {
      Swal.fire({
        icon: "error",
        title: "Already liked",
        text: "You've already liked this recipe",
      });
      return;
    } else {
      setLiked(true);
      const updatedLikeCount = {
        likeCount: likeCount + 1,
        email,
      };

      fetch(`http://localhost:3000/recipes/${recipe._id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedLikeCount),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount) {
            setRecipe((prev) => ({
              ...prev,
              likeCount: prev.likeCount + 1,
              likedBy: [...(prev.likedBy || []), email],
            }));
            Swal.fire({
              title: "Liked",
              text: `${updatedLikeCount.likeCount} has liked this recipe`,
              icon: "success",
            });
          }
        });
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4">
      <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>

      <img
        src={recipe.imgUrl}
        alt={recipe.title}
        className="w-full h-64 md:h-96 object-cover rounded-xl shadow mb-6"
      />

      <div className="flex items-center justify-between md:pb-5 pb-3">
        <p className=" text-gray-700 ">
          <strong>Posted by:</strong> {recipe.userName}
        </p>

        <button
          className="text-2xl text-red-500 hover:scale-110 transition"
          onClick={() => {
            handleLikeCount();
          }}
        >
          {liked ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      <p className=" text-gray-700">
        <strong>Category:</strong> {recipe.categories}
      </p>

      <p className=" text-gray-700">
        <strong>Ingredients:</strong> {recipe.ingredients}
      </p>
      <p className="text-gray-700">
        <strong>Instructions:</strong> {recipe.instructions}
      </p>
      <p className="text-gray-700 ">
        <strong>Needed time to cook:</strong> {recipe.preparationTime} minutes
      </p>
      <p className="text-gray-700 ">
        <strong>Liked by:</strong> {recipe.likeCount || 0} people
      </p>
    </div>
  );
};

export default RecipeDetails;
