import React from "react";
import { EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";
// import "./styles.css";

const foodImages = [
  {
    url: "https://i.ibb.co/Df3SRKR1/Spaghetti-with-Chicken-Cutlet-and-Tomatoes.png",
  },
  {
    url: "https://i.ibb.co/ycCf10z1/Mouthwatering-Cheeseburger-on-Ceramic-Plate.png",
  },
  {
    url: "https://i.ibb.co/JRKG5rst/Penne-Pasta-with-Tomato-Sauce-and-Basil.png",
  },
  {
    url: "https://i.ibb.co/dJH5Ympr/Vibrant-Greek-Salad-on-Beige-Countertop.png",
  },
  {
    url: "https://i.ibb.co/tpGCKHwW/Stir-Fried-Noodles-with-Vegetables-and-Chicken.png",
  },
];

const Slider = () => {
  return (
    <Swiper
      effect={"cards"}
      grabCursor={true}
      modules={[EffectCards]}
      className=" md:w-1/2 h-1/2 md:h-[600px]"
    >
      {foodImages.map((item, index) => (
        <SwiperSlide key={index} className="overflow-hidden rounded-xl">
          <img src={item.url} className="w-full h-full object-cover" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
