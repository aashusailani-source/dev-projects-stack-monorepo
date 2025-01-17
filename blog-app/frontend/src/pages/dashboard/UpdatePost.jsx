import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdatePost() {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!localStorage.getItem("token")) {
        alert("You are not logged in");
        return;
      }

      if (!formData.title || !formData.content) {
        throw new Error("Title and content are required");
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/posts/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      console.log("Post updated successfully");
      navigate("/dashboard/posts");
    } catch (error) {
      console.log(error.response?.data?.message || "Failed to update post");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 transition duration-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-lg"
      >
        <h1 className="text-3xl font-bold text-center text-gray-700 dark:text-gray-100 mb-6">
          Update Post
        </h1>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="block w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter title"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="content"
            className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2"
          >
            Content
          </label>
          <input
            type="text"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="block w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter content"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdatePost;
