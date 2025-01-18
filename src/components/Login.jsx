import React,{useState} from 'react'
import {FaGoogle} from "react-icons/fa"
import { Link, useNavigate } from 'react-router-dom'
import { account } from '../appwrite/appwriteConfig';
import { toast ,ToastContainer} from 'react-toastify';

function Login() {
  const navigate=useNavigate();
    const [user, setUser] = useState({
      name: "",
      email: "",
      password: "",
    });
   
    const loginHandler=async(e)=>{
      
      e.preventDefault();
      try {

          await account.createEmailPasswordSession(user.email,user.password);
          toast.success("User Logged In Successfully!!");
          navigate("/profile");
          
        } catch (error) {
          toast.error(error.message)
        }
    }
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Welcome Back!</h2>
        <form className="space-y-4">
        <ToastContainer theme="light" position="top-center" />
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
              onChange={(e)=>{
                setUser({
                  ...user,
                  email:e.target.value
                })
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
              onChange={(e)=>{
                setUser({
                  ...user,
                  password:e.target.value
                })
              }}
            />
          </div>
         
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={loginHandler}
          >
            Sign In
          </button>
        </form>
        <div className="text-center text-sm text-gray-500">Or</div>
        <button
        
          className="w-full px-4 py-2 border border-gray-300 text-gray-600 font-medium rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center justify-center"
        >
          <FaGoogle className="mr-2" /> Sign in with Google
        </button>
        <div className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Login
