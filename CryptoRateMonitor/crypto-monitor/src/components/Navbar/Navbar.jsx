import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CoinContext } from '../../context/CoinContext';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'; // For the Hamburger Icon

function Navbar() {
  const { setCurrency } = useContext(CoinContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currencyHandler = (e) => {
    switch (e.target.value) {
      case 'usd':
        setCurrency({ name: 'usd', symbol: '$' });
        break;
      case 'eur':
        setCurrency({ name: 'eur', symbol: '€' });
        break;
      case 'inr':
        setCurrency({ name: 'inr', symbol: '₹' });
        break;
      default:
        setCurrency({ name: 'usd', symbol: '$' });
        break;
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='flex items-center justify-between py-4 px-6 sm:px-8 lg:px-16 border-b-2 bg-black text-white shadow-md'>
      {/* Logo */}
      <Link to="/" className="text-2xl font-semibold hover:text-gray-400 transition-all">
        LOGO
      </Link>

      {/* Desktop Navigation Links */}
      <ul className='hidden sm:flex gap-12 list-none'>
        <li className="text-lg hover:text-gray-400 cursor-pointer transition-all">Home</li>
        <li className="text-lg hover:text-gray-400 cursor-pointer transition-all">Features</li>
      </ul>

      {/* Currency Selector and Sign-Up Button (Desktop) */}
      <div className='hidden sm:flex items-center gap-6'>
        <select
          onChange={currencyHandler}
          className='text-white px-4 py-2 border-2 rounded-xl border-white bg-transparent hover:bg-white hover:text-black transition-all'>
          <option className='bg-black text-white' value="usd">USD</option>
          <option className='bg-black text-white' value="eur">EUR</option>
          <option className='bg-black text-white' value="inr">INR</option>
        </select>
        
        <button className='px-6 py-2 bg-slate-800 rounded-3xl text-white font-semibold hover:scale-105 transition-all'>
          Sign Up
        </button>
      </div>

      {/* Mobile Menu: Currency Selector Outside of the Menu */}
      <div className='sm:hidden flex items-center gap-4'>
        {/* Currency Selector (Visible for Mobile) */}
        <select
          onChange={currencyHandler}
          className='text-white px-4 py-2 border-2 rounded-xl border-white bg-transparent hover:bg-white hover:text-black transition-all'>
          <option className='bg-black text-white' value="usd">USD</option>
          <option className='bg-black text-white' value="eur">EUR</option>
          <option className='bg-black text-white' value="inr">INR</option>
        </select>

        {/* Hamburger Icon for Mobile */}
        <button onClick={toggleMenu} className='text-white'>
          {isMenuOpen ? (
            <AiOutlineClose size={30} />
          ) : (
            <AiOutlineMenu size={30} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-[50vh] bg-black bg-opacity-80 text-white p-4 sm:hidden transition-all ease-in-out duration-300 z-50">
          {/* Close Button */}
          <div className="flex justify-end mb-4">
            <button onClick={toggleMenu} className="text-white text-3xl">
              <AiOutlineClose />
            </button>
          </div>

          <ul className="flex flex-col gap-4 items-center justify-center">
            <li className="text-lg hover:text-gray-400 cursor-pointer">
              <Link to="/" onClick={toggleMenu}>Home</Link>
            </li>
            <li className="text-lg hover:text-gray-400 cursor-pointer">
              <Link to="/features" onClick={toggleMenu}>Features</Link>
            </li>
            <li>
              <button className='w-full py-2 px-6 bg-slate-800 rounded-3xl text-white font-semibold hover:scale-105 transition-all'>
                Sign Up
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
