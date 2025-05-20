import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "Recipe Book App | Home";
  }, []);

  return <div>home</div>;
};

export default Home;
