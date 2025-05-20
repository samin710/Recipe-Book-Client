import React from "react";

const AddRecipe = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-base-100 shadow-md rounded-lg md:my-10 my-5">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Recipe</h2>
      <form className="space-y-4">
        <div>
          <label className="label text-accent pb-1">Image URL</label>
          <input
            type="text"
            placeholder="Enter image URL"
            className="input focus:outline-none w-full focus:border-primary"
          />
        </div>

        <div>
          <label className="label text-accent pb-1">Title</label>
          <input
            type="text"
            placeholder="Enter recipe title"
            className="input focus:outline-none w-full focus:border-primary"
          />
        </div>

        <div>
          <label className="label text-accent pb-1">Ingredients</label>
          <textarea
            placeholder="List ingredients"
            className="textarea focus:outline-none w-full focus:border-primary"
            rows="3"
          ></textarea>
        </div>

        <div>
          <label className="label text-accent pb-1">Instructions</label>
          <textarea
            placeholder="Write cooking instructions"
            className="textarea focus:outline-none w-full focus:border-primary"
            rows="3"
          ></textarea>
        </div>

        <div>
          <label className="label text-accent pb-1">Cuisine Type</label>
          <select className="select focus:outline-none w-full focus:border-primary">
            <option disabled selected>
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
            type="number"
            placeholder="Enter preparation time"
            className="input focus:outline-none w-full focus:border-primary"
          />
        </div>

        <div>
          <label className="label text-accent pb-3">Categories</label>
          <div className="flex flex-wrap gap-4">
            <label className="label cursor-pointer gap-2">
              <input type="checkbox" className="checkbox checkbox-primary" />
              <span className="label-text">Breakfast</span>
            </label>
            <label className="label cursor-pointer gap-2">
              <input type="checkbox" className="checkbox checkbox-primary" />
              <span className="label-text">Lunch</span>
            </label>
            <label className="label cursor-pointer gap-2">
              <input type="checkbox" className="checkbox checkbox-primary" />
              <span className="label-text">Dinner</span>
            </label>
            <label className="label cursor-pointer gap-2">
              <input type="checkbox" className="checkbox checkbox-primary" />
              <span className="label-text">Dessert</span>
            </label>
            <label className="label cursor-pointer gap-2">
              <input type="checkbox" className="checkbox checkbox-primary" />
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
