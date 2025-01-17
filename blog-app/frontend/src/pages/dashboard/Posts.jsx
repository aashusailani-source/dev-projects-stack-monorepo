import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  useEffect(() => {
    fetchPosts();
  }, [isLoggedIn]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      let response;
      if (token) {
        response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/posts/post/author`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        response = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts`);
      }
      setPosts(response.data.posts);
    } catch (error) {
      console.log(error.response?.data?.message || "Failed to fetch posts");
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen transition duration-300">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">
        Posts
      </h1>

      <div className="mb-8 text-center flex flex-col items-center justify-center">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          {isLoggedIn ? "" : "Create your first post"}
        </h3>
        {isLoggedIn ? (
          <button
            onClick={() => navigate("/dashboard/posts/create")}
            className="mt-4 bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-6 rounded-lg shadow-md focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-500 transition duration-300"
          >
            {posts.length > 0 ? "Create Another Post" : "Create your first post"}
          </button>
        ) : (
          <span
            // onClick={() => navigate("/dashboard/posts/create")}
            className="mt-4 bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-6 rounded-lg shadow-md focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-500 transition duration-300"
          >
            {posts.length > 0 ? "Login or SignUp to create another post" : "Login or SignUp Create Your First Post"}
          </span>
        )}
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center text-gray-700 dark:text-gray-300">
          <p>Loading posts...</p>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Your Posts
          </h3>
          {posts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg transform transition-transform hover:scale-105"
                >
                  <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    {post.title}
                  </h4>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">{post.content}</p>
                  <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                    {isLoggedIn ? "" : "Author: " + post.author.username}
                  </p>
                  <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                    {isLoggedIn ? "" : "Email: " + post.author.email}
                  </p>
                  {isLoggedIn && (
                    <div className="mt-6 flex justify-between space-x-4">
                      <button
                        onClick={() =>
                          navigate(`/dashboard/posts/update/${post._id}`)
                        }
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-yellow-300 dark:focus:ring-yellow-500 transition duration-300"
                      >
                        Update
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/dashboard/posts/delete/${post._id}`)
                        }
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-red-300 dark:focus:ring-red-500 transition duration-300"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-700 dark:text-gray-300">
              No posts found. Start by creating one!
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Posts;
