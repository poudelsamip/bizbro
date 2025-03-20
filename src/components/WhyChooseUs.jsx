import React from "react";
import { whyChooseUs } from "../assets/assets";

const WhyChooseUs = () => {
  return (
    <div className="bg-gray-800 text-white px-6 md:px-16 lg:px-24 py-16 md:py-24">
      <div className="mb-10">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-1 teko-regular">
            Why Choose Us ?
          </h1>
          <p className="text-2xl text-gray-300 teko-regular">
            There are many business management systems out there but we are
            different.
            <br /> We deliver exceptional value through our expertise,
            innovation, and unwavering commitment to client success.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {whyChooseUs.map((item, index) => (
          <div
            key={index}
            className="bg-slate-800 p-5 rounded border border-gray-400 shadow-2xl"
          >
            <h1 className="text-xl boldonse-regular">{item.title}</h1>
            <p className="my-4">{item.description}</p>
            <img src={item.image} />
          </div>
        ))}
      </div>

      <p className="text-white text-lg boldonse-regular pl-1 mt-4 shadow-2xl">
        and many more features to make your business journey easier ...
      </p>
    </div>
  );
};

export default WhyChooseUs;
