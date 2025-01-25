import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Posts from "./pages/dashboard/Posts";
import CreatePost from "./pages/dashboard/CreatePost";
import UpdatePost from "./pages/dashboard/UpdatePost";
import DeletePost from "./pages/dashboard/DeletePost";
import Layout from "./components/Layout";
import Profile from "./pages/dashboard/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Wrap routes with the Layout component
    children: [
      {path: "/", element: <Posts/>},
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
      { path: "/dashboard/posts", element: <Posts /> },
      { path: "/dashboard/posts/create", element: <CreatePost /> },
      { path: "/dashboard/posts/update/:id", element: <UpdatePost /> },
      { path: "/dashboard/posts/delete/:id", element: <DeletePost /> },
      { path: "/dashboard/profile", element: <Profile /> },
    ],
  },
]);

const App = () => {
  return <div>
    <RouterProvider router={router} />
  </div>
};

export default App;