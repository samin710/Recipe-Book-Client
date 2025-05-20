import React, { useEffect } from "react";
import Slider from "../components/Slider";

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

  return (
    <div>
      <Slider images={foodImages}></Slider>
    </div>
  );
};

export default Home;
