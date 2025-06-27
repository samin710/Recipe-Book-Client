import { use, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthContext";
import { motion } from "framer-motion";

const DashboardOverview = () => {
  const { user } = use(AuthContext);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("https://recipe-book-app-server-mu.vercel.app/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data));
  }, []);

  const myRecipes = recipes.filter((r) => r.userEmail === user?.email);
  const totalLikes = myRecipes.reduce(
    (total, recipe) => total + (recipe.likeCount || 0),
    0
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">
        📊 Dashboard Overview
      </h2>

      {/* User Info */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-base-200 p-6 rounded-xl shadow flex items-center gap-4 mb-8"
      >
        <img
          src={user?.photoURL || "https://via.placeholder.com/80"}
          alt={user?.displayName || "User"}
          className="w-16 h-16 rounded-full border-2 border-primary"
        />
        <div>
          <h3 className="text-xl font-bold">{user?.displayName}</h3>
          <p className="text-sm text-gray-600">{user?.email}</p>
        </div>
      </motion.div>

      {/* Stat Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Recipes"
          value={recipes.length}
          border="primary"
          delay={0.1}
        />
        <StatCard
          title="My Recipes"
          value={myRecipes.length}
          border="secondary"
          delay={0.2}
        />
        <StatCard
          title="Total Likes on My Recipes"
          value={totalLikes}
          border="accent"
          delay={0.3}
        />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, border, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
    className={`bg-base-200 p-6 rounded-xl shadow border-l-4 border-${border}`}
  >
    <h3 className="text-lg font-semibold mb-1">{title}</h3>
    <p className={`text-3xl font-bold text-${border}`}>{value}</p>
  </motion.div>
);

export default DashboardOverview;
