import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useLoaderData } from "react-router";

const RecipeDetails = () => {
  const recipe = useLoaderData();

  const [liked, setLiked] = useState(false);

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
          onClick={() => setLiked(!liked)}
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
