import React from "react";
import { Link } from "react-router";
import CategoryRecipes from "../pages/CategoryRecipes";

const CategorySection = () => {
  const categories = [
    {
      name: "Indian",
      image: "https://i.ibb.co/nMpTzvmK/indian.jpg",
    },
    { name: "Italian", image: "https://i.ibb.co/FLr8HRHz/italian.jpg" },
    { name: "Mexican", image: "https://i.ibb.co/5hSzKw4g/mexican.jpg" },
    {
      name: "Chinese",
      image: "https://i.ibb.co/PsbYsBj4/chinese.jpg",
    },
    {
      name: "Others",
      image: "https://i.ibb.co/xSHfVrhz/others.jpg",
    },
  ];
  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Browse by Category
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            to={"/categories"}
            state={{ category }}
            key={category.name}
            className="bg-base-200 rounded-2xl shadow hover:shadow-lg transition p-2 md:p-3 text-center group"
          >
            <img
              src={category.image}
              alt={category.name}
              className="rounded-2xl h-50 w-full object-cover mb-4 group-hover:scale-105 transition"
            />
            <h3 className="text-lg font-semibold text-primary">
              {category.name}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
