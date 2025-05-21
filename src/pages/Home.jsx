import React, { useEffect } from "react";
import Slider from "../components/Slider";
import { Link, useLoaderData } from "react-router";
import { FaHeart } from "react-icons/fa";

const foodImages = [
  {
    url: "https://i.ibb.co/Df3SRKR1/Spaghetti-with-Chicken-Cutlet-and-Tomatoes.png",
    name: "Pizza",
  },
  {
    url: "https://i.ibb.co/ycCf10z1/Mouthwatering-Cheeseburger-on-Ceramic-Plate.png",
    name: "Burger",
  },
  {
    url: "https://i.ibb.co/JRKG5rst/Penne-Pasta-with-Tomato-Sauce-and-Basil.png",
    name: "Sushi",
  },
  {
    url: "https://i.ibb.co/dJH5Ympr/Vibrant-Greek-Salad-on-Beige-Countertop.png",
    name: "Sushi",
  },
  {
    url: "https://i.ibb.co/tpGCKHwW/Stir-Fried-Noodles-with-Vegetables-and-Chicken.png",
    name: "Sushi",
  },
];

const Home = () => {
  useEffect(() => {
    document.title = "Recipe Book App | Home";
  }, []);
  const recipes = useLoaderData();
  return (
    <>
      <div>
        <Slider images={foodImages}></Slider>
      </div>
      {/* Top Recipes */}
      <section className="p-6">
        <div className="py-10">
          <h2 className="text-3xl font-bold text-center mb-10">Top Recipes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <div
                key={recipe._id}
                className="card bg-base-100 shadow-xl border border-base-300"
              >
                <figure>
                  <img
                    src={recipe.imgUrl}
                    alt={recipe.title}
                    className="h-48 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{recipe.title}</h2>
                  <p>
                    <strong>Cuisine:</strong> {recipe.cuisineType}
                  </p>
                  <p>
                    <strong>Likes:</strong> {recipe.likeCount || 0}
                  </p>
                  <div className="card-actions justify-end">
                    <Link to={`/recipe/${recipe.id}`}>
                      <button className="btn btn-primary btn-sm">
                        See Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Link to="/allRecipes" className="btn btn-outline btn-accent">
            See All Recipes
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
