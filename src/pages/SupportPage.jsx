import React from "react";

const SupportPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Need Help?</h1>

      {/* Quick Help Section */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
        <ul className="list-disc list-inside space-y-2 text-base-content">
          <li>
            <a href="/#faq" className="link link-hover text-primary">
              Go to Frequently Asked Questions
            </a>
          </li>
          <li>
            <a href="/allRecipes" className="link link-hover text-primary">
              Search Recipes
            </a>
          </li>
          <li>
            <a href="/#faq" className="link link-hover text-primary">
              How to Add a Recipe
            </a>
          </li>
          <li>
            <a href="/dashBoard" className="link link-hover text-primary">
              Manage Your Account
            </a>
          </li>
        </ul>
      </section>

      {/* Report an Issue */}
      <section className="bg-base-200 p-6 rounded-lg mb-10">
        <h2 className="text-xl font-semibold mb-4">Report an Issue</h2>
        <form className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Your Email</span>
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Describe the Issue</span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full"
              rows="4"
              placeholder="E.g., I can't log in, recipe upload failed, etc."
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit Report
          </button>
        </form>
      </section>

      {/* Contact Options */}
      <section className="text-center">
        <h2 className="text-xl font-semibold mb-2">Still Need Help?</h2>
        <p className="mb-4">You can reach out directly to our team:</p>
        <p className="mb-1">
          📧 Email:{" "}
          <a href="mailto:support@recipebook.com" className="link">
            support@recipebook.com
          </a>
        </p>
        <p>💬 Chat: Coming Soon</p>
      </section>
    </div>
  );
};

export default SupportPage;
