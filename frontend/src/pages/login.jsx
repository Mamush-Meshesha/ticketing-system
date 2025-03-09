import React, { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authRequest } from "../stores/redux/auth";

const Login = ({ type }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: "", email: "" });
  const isLogin = type === "login";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const { isLoading, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(authRequest(form));
  };

  useEffect(() => {
    if (!isLoading && user) {
      navigate("/dashboard");
    }
  }, [isLoading, user, navigate]);

  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-900 text-white overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50%" cy="50%" r="300" fill="rgba(255,255,255,0.1)" />
        <circle cx="20%" cy="30%" r="100" fill="rgba(255,255,255,0.15)" />
        <circle cx="80%" cy="70%" r="150" fill="rgba(255,255,255,0.2)" />
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 bg-gray-800 p-8 rounded-lg shadow-lg w-96 text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={form.email}
            placeholder="Email"
            className="w-full p-2 rounded bg-gray-700"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            placeholder="Password"
            className="w-full p-2 rounded bg-gray-700"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 p-2 rounded flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3m-3 3l-3-3"
                ></path>
              </svg>
            ) : (
              "Login"
            )}
          </button>{" "}
        </form>
        <p className="mt-4 text-sm">
          {isLogin ? "Already have an account ?" : " Don't have an account?"}{" "}
          <span
            className="!text-blue-400 cursor-pointer"
            onClick={() => navigate(isLogin ? "/login" : "/")}
          >
            {isLogin ? "login" : "Register"}
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
