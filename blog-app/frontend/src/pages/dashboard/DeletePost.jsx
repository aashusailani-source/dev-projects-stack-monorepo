import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function DeletePost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/posts/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      console.log("Post deleted successfully");
      navigate("/dashboard/posts");
    } catch (error) {
      console.log(error.response?.data?.message || "Failed to delete post");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 transition duration-300">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
          Are you sure you want to delete this post?
        </h1>
        <div className="flex justify-between mt-6">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring focus:ring-red-300 dark:focus:ring-red-500 transition"
            onClick={handleDelete}
          >
            Yes, Delete
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring focus:ring-gray-200 dark:focus:ring-gray-500 transition"
            onClick={() => navigate("/dashboard/posts")}
          >
            No, Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePost;
