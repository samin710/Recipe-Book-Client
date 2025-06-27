import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logImg from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-content px-6 py-10 flex flex-col items-center text-center space-y-6 md:mt-8 mt-4">
      <div>
        <img src={logImg} alt="Logo" className="w-16 rounded-md mx-auto mb-2" />
        <p className="font-bold text-lg">Recipe Book App</p>
        <p className="text-sm">
          Copyright © {new Date().getFullYear()} - All rights reserved
        </p>
      </div>

      <div className="text-sm space-y-1">
        <p>Email: support@recipebookapp.com</p>
        <p>Phone: +880 1234567890</p>
        <p>Address: Mirpur-12, Dhaka, Bangladesh</p>
      </div>

      <div className="flex gap-5 text-2xl">
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://x.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          <FaXTwitter />
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          <FaInstagram />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
