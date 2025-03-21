import React from "react";
import { FaArrowDownLong } from "react-icons/fa6";
import { motion } from "framer-motion";

const fadeInUpAnimation = {
  start: {
    opacity: 0,
    y: 200,
  },
  end: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.4,
      duration: 0.7,
    },
  },
};

const MainHero = () => {
  return (
    <div className="flex relative items-center justify-center h-screen bg-gray-800 text-white text-center px-6 md:px-16 lg:px-24 py-16 md:py-24">
      <motion.div
        className="flex flex-col"
        initial="start"
        animate="end"
        variants={fadeInUpAnimation}
      >
        <motion.h1 className="mb-4" variants={fadeInUpAnimation}>
          <p className="ranchers-regular font-bold text-5xl md:text-9xl">
            BIZBRO
          </p>
          <p className="ranchers-regular md:text-3xl">Manage.Succeed.Grow</p>
        </motion.h1>
        {/* <motion.p
          variants={fadeInUpAnimation}
          className="text-sm text-gray-300 font-semibold mb-6 max-w-4xl"
        >
          Maximize Efficiency and Streamline Your Business Operations with
          All-in-One Solutions for Managing Inventory, Tracking Sales,
          Organizing Customer Information, Handling Transactions, and Generating
          Invoices, All from a Single Powerful Platform.
        </motion.p> */}
        <motion.div
          variants={fadeInUpAnimation}
          className="flex justify-center gap-4"
        >
          <a
            href="/login"
            className="cursor-pointer bg-blue-600 hover:bg-blue-800 active:bg-blue-900 text-white font-semibold py-2 px-3 md:py-3 md:px-6 shadow-lg transition"
          >
            Log In
          </a>
          <a
            href="/signup"
            className="cursor-pointer bg-gray-700 hover:bg-gray-800 active:bg-gray-900 text-white font-semibold py-2 px-3 md:py-3 md:px-6 shadow-lg transition"
          >
            Sign Up
          </a>
        </motion.div>
      </motion.div>
      <motion.div
        className="absolute bottom-20 text-3xl"
        initial={{ visibility: "hidden", y: 0 }}
        animate={{ visibility: "visible", y: [0, 10, 0] }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <FaArrowDownLong />
      </motion.div>
    </div>
  );
};

export default MainHero;
