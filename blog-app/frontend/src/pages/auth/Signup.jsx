import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        formData
      );
      console.log(response.data);
      console.log("Signup successful");
      setFormData({ username: "", email: "", password: "", confirmPassword: "" });

      navigate("/login");
    } catch (error) {
      console.log(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 transition duration-300">
      <form
        className="bg-white dark:bg-gray-800 dark:text-gray-200 shadow-md rounded-xl px-8 pt-6 pb-8 w-full max-w-sm transition-transform transform hover:scale-105"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-6 text-gray-700 dark:text-gray-100 text-center">
          Create Account
        </h1>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="shadow bg-gray-600 appearance-none border border-gray-300 dark:border-gray-600 rounded-xl w-full py-2 px-3 text-white dark:text-gray-300 leading-tight focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-500 transition duration-300"
          />
        </div>
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
        <div className="mb-4">
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
            className="shadow bg-gray-600 appearance-none border border-gray-300 dark:border-gray-600 rounded-xl w-full py-2 px-3 text-white dark:text-gray-300 leading-tight focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-500 transition duration-300"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="shadow bg-gray-600 appearance-none border border-gray-300 dark:border-gray-600 rounded-xl w-full py-2 px-3 text-white dark:text-gray-300 leading-tight focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-500 transition duration-300"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white font-bold py-2 px-4 w-full rounded-2xl focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-500 transition duration-300"
          >
            Signup
          </button>
        </div>
        <div className="text-center mt-5 text-gray-700 dark:text-gray-300 text-sm">
          Already have an account?{" "}
          <Link
            className="text-blue-500 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-500"
            to="/login"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
