import { useState } from "react";
import { MdSupportAgent } from "react-icons/md";
import { IoMdCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";

const Hero = () => {
  const [support, setSupport] = useState(false);

  return (
    <div className="flex items-center justify-center h-full bg-gray-900 text-white text-center">
      <div className="absolute top-8 border-3 border-green-900 bg-green-500 px-5 py-3 text-black">
        Login credentials for demo account
        <br />
        is given in sign in page
      </div>
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold mb-4">
          <p className="ranchers-regular text-9xl">BIZBRO</p>
          <p className="ranchers-regular ">Manage. Succeed. Grow</p>
          {/* <span className="mt-4">👊</span> */}
        </h1>
        <p className="text-lg text-gray-300 mb-6 max-w-4xl">
          Simplify business management with an all-in-one platform that keeps
          your inventory, sales, and customers organized—so you can focus on
          what really matters: growth!
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/login"
            className="cursor-pointer bg-blue-600 hover:bg-blue-800 active:bg-blue-900 text-white font-semibold py-3 px-6  shadow-lg transition"
          >
            Sign In
          </a>
          <a
            href="/signup"
            className="cursor-pointer bg-gray-700 hover:bg-gray-800 active:bg-gray-900 text-white font-semibold py-3 px-6  shadow-lg transition"
          >
            Sign Up
          </a>
        </div>
      </div>

      <div className="absolute bottom-5 right-5 flex items-center gap-2">
        <div
          className="text-white p-2 bg-gray-500 cursor-pointer"
          title={support ? "Close" : "Customer Support"}
          onClick={() => setSupport(!support)}
        >
          {support ? <IoCloseSharp size={30} /> : <MdSupportAgent size={30} />}
        </div>
        <div className={`${support ? "block" : "hidden"} bg-gray-500 p-2 `}>
          <div className="flex items-center gap-1 text-sm">
            <IoMdCall className="text-white " /> +977 9801234567
          </div>
          <div className="flex items-center gap-1 text-sm">
            <MdEmail className="text-white" /> info@bizbro.com
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
