import React from "react";
import { FaArrowDownLong } from "react-icons/fa6";

const MainHero = () => {
  return (
    <div className="flex relative items-center justify-center h-screen bg-gray-800 text-white text-center px-6 md:px-16 lg:px-24 py-16 md:py-24">
      <div className="flex flex-col">
        <h1 className=" mb-4">
          <p className="ranchers-regular font-bold text-5xl md:text-9xl">
            BIZBRO
          </p>
          <p className="ranchers-regular md:text-3xl">Manage. Succeed. Grow</p>
          {/* <span className="mt-4">👊</span> */}
        </h1>
        <p className="text-md text-gray-300 mb-6 max-w-4xl ">
          Simplify business management with an ALL-IN-ONE platform that keeps
          your inventory, customers, sales and transactions organized—so you can
          focus on what really matters: growth!
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/login"
            className="cursor-pointer bg-blue-600 hover:bg-blue-800 active:bg-blue-900 text-white font-semibold py-2 px-3 md:py-3 md:px-6  shadow-lg transition"
          >
            Log In
          </a>
          <a
            href="/signup"
            className="cursor-pointer bg-gray-700 hover:bg-gray-800 active:bg-gray-900 text-white font-semibold py-2 px-3 md:py-3 md:px-6  shadow-lg transition"
          >
            Sign Up
          </a>
        </div>
      </div>
      <div className="absolute bottom-15 text-3xl">
        <FaArrowDownLong />
      </div>
    </div>
  );
};

export default MainHero;
