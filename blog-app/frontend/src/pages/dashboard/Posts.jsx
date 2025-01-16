import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Posts() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/posts");
      setPosts(response.data.posts);
      console.log(response.data.posts);
    } catch (error) {
      console.log(error.response?.data?.message || "Failed to fetch posts");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-700">Posts</h1>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Create Your own Post</h3>
        <button
          onClick={() => navigate("/dashboard/posts/create")}
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {
            posts.length > 0 ? "Create Another Post" : "Create Your First Post"
          }
        </button>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Posts</h3>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post._id}
              className="mb-6 p-4 bg-white shadow-md rounded-lg"
            >
              <h4 className="text-2xl font-bold text-gray-800">{post.title}</h4>
              <p className="mt-2 text-gray-700">{post.content}</p>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => navigate(`/dashboard/posts/update/${post._id}`)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Update
                </button>
                <button
                  onClick={() => navigate(`/dashboard/posts/delete/${post._id}`)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-700">No posts found</p>
        )}
      </div>
    </div>
  );
}

export default Posts;
