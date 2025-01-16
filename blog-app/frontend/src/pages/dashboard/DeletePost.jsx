import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function DeletePost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/posts/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(response.data);
      console.log('Post deleted successfully');
      navigate('/dashboard/posts');
    } catch (error) {
      console.log(error.response?.data?.message || 'Failed to delete post');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Are you sure you want to delete this post?
        </h1>
        <div className="flex justify-around mt-6">
          <button
            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
            onClick={handleDelete}
          >
            Yes, Delete
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition"
            onClick={() => navigate('/dashboard/posts')}
          >
            No, Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePost;
