import React, { use } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthContext";
import { useNavigate } from "react-router";

const AddRecipe = () => {
  const navigate = useNavigate();
  const { user } = use(AuthContext);
  const userName = user.displayName;
  const userEmail = user.email;
  const userPhoto = user.photoURL;
  const userInfo = {
    userName,
    userEmail,
    userPhoto,
  };

  const handleAddRecipe = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const recipeData = Object.fromEntries(formData.entries());

    const recipeDataWithUserInfo = {
      ...recipeData,
      ...userInfo,
      likeCount: 0,
      likedBy: [""],
    };

    fetch("https://recipe-book-app-server-mu.vercel.app/recipes", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(recipeDataWithUserInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Recipe Added Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/allRecipes");
        }
      });
  };
  return (
    <div className="max-w-2xl mx-auto p-6 bg-base-100 shadow-md rounded-lg md:my-10 my-5 duration-1000 ease-in-out transition-colors">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Recipe</h2>
      <form onSubmit={handleAddRecipe} className="space-y-4 ">
        <div>
          <label className="label text-accent pb-1">Image URL</label>
          <input
            name="imgUrl"
            type="text"
            placeholder="Enter image URL"
            className="input focus:outline-none w-full focus:border-primary duration-1000 ease-in-out transition-colors"
          />
        </div>

        <div>
          <label className="label text-accent pb-1">Title</label>
          <input
            name="title"
            type="text"
            placeholder="Enter recipe title"
            className="input focus:outline-none w-full focus:border-primary duration-1000 ease-in-out transition-colors"
          />
        </div>

        <div>
          <label className="label text-accent pb-1">Ingredients</label>
          <textarea
            name="ingredients"
            placeholder="List ingredients"
            className="textarea focus:outline-none w-full focus:border-primary duration-1000 ease-in-out transition-colors"
            rows="3"
          ></textarea>
        </div>

        <div>
          <label className="label text-accent pb-1">Instructions</label>
          <textarea
            name="instructions"
            placeholder="Write cooking instructions"
            className="textarea focus:outline-none w-full focus:border-primary duration-1000 ease-in-out transition-colors"
            rows="3"
          ></textarea>
        </div>

        <div>
          <label className="label text-accent pb-1">Cuisine Type</label>
          <select
            name="cuisineType"
            className="select focus:outline-none w-full focus:border-primary duration-1000 ease-in-out transition-colors"
            defaultValue=""
          >
            <option value="" disabled>
              Select Cuisine Type
            </option>
            <option>Italian</option>
            <option>Mexican</option>
            <option>Indian</option>
            <option>Chinese</option>
            <option>Others</option>
          </select>
        </div>

        <div>
          <label className="label text-accent pb-1">
            Preparation Time (minutes)
          </label>
          <input
            name="preparationTime"
            type="number"
            placeholder="Enter preparation time"
            className="input focus:outline-none w-full focus:border-primary duration-1000 ease-in-out transition-colors"
          />
        </div>

        <div>
          <label className="label text-accent pb-3">Categories</label>
          <div className="flex flex-wrap gap-4 duration-1000 ease-in-out transition-colors">
            <label className="label cursor-pointer gap-2">
              <input
                name="categories"
                value="Breakfast"
                type="checkbox"
                className="checkbox checkbox-primary"
              />
              <span className="label-text">Breakfast</span>
            </label>
            <label className="label cursor-pointer gap-2">
              <input
                name="categories"
                value="Lunch"
                type="checkbox"
                className="checkbox checkbox-primary"
              />
              <span className="label-text">Lunch</span>
            </label>
            <label className="label cursor-pointer gap-2">
              <input
                name="categories"
                value="Dinner"
                type="checkbox"
                className="checkbox checkbox-primary"
              />
              <span className="label-text">Dinner</span>
            </label>
            <label className="label cursor-pointer gap-2">
              <input
                name="categories"
                value="Dessert"
                type="checkbox"
                className="checkbox checkbox-primary"
              />
              <span className="label-text">Dessert</span>
            </label>
            <label className="label cursor-pointer gap-2">
              <input
                name="categories"
                value="Vegan"
                type="checkbox"
                className="checkbox checkbox-primary"
              />
              <span className="label-text">Vegan</span>
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
