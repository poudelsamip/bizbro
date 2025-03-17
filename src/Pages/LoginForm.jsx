import React, { useContext, useState } from "react";
import { MainContext } from "../Context/MainProvider";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn } = useContext(MainContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    await logIn(email, password);
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg text-white">
        <h2 className="text-md text-center">Welcome to 👊BizBro</h2>

        <h2 className="text-4xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-500"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="name@company.com"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-500"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            onClick={handleLogin}
            type="submit"
            className="w-full py-2 bg-blue-500 cursor-pointer text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
