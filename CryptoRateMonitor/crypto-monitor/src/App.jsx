
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './pages/Home/Home.jsx';
import Coin from './pages/Coin/Coin.jsx';

const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Home />
        </>
      ),
    },
    {
      path: "/coin/:id",
      element: (
        <>
          <Navbar />
          <Coin />
        </>
      ),
    },
  ]);


function App() {
  
  return (
    <div className='min-h-[100vh] bg-gray-900 text-white'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
