import React from "react";
import { GiPanda } from "react-icons/gi";

const Footer = () => {
  return (
    <div className="mt-5 mb-5 ">
      <div className="flex justify-center mb-2">
        <GiPanda />
      </div>

      <p className="text-center text-gray-500 dark:text-gray-400">
        Developed by{" "}
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
        >
          LH-Team-2
        </a>{" "}
        for educational purpose only. Copyrights Reserved @2023
      </p>
    </div>
  );
};

export default Footer;
