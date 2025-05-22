import React from "react";
import { EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";
// import "./styles.css";

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

const Slider = () => {
  return (
    <Swiper
      effect={"cards"}
      grabCursor={true}
      modules={[EffectCards]}
      className="w-1/2 h-full"
    >
      {foodImages.map((item, index) => (
        <SwiperSlide key={index} className="overflow-hidden rounded-xl">
          <img
            src={item.url}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
