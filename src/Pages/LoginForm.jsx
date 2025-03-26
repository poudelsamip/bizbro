import React, { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { LuEye } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { logIn } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError("");

    try {
      await dispatch(logIn({ email, password })).unwrap();
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setLoginError(error || "Login failed. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-full px-6 md:px-16 lg:px-24 py-5 md:py-10">
      <div className="absolute top-5 mx-auto border-3 border-green-900 bg-green-500 px-5 py-3">
        For Demo use this login credential
        <br />
        email : demo@gmail.com
        <br />
        password : demopassword
      </div>
      <div className="w-full max-w-md bg-gray-800 p-6 shadow-lg text-white">
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
              className="w-full px-4 py-2 border border-gray-300 outline-0"
              placeholder="name@company.com"
              required
            />
          </div>
          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-500"
            >
              Password
            </label>
            <input
              type={visible ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 outline-0"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              className="absolute top-7 right-3 text-white text-2xl cursor-pointer"
              onClick={() => setVisible(!visible)}
            >
              {visible ? <FaRegEyeSlash /> : <LuEye />}
            </button>
            {loginError && (
              <p className="mt-2 text-red-400 text-xs">{loginError}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={` ${
              loading
                ? "cursor-not-allowed bg-blue-500"
                : "cursor-pointer bg-blue-700"
            } w-full  py-2  text-white`}
          >
            {loading ? "Logging In ..." : " Log In"}
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
