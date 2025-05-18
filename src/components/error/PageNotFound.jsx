import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

const PageNotFound = () => {
  return (
    <section className="bg-gray-900 text-white py-8 px-4 mx-auto h-screen w-screen lg:py-16 lg:px-6">
      <div className="mx-auto text-center">
        <h1 className="text-7xl font-bold lg:text-9xl ranchers-regular">404</h1>
        <p className="mb-4 text-2xl font-bold ranchers-regular">
          Page Not Found
        </p>

        <a
          href="/"
          className="inline-flex items-center gap-2 border broder-gray-400 text-white bg-blue-700 hover:bg-blue-900 font-medium rounded text-sm px-3 py-2 my-4"
        >
          <IoMdArrowRoundBack size={20} />
          Homepage
        </a>
      </div>
    </section>
  );
};

export default PageNotFound;
