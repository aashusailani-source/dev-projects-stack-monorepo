import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.title || !formData.content) {
        throw new Error("Title and content are required");
      }

      if (!localStorage.getItem("token")) {
        alert("You are not logged in");
        return;
      }

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/posts/create`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      console.log("Post created successfully");
      setFormData({ title: "", content: "" });
      navigate("/dashboard/posts");
    } catch (error) {
      console.log(error.response?.data?.message || "Failed to create post");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 transition duration-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 dark:text-gray-200 shadow-lg rounded-xl p-8 w-full max-w-md transition-transform transform hover:scale-105"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-700 dark:text-gray-100">
          Create Post
        </h1>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter title"
            value={formData.title}
            onChange={handleChange}
            className="shadow bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg w-full py-2 px-3 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring focus:ring-green-500 transition duration-300"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="content"
            className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2"
          >
            Content
          </label>
          <textarea
            name="content"
            placeholder="Enter content"
            value={formData.content}
            onChange={handleChange}
            className="shadow bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg w-full py-2 px-3 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring focus:ring-green-500 transition duration-300"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-green-500 dark:bg-green-600 hover:bg-green-700 dark:hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg w-full focus:outline-none focus:ring focus:ring-green-300 dark:focus:ring-green-500 transition duration-300"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
