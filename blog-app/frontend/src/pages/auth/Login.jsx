import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        formData
      );
      console.log(response.data.token);
      localStorage.setItem("token", response.data.token);
      console.log("login successful");
      setFormData({ email: "", password: "" });
      navigate("/dashboard/posts");
    } catch (error) {
      console.log(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 transition duration-300">
      <form
        className="bg-white dark:bg-gray-800 dark:text-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm transition-transform transform hover:scale-105"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-6 text-gray-700 dark:text-gray-100 text-center">
          Login
        </h1>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="shadow bg-gray-600 appearance-none border border-gray-300 dark:border-gray-600 rounded-xl w-full py-2 px-3 text-white dark:text-gray-300 leading-tight focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-500 transition duration-300"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="shadow appearance-none bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-xl w-full py-2 px-3 text-white dark:text-gray-300 leading-tight focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-500 transition duration-300"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white font-bold py-2 px-4 w-full rounded-2xl focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-500 transition duration-300"
          >
            Login
          </button>
        </div>
        <div className="text-center mt-5 text-gray-700 dark:text-gray-300 text-sm">
          Don't have an account? <Link className="text-blue-500 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-500" to="/signup">Sign up</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;