import React, { useState } from 'react';
import APIService from '../utils/services';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
      email,
      password,
    };

    if (password.length < 6) {
      toast.error('Password length is at least 6', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    try {
      const Api = new APIService();
      await Api.get('users/1', false, data);

      toast.success('User registration successful', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setEmail('');
      setPassword('');

    } catch (error) {
      toast.error('User credential is not correct', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "black",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white h-screen shadow-md rounded-lg overflow-hidden flex m-8 max-w-4xl w-full">
        <div className="w-2/5 bg-blue-500 text-white p-8 flex flex-col">
          <h2 className="text-2xl tracking-wider text-left font-semibold mb-4">Looks like you're new here!</h2>
          <p className="text-lg mb-8 tracking-wider text-left">Sign up with your Email to get started</p>
        </div>
        <div className="w-1/2 p-8">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div className="mb-4">
              <h2 className="text-2xl tracking-wider text-left font-semibold mb-4">Sign up</h2>
              <label htmlFor="email" className="block text-sm text-left font-semibold text-gray-600">Enter your Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 block w-full border-red-600 border-b-2 border-x-0 border-t-0"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm text-left font-semibold text-gray-600">Enter your Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 block w-full border-red-600 border-b-2 border-x-0 border-t-0"
                required
              />
            </div>
            <button type="submit" className="bg-orange-500 text-white py-2 rounded-md font-semibold">CONTINUE</button>
          </form>
          <div className="mt-4 text-center container hover:bg-white py-3 bg-white border-x-2 border-b-2 px-8">
            <Link to="/login" className="text-blue-500">Existing User? Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
