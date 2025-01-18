import React, { useEffect, useState } from 'react'
import { account } from '../appwrite/appwriteConfig.js';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TodoForm from "./TodoForm.jsx"
import Todo from "./Todo.jsx"
function Profile() {
  const profileimg="/siddimg.jpg"
  const navigate=useNavigate();
  const [userDetails,setUserDetails]=useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(()=>{
    const getData=account.get();
    getData.then(
      function(response){
        setUserDetails(response);
      },
      function(error){
        console.log(error)
      }
    )
  },[]);

  const logoutHandler=async()=>{
    try {
      await account.deleteSession("current");
      navigate("/")
      
    } catch (error) {
      alert(error);
    }
  }
  return (
    
    <div>
        <div className="bg-blue-600 text-white">
        {/* TopBar */}
        <div className="flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-semibold">Todo App </h1>
  
          {/* Profile Section */}
          <div className="relative">
            {/* Profile Icon */}
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <img
                src={profileimg}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <span className="hidden sm:block font-semibold">{userDetails?.email}</span>
            </button>
  
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-lg">
                {userDetails ? (
                  <div className="p-4">
                    <p className="font-semibold">{userDetails.name}</p>
                    <p className="text-sm text-gray-500">{userDetails.email}</p>
                    <hr className="my-2" />
                    <button
                      onClick={logoutHandler}
                      className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="p-4 text-center">
                    <Link to={"/"}>
                    <button className='bg-black text-white p-2' >
                      Login
                    </button></Link>
                  </div>
                )}
             
              </div>
            )}
          </div>
        </div>
        
      </div>
      <TodoForm/>
      <Todo/>
    </div>

  )
}

export default Profile
