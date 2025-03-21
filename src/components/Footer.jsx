import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-800 px-6 md:px-16 lg:px-24 pt-20 md:pt-25 pb-4">
      <div className="flex flex-col justify-between sm:flex-row sm:items-end">
        <div>
          <p className="text-white ranchers-regular font-bold text-5xl md:text-6xl">
            BIZBRO
          </p>
          <p className="text-white font-semibold text-xs md:text-sm">
            Manage. Succeed. Grow
          </p>
        </div>
        <p className="text-white font-semibold text-xs md:text-sm mt-2">
          © {new Date().toLocaleDateString("en-US", { year: "numeric" })} Samip
          Poudel, All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
