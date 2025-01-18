import React, {  useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { account } from "../appwrite/appwriteConfig";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { ID } from "appwrite";

function SignUp() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const signupHandler = async (e) => {
    e.preventDefault();
    
    try {
      
      const response = await account.create(
        ID.unique(), 
        user.email,
        user.password
      );
  
      
      toast.success("User Registered Successfully!");
      navigate("/profile")
    
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error(error.message || "Signup failed");
    }
  };
  
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full space-y-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Welcome{" "}
          </h2>
          <form className="space-y-4">
            <ToastContainer theme="light" position="top-center" />
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                onChange={(e)=>{
                  setUser({
                    ...user,
                    name:e.target.value,
                  })
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                onChange={(e)=>{
                  setUser({
                    ...user,
                    email:e.target.value,
                  })
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                onChange={(e)=>{
                  setUser({
                    ...user,
                    password:e.target.value,
                  })
                }}
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onClick={signupHandler}
            >
              Sign Up
            </button>
          </form>
          <div className="text-center text-sm text-gray-500">Or</div>
          <button className="w-full px-4 py-2 border border-gray-300 text-gray-600 font-medium rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center justify-center">
            <FaGoogle className="mr-2" /> Sign in with Google
          </button>
          <div className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to={"/"} className="text-indigo-600 hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
