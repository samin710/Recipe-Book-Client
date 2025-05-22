import React from "react";

const FAQ = () => {
  return (
    <section className="mt-20 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h2>
      <div className="join join-vertical w-full">
        <div className="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="faq" defaultChecked />
          <div className="collapse-title text-lg font-medium">
            How do I add a recipe?
          </div>
          <div className="collapse-content">
            <p>
              Go to the “Add Recipe” page from the menu and fill in the recipe
              details, then click submit.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="faq" />
          <div className="collapse-title text-lg font-medium">
            Can I save recipes for later?
          </div>
          <div className="collapse-content">
            <p>
              Yes! Click the heart icon to add recipes to your wishlist and view
              them anytime.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="faq" />
          <div className="collapse-title text-lg font-medium">
            Are my saved recipes private?
          </div>
          <div className="collapse-content">
            <p>
              Yes, your wishlist and added recipes are private and only visible
              to you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
