// src/components/SignUp.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import APIService from '../utils/services';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions';


const Login = () => {
    
    const [username, setUsername] = useState('johnd');
    const [password, setPassword] = useState('m38rmF$');
  
    const dispatch = useDispatch();

    const navigate = useNavigate();
      

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form default submission

        // Check if password is at least 6 characters long
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
            return; // Exit the function if password is invalid
        }

        const data = {
            username: username,
            password: password
        };

        try {
            const Api = new APIService(); // Creating an instance of APIService
            const result = await Api.post('auth/login', false, data); // Sending login request
            if (result.token) { 
              // Storing token in local storage & Update isAUthenticated in redux to true after successful login
                dispatch(login(result.token));
                toast.success('User logged in successfully', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                navigate('/'); // Redirect to home page
            } else {
                toast.error('User credential is not correct1', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } catch (error) {
            toast.error('User credential is not correct', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };

      
  
      

  return (
    <div className="p-8  flex items-center justify-center bg-gray-100">
      <div className="bg-white min-h-screen shadow-md rounded-lg overflow-hidden flex m-8 max-w-4xl w-full">
        <div className="w-2/5 bg-blue-500 text-white p-8 flex flex-col">
          <h2 className="text-2xl tracking-wider text-left font-semibold mb-4 ">Login</h2>
          <p className="text-lg mb-8 tracking-wider text-left">Get access to your order Wishlist and Recomendation</p>
          
        </div>
        <div className="w-1/2 p-8">
          <form onSubmit={handleSubmit} className="flex flex-col  space-y-4">
            <div className="mb-4">
            <h2 className="text-2xl tracking-wider text-left font-semibold mb-4 ">Login</h2>
              <label htmlFor="mobileNumber" className="block text-sm text-left font-semibold text-gray-600">Enter your username</label>
              <input
                type="text"
                id="mobileNumber"
                placeholder='johnd'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 p-2 block   w-full border-red-600'} border-b-2 border-x-0  border-t-0"
              />
             
            </div>
            <div className="mb-4">
              <label htmlFor="mobileNumber" className="block text-sm text-left font-semibold text-gray-600">Enter your Password</label>
              <input
                type="text"
                id="mobileNumber"
                placeholder='m38rmF$'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 block   w-full border-red-600'} border-b-2 border-x-0  border-t-0"
              />
              
            </div>
            <button type="submit" className="bg-orange-500 text-white py-2 rounded-md font-semibold">CONTINUE</button>
          </form>
          <div className="mt-4 text-center container hover:bg-white py-3  bg-white border-x-2 border-b-2 px-8 ">
            <Link to="signup" className="text-blue-500">Existing User? signup</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
