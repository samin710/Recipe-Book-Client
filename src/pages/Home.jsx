import React, { useEffect } from "react";
import Slider from "../components/Slider";
import { Link, useLoaderData } from "react-router";
import { FaHeart } from "react-icons/fa";
import UserFeedback from "../components/UserFeedback ";
import FAQ from "../components/FAQ ";
import { Typewriter } from "react-simple-typewriter";
import "animate.css";
import { useInView } from "react-intersection-observer";

const Home = () => {
  useEffect(() => {
    document.title = "Recipe Book App | Home";
  }, []);
  const recipes = useLoaderData();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });
  return (
    <>
      <div className="p-2 text-center">
        <h2 className="text-3xl font-bold text-center">FlavorVerse</h2>
        <p className="pb-3 text-accent">
          <span className="text-primary font-bold">Welcome!!!</span>
          <Typewriter
            words={[
              " Explore, Cook, Share – Your Culinary Universe in One App",
            ]}
            loop={0}
            typeSpeed={90}
            deleteSpeed={60}
            delaySpeed={1000}
          />
        </p>

        <Slider></Slider>
      </div>
      {/* Top Recipes */}
      <section className="p-6" ref={ref}>
        <div className="py-10">
          <h2 className="text-3xl font-bold text-center mb-10">Top Recipes</h2>
          <div
            className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 
      ${inView ? "animate__animated animate__bounceInRight" : ""}`}
          >
            {recipes.map((recipe) => (
              <div
                key={recipe._id}
                className="card bg-base-100 shadow-xl shadow-secondary duration-1000 ease-in-out transition-colors"
              >
                <figure>
                  <img
                    src={recipe.imgUrl}
                    alt={recipe.title}
                    className=" w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{recipe.title}</h2>
                  <p>
                    <strong>Cuisine:</strong> {recipe.cuisineType}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaHeart className="text-primary text-xl md:text-2xl" />{" "}
                    <span className="text-lg md:text-xxl">
                      {recipe.likeCount || 0}
                    </span>
                  </p>
                  <div className="card-actions justify-end">
                    <Link to={`/recipeDetails/${recipe._id}`}>
                      <button className="btn btn-primary btn-sm md:btn-md">
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
          <Link
            to="/allRecipes"
            className="btn btn-outline btn-primary md:btn-lg"
          >
            See All Recipes
          </Link>
        </div>
      </section>
      <div className="p-6">
        <FAQ></FAQ>
      </div>
      <div className="p-6">
        <UserFeedback></UserFeedback>
      </div>
    </>
  );
};

export default Home;
