import React from "react";
import { FaStar } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";

const UserFeedback = () => {
  const reviews = [
    {
      name: "Ariana M.",
      text: '"I love how easy it is to find and save recipes! It’s my daily go-to."',
      rating: 5,
    },
    {
      name: "James K.",
      text: '"Clean UI and lots of delicious options. Would love more vegetarian filters!"',
      rating: 4,
    },
    {
      name: "Sadia R.",
      text: '"Finally an app that helps me organize my recipes in one place."',
      rating: 5,
    },
    {
      name: "Leo D.",
      text: '"Amazing app! The top recipes section keeps me inspired every day."',
      rating: 5,
    },
  ];

  return (
    <section className="md:mt-8 mt-4 ">
      <h2 className="text-4xl font-bold text-center md:mb-10 mb-5 ">
        What Our Users Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reviews.map((review, idx) => (
          <div
            key={idx}
            className="bg-base-100 shadow-primary shadow-md rounded-xl p-6 flex flex-col items-center text-center border border-secondary"
          >
            <div className="text-yellow-400 flex gap-1 mb-2">
              {Array.from({ length: review.rating }, (_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <p className=" text-sm mb-3">
              <Typewriter
                words={[review.text]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={90}
                deleteSpeed={60}
                delaySpeed={1000}
              />
            </p>
            <h4 className="text-md font-semibold text-primary">
              {review.name}
            </h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserFeedback;
