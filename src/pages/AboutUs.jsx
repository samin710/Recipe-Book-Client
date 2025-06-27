import React, { useEffect, useState } from "react";
import logImg from "../assets/logo.png";

const AboutUs = () => {
  const [stats, setStats] = useState({
    totalRecipes: 0,
    totalUsers: 0,
    totalLikes: 0,
  });

  useEffect(() => {
    document.title = "Recipe Book App | About Us";
    fetch("https://recipe-book-app-server-mu.vercel.app/recipes")
      .then((res) => res.json())
      .then((data) => {
        const uniqueUsers = new Set(data.map((recipe) => recipe.userEmail));

        const totalLikes = data.reduce((sum, recipe) => {
          return sum + (recipe.likeCount || 0); // fallback to 0 if likeCount is undefined
        }, 0);

        setStats({
          totalRecipes: data.length,
          totalUsers: uniqueUsers.size,
          totalLikes: totalLikes,
        });
      });
  }, []);
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">About Recipe Book App</h1>
        <p className="text-lg text-base-content">
          Your digital cookbook for discovering, sharing, and enjoying recipes
          from around the world.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 items-center">
        <img
          src={logImg}
          alt="Cooking together"
          className="rounded-xl shadow-md"
        />
        <div className="">
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
          <p className="text-lg text-base-content">
            At Recipe Book App, we believe food brings people together. Our goal
            is to empower home cooks and food lovers to easily share their
            favorite recipes and discover new ones across cultures, tastes, and
            cooking levels.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-center">
          What We Offer
        </h2>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-base-200 p-6 rounded-xl text-center shadow border border-primary">
            <h3 className="font-bold text-lg mb-2">🌐 Explore Recipes</h3>
            <p>
              Filter by cuisine, ingredients, or popularity to find your next
              favorite meal.
            </p>
          </div>
          <div className="bg-base-200 p-6 rounded-xl text-center shadow border border-primary">
            <h3 className="font-bold text-lg mb-2">📝 Share Your Own</h3>
            <p>
              Log in to publish, edit, or delete your recipes and build your
              collection.
            </p>
          </div>
          <div className="bg-base-200 p-6 rounded-xl text-center shadow border border-primary">
            <h3 className="font-bold text-lg mb-2">❤️ Like Recipes</h3>
            <p>
              Engage with others by liking your favorite recipes (excluding your
              own).
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          <div className="bg-base-200 p-6 rounded-xl shadow">
            <h4 className="text-3xl font-bold text-primary">
              {stats.totalRecipes}
            </h4>
            <p className="text-base-content mt-2">Total Recipes</p>
          </div>
          <div className="bg-base-200 p-6 rounded-xl shadow">
            <h4 className="text-3xl font-bold text-primary">
              {stats.totalUsers}
            </h4>
            <p className="text-base-content mt-2">Contributors</p>
          </div>
          <div className="bg-base-200 p-6 rounded-xl shadow">
            <h4 className="text-3xl font-bold text-primary">
              {stats.totalLikes}
            </h4>
            <p className="text-base-content mt-2">Total Likes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
