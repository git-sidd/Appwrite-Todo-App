import React,{useState} from 'react'
import { databases } from '../appwrite/appwriteConfig';
import { ID } from 'appwrite';
import { ToastContainer,toast } from 'react-toastify';

function TodoForm() {
  const [todo,setTodo]=useState("")
  const [loading, setLoading] = useState(false);
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      const response = await databases.createDocument(
        "6788a99600291d715f66", // Replace with your actual Database ID
        "6788a9b000051f8f1df6", // Replace with your actual Collection ID
        ID.unique(), // Unique ID for the document
        { todo } // Data to store in the document
      );
      console.log("Todo added successfully:", response);
      e.target.reset();
      
      toast("Todo added successfully!");
    } catch (error) {
      console.log(error)
    }finally {
      setLoading(false); 
    }
    

    

  }
  return (
    <div>
      <ToastContainer/>
      <form action="" onSubmit={handleSubmit} className='flex gap-3 m-4 justify-center items-center  w-full'>

      <input className='border-2 p-2 w-[70%] text-black rounded-md' type="text" placeholder='Enter Todo:' onChange={(e)=>{
        setTodo(e.target.value)
      }}/>
      <button className='bg-black p-2 rounded-md text-white  w-[20%]'  type='submit'> {loading ? "Adding..." : "Add Todo"}</button>
      </form>
    </div>
  )
}

export default TodoForm
