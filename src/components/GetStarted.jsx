import React from "react";

const GetStarted = () => {
  return (
    <div className="bg-gray-800 text-center px-6 md:px-16 lg:px-24 py-5 md:py-10">
      <h1 className="text-white boldonse-regular mb-3">
        Ready to Streamline Your Business? Start Now!
      </h1>
      <a href="/signup">
        <button className="px-6 py-3 bg-blue-700 text-white font-semibold cursor-pointer hover:bg-blue-500">
          GET STARTED
        </button>
      </a>
    </div>
  );
};

export default GetStarted;
