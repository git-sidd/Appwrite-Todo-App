import React, { useEffect, useState } from 'react'
import { databases } from '../appwrite/appwriteConfig';

function Todo() {
  const [todo,setTodo]=useState("")
  const [loading,setLoading]=useState("");

  useEffect(()=>{
    setLoading(true);
    const getTodos=databases.listDocuments("6788a99600291d715f66","6788a9b000051f8f1df6");

    getTodos.then(
      function(response){
        setTodo(response.documents);
        
      },
      function(error){
        console.log(error)
      }
    )
    setLoading(false);
  },[])

  const deleteTodo=(id)=>{
    console.log("id:",id)
    const promise=databases.deleteDocument("6788a99600291d715f66","6788a9b000051f8f1df6",id);
    promise.then(
      function(response){
        console.log(response);
      },
      function(error){
        console.log(error)
      }
    )

  }
  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Your Todos</h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading todos...</p>
      ) : todo.length === 0 ? (
        <p className="text-center text-gray-600">No todos available. Add some!</p>
      ) : (
        <ul className="space-y-4">
          {todo.map((item) => (
            <li
              key={item.$id}
              className="flex justify-between items-center bg-white p-4 rounded-md shadow hover:shadow-lg transition"
            >
              <span className="text-gray-800 font-medium">{item.todo}</span>
              <button
                onClick={() => deleteTodo(item.$id)}
                className="px-3 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Todo
