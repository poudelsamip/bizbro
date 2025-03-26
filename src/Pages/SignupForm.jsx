import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
const SignupForm = () => {
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [signupError, setSignupError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSignupError("");

    if (password !== confirmPassword) {
      setSignupError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await dispatch(signUp({ email, password, companyName, name })).unwrap();
      navigate("/dashboard");
    } catch (error) {
      setSignupError(error || "Signup failed. Please try again.");
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-full px-6 md:px-16 lg:px-24 py-5 md:py-10">
      <div className="absolute top-5 right-5 border-3 border-green-900 bg-green-500 px-5 py-3">
        login credential for demo account
        <br />
        is given in login page
      </div>
      <div className="w-full max-w-md bg-gray-800 p-6 shadow-lg text-white">
        <h2 className="text-md text-center">Welcome to 👊BizBro</h2>
        <h2 className="text-4xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-400"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 outline-none"
              required
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="companyName"
              className="block text-sm font-medium text-gray-400"
            >
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 outline-0"
              required
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-400"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 outline-0"
              required
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-400"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 outline-0"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-400"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 outline-0"
              required
            />
            {signupError && (
              <p className="mt-2 text-red-400 text-xs">{signupError}</p>
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
            {loading ? "Signing Up ..." : " Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
