import React, { useEffect } from "react";
import { Link, useLoaderData, useLocation, useNavigate } from "react-router";
import { FaHeart } from "react-icons/fa";
import UserFeedback from "../components/UserFeedback ";
import FAQ from "../components/FAQ ";
import { Typewriter } from "react-simple-typewriter";
import "animate.css";
import { useInView } from "react-intersection-observer";
import EmblaCarousel from "../components/Slider/EmblaCarousel";
import "../components/Slider/embla.css";
import CategorySection from "../components/CategorySection";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Recipe Book App | Home";

    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth" });
          navigate(location.pathname, { replace: true });
        }, 100);
      }
    }
  }, [location, navigate]);

  const recipes = useLoaderData();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  const OPTIONS = { loop: true };
  const foodImages = [
    "https://i.ibb.co/m5yyPk0M/Decadent-Chocolate-Delight-with-Raspberries.png",
    "https://i.ibb.co/tPm5HB0C/Tomato-Basil-Risotto-Delight.png",
    "https://i.ibb.co/VYftKCYT/Fresh-Caprese-Salad-with-Basil.png",
    "https://i.ibb.co/fdym06yj/Butter-Chicken-Curry-with-Basmati-Rice.png",
    "https://i.ibb.co/ymHf78LT/Savoring-a-Flavorful-Mexican-Tostada.png",
    "https://i.ibb.co/tpGCKHwW/Stir-Fried-Noodles-with-Vegetables-and-Chicken.png",
    "https://i.ibb.co/dJH5Ympr/Vibrant-Greek-Salad-on-Beige-Countertop.png",
    "https://i.ibb.co/JRKG5rst/Penne-Pasta-with-Tomato-Sauce-and-Basil.png",
    "https://i.ibb.co/ycCf10z1/Mouthwatering-Cheeseburger-on-Ceramic-Plate.png",
    "https://i.ibb.co/Df3SRKR1/Spaghetti-with-Chicken-Cutlet-and-Tomatoes.png",
  ];

  return (
    <>
      <div className="text-center">
        <h2 className="text-4xl font-bold text-center md:pb-3 pb-2 pt-2 md:mt-8 mt-4">
          FlavorVerse
        </h2>
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
        <div className="">
          <EmblaCarousel slides={foodImages} options={OPTIONS} />
        </div>
      </div>
      {/* Top Recipes */}
      <section className="" ref={ref}>
        <div className="md:mt-8 mt-4">
          <h2 className="text-4xl font-bold text-center md:mb-10 mb-5">
            Top Recipes
          </h2>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 
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
      <div className="md:mt-8 mt-4">
        <CategorySection></CategorySection>
      </div>
      <div id="faq" className=" scroll-mt-24">
        <FAQ></FAQ>
      </div>
      <div className="">
        <UserFeedback></UserFeedback>
      </div>
    </>
  );
};

export default Home;
