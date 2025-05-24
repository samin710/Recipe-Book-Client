import React, { use, useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useLoaderData } from "react-router";
import { AuthContext } from "../providers/AuthContext";
import Swal from "sweetalert2";

const RecipeDetails = () => {
  const { user } = use(AuthContext);
  const loadedRecipe = useLoaderData();
  const [recipe, setRecipe] = useState(loadedRecipe);
  const [liked, setLiked] = useState(false);

  const { likeCount, userEmail, likedBy, title } = recipe;
  const { email } = user;

  useEffect(() => {
    document.title = `Recipe Book App | ${title}`;
    if (likedBy.includes(email)) {
      setLiked(true);
    }
  }, [email, likedBy, title]);

  const handleLikeCount = () => {
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

      fetch(
        `https://recipe-book-app-server-mu.vercel.app/recipes/${recipe._id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(updatedLikeCount),
        }
      )
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
              html: `<span><span style="color: #f58727; font-weight: bold;">${updatedLikeCount.likeCount}</span> people interested in this recipe</span>`,
              icon: "success",
            });
          }
        });
    }
  };

  return (
    <div className="max-w-3xl mx-auto md:mt-8 mb-4 md:mb-6 p-4 shadow-lg shadow-secondary">
      <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>

      <img
        src={recipe.imgUrl}
        alt={recipe.title}
        className="w-full h-64 md:h-96 object-cover rounded-xl shadow mb-6"
      />

      <div className="flex items-center justify-between md:pb-5 pb-3">
        <p className=" text-accent ">
          <strong className="text-primary">Posted by:</strong> {recipe.userName}
        </p>

        <button
          className="text-2xl text-primary hover:scale-110 transition"
          onClick={() => {
            handleLikeCount();
          }}
        >
          {liked ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      <div className="md:space-y-3 space-y-1">
        {" "}
        <p className=" text-accent">
          <strong className="text-primary">Category:</strong>{" "}
          {recipe.categories}
        </p>
        <p className=" text-accent">
          <strong className="text-primary">Ingredients:</strong>{" "}
          {recipe.ingredients}
        </p>
        <p className="text-accent">
          <strong className="text-primary">Instructions:</strong>{" "}
          {recipe.instructions}
        </p>
        <p className="text-accent ">
          <strong className="text-primary">Needed time to cook:</strong>{" "}
          {recipe.preparationTime} minutes
        </p>
        <p className="text-accent ">
          <strong className="text-primary">Liked by:</strong>{" "}
          {recipe.likeCount || 0} people
        </p>
      </div>
    </div>
  );
};

export default RecipeDetails;
