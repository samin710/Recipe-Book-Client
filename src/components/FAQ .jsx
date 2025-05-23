import React from "react";
import { Typewriter } from "react-simple-typewriter";

const FAQ = () => {
  return (
    <section className="md:mt-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h2>
      <div className="join join-vertical w-full">
        <div className="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="faq" defaultChecked />
          <div className="collapse-title text-lg font-medium text-primary">
            How do I add a recipe?
          </div>
          <div className="collapse-content text-accent">
            <Typewriter
              words={[
                "Go to the “Add Recipe” page from the menu and fill in the recipe details, then click submit",
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={90}
              deleteSpeed={60}
              delaySpeed={1000}
            />
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="faq" />
          <div className="collapse-title text-lg font-medium text-primary">
            Can I edit or delete my recipe later?
          </div>
          <div className="collapse-content text-accent">
            <Typewriter
              words={[
                "Absolutely! You can manage your submitted recipes from your profile page—edit or delete them anytime.",
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={90}
              deleteSpeed={60}
              delaySpeed={1000}
            />
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="faq" />
          <div className="collapse-title text-lg font-medium text-primary">
            Can I see how many people liked my recipe?
          </div>
          <div className="collapse-content text-accent">
            <Typewriter
              words={[
                "Yes, each recipe shows a like count so you can track how popular your dish is among users.",
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={90}
              deleteSpeed={60}
              delaySpeed={1000}
            />
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="faq" />
          <div className="collapse-title text-lg font-medium text-primary">
            Can I add a recipe without creating or logging in to the website?
          </div>
          <div className="collapse-content text-accent">
            <Typewriter
              words={[
                "No, to ensure recipe authenticity and allow you to manage your content, login is required to add recipes.",
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={90}
              deleteSpeed={60}
              delaySpeed={1000}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
