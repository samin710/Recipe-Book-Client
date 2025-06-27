import { use, useEffect, useState, } from "react";
import { AuthContext } from "../providers/AuthContext";


const DashboardOverview = () => {
  const { user } = use(AuthContext);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("https://recipe-book-app-server-mu.vercel.app/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data));
  }, []);

  const myRecipes = recipes.filter((r) => r.userEmail === user?.email);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-base-200 p-6 rounded-xl shadow border-l-4 border-primary">
          <h3 className="text-lg font-bold">Total Recipes</h3>
          <p className="text-2xl">{recipes.length}</p>
        </div>
        <div className="bg-base-200 p-6 rounded-xl shadow border-l-4 border-secondary">
          <h3 className="text-lg font-bold">My Recipes</h3>
          <p className="text-2xl">{myRecipes.length}</p>
        </div>
        <div className="bg-base-200 p-6 rounded-xl shadow border-l-4 border-accent">
          <h3 className="text-lg font-bold">Logged-in User</h3>
          <p className="text-2xl">{user?.displayName || user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
