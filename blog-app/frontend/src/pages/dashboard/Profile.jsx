import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Make the API call using Axios
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Sending the token in the Authorization header
          },
        });
        console.log(response.data);
        // Assuming the response contains the user data
        setUser(response.data.user);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        {user ? (
          <div>
            <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-100 mb-4">Profile</h1>
            
            <div className="mb-4">
              <label htmlFor="username" className="text-lg font-medium text-gray-800 dark:text-gray-200">
                <strong>Name:</strong>
              </label>
              <input
                type="text"
                id="username"
                value={user.username}
                readOnly
                className="w-full p-2 mt-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="text-lg font-medium text-gray-800 dark:text-gray-200">
                <strong>Email:</strong>
              </label>
              <input
                type="email"
                id="email"
                value={user.email}
                readOnly
                className="w-full p-2 mt-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md"
              />
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-600 dark:text-gray-400">No user data found</div>
        )}
      </div>
    </div>
  );
}

export default Profile;
