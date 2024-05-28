import React from 'react';
import { PiShoppingCartFill } from "react-icons/pi";
import Search from './Searchbar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './redux/actions';

const Navbar = () => {
  
  const isAuthenticated = useSelector(state => state.isAuthenticated);
  const cart = useSelector(state => state.cart);

  const dispatch = useDispatch();

  const handleLogout = () => {
    // remove token from local storage & Update isAUthenticated in redux to false after logout
    dispatch(logout());
  }

  return (
    <nav className="fixed top-0 w-full flex flex-col md:flex-row  h-16 gap-8 bg-white shadow-md p-4 z-10">
      <div className="flex items-center justify-center ml-40 w-full md:w-auto ">
        <div className="p-2">
          <img src='./src/assets/flip.jpg' className='h-14 w-20 py-2' alt='Logo' />
        </div>
        <Search  className="w-full md:w-auto " />
      </div>
      <div className="flex mr-60 items-center justify-center w-full md:w-auto gap-12 mt-4 md:mt-0">
        {
          isAuthenticated ? 
          <button onClick={()=>handleLogout()} className="py-2 text-md text-blue-950 px-4 gap-2 hover:border-none flex items-center rounded hover:bg-blue-700 hover:text-white">
            <img src='https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg' alt="Profile Icon" className="h-6 w-6" /> Logout
          </button>
          :
          <Link to="/signup" className="py-2 text-md text-blue-950 px-4 gap-2 hover:border-none flex items-center rounded hover:bg-blue-700 hover:text-white">
            <img src='https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg' alt="Profile Icon" className="h-6 w-6" /> Login
          </Link>

        }
        
        <div className="relative text-lg flex items-center gap-2">
          <PiShoppingCartFill className='h-6 w-6 text-black' /> Cart <div>{Object.values(cart).reduce((sum, item) => parseInt(sum) + parseInt(item.quantity), 0)}</div>

          <PiShoppingCartFill className='h-6 w-6 text-black' /> Cart <div>{Object.values(cart).length}</div>
          <div className="relative text-lg flex items-center gap-2">
          <Link to="/product">Shop</Link>
        </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
