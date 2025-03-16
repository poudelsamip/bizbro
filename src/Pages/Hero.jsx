const Hero = () => {
  return (
    <div className="flex items-center justify-center h-full bg-gray-900 text-white text-center">
      <div className="flex flex-col">
        <h1 className="text-4xl font-bold mb-4">
          Manage. Succeed. Grow – With BizBro 👊
        </h1>
        <p className="text-lg text-gray-300 mb-6 max-w-4xl">
          Simplify business management with an all-in-one platform that keeps
          your inventory, sales, and customers organized—so you can focus on
          what really matters: growth!
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/login"
            className="cursor-pointer bg-blue-600 hover:bg-blue-800 active:bg-blue-900 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition"
          >
            Sign In
          </a>
          <a
            href="/signup"
            className="cursor-pointer bg-gray-700 hover:bg-gray-800 active:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
