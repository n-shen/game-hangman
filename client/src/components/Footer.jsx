import React from "react";

const Footer = () => {
  return (
    <div className="mt-5 mb-5">
      {/*<div className="flex justify-center mb-2">*/}
      {/*  <img*/}
      {/*    className="rounded-full w-36 h-36"*/}
      {/*    src={}*/}
      {/*    alt="mascot bella"*/}
      {/*  />*/}
      {/*</div>*/}

      <p className="text-center text-gray-500 dark:text-gray-400">
        Developed by{" "}
        <a
          href="https://google.com"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
        >
          Team-2
        </a>{" "}
        for educational purpose only. Copyrights Reserved @2023
      </p>
    </div>
  );
};

export default Footer;
