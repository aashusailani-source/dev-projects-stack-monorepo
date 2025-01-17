import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('token');

  // Handle logout
  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800 dark:text-gray-200">
      <h1 className="text-2xl font-bold">Navbar</h1>
      <ul className="flex items-center gap-4">
        <li>
          <Link className="hover:text-blue-500 dark:hover:text-blue-300" to="/">
            Home
          </Link>
        </li>
        
        {isLoggedIn ? (
          <>
            {/* Show Profile link if the user is logged in */}
            <li>
              <Link
                className="hover:text-blue-500 dark:hover:text-blue-300"
                to="/dashboard/profile"
              >
                Profile
              </Link>
            </li>
            <li>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            {/* Show Login and Signup links if the user is not logged in */}
            <li>
              <Link
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-600"
                to="/login"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 dark:bg-yellow-700 dark:hover:bg-yellow-600"
                to="/signup"
              >
                Signup
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
