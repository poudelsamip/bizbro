import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-800 px-6 md:px-16 lg:px-24 pt-10 md:pt-25 pb-4">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-white ranchers-regular font-bold text-3xl md:text-6xl">
            BIZBRO
          </p>
          <p className="text-white font-semibold md:text-sm">
            Manage. Succeed. Grow
          </p>
        </div>
        <p className="text-white md:text-md mt-2 font-semibold">
          © {new Date().toLocaleDateString("en-US", { year: "numeric" })}, Samip
          Poudel
        </p>
      </div>
    </div>
  );
};

export default Footer;
