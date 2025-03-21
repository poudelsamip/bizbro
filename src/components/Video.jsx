import React from "react";
import demovideo from "../assets/demovideo.mp4";

const Video = () => {
  return (
    <div className="bg-gray-800  px-6 md:px-16 lg:px-24 py-16 md:py-24 flex flex-col justify-center">
      <div className="max-w-4xl">
        <h1 className="text-4xl text-white md:text-5xl font-bold teko-regular">
          Watch demo
        </h1>
        <p className="text-2xl text-gray-300 teko-regular">
          Have a look at our easy-to-use user-friendly web app.
        </p>
      </div>
      <div>
        <video
          src={demovideo}
          controls
          autoPlay
          className="border border-gray-400 shadow-2xl"
        ></video>
      </div>
    </div>
  );
};

export default Video;
