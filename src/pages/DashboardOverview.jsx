import { use, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthContext";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const DashboardOverview = () => {
  const { user } = use(AuthContext);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    document.title = "Recipe Book App | Dashboard";
    fetch("https://recipe-book-app-server-mu.vercel.app/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data));
  }, []);

  const myRecipes = recipes.filter((r) => r.userEmail === user?.email);
  const totalLikes = myRecipes.reduce(
    (total, recipe) => total + (recipe.likeCount || 0),
    0
  );

  const cuisineCount = myRecipes.reduce((acc, recipe) => {
    acc[recipe.cuisineType] = (acc[recipe.cuisineType] || 0) + 1;
    return acc;
  }, {});

  const cuisineData = Object.entries(cuisineCount).map(([type, count]) => ({
    name: type,
    value: count,
  }));

  const likeChartData = myRecipes.map((r) => ({
    name: r.title.length > 20 ? r.title.slice(0, 8) + "..." : r.title,
    likes: r.likeCount || 0,
  }));

  const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Pie Chart */}
        <div className="bg-base-200 p-6 rounded-xl shadow">
          <h3 className="text-lg font-bold mb-4">My Recipes by Cuisine Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={cuisineData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {cuisineData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-base-200 p-6 rounded-xl shadow">
          <h3 className="text-lg font-bold mb-4">Like Count per Recipe</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={likeChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="likes" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
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
