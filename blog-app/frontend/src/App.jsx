import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Posts from "./pages/dashboard/Posts";
import CreatePost from "./pages/dashboard/CreatePost";
import UpdatePost from "./pages/dashboard/UpdatePost";
import DeletePost from "./pages/dashboard/DeletePost";
import Navbar from "./components/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Signup />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard/posts",
    element: <Posts />,
  },
  {
    path: "/dashboard/posts/create",
    element: <CreatePost />,
  },
  {
    path: "/dashboard/posts/update/:id",
    element: <UpdatePost />,
  },
  {
    path: "/dashboard/posts/delete/:id",
    element: <DeletePost />,
  },
]);

const App = () => {
  return <div>
    <Navbar/> {/* use layout to fix the error */}
    <RouterProvider router={router} />
  </div>
};

export default App;