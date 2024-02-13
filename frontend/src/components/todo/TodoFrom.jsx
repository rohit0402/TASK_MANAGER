import React, { useState,useEffect } from "react";
import "./Todo.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function TodoForm({ addTodo }) {
  let userId=sessionStorage.getItem("id");
  const [value, setValue] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value === "") {
      toast.error("Please Add Task before submit");
    } else {
      addTodo(value);
      setValue(""); // Reset input value after adding todo
      // toast.success("List added");
    }
  };
  

  return (
    <form className="TodoForm  " onSubmit={handleSubmit}>
      <ToastContainer/>
      <input
        type="text"
        className="todo-input my-3"
        placeholder="What is today's task?"
        value={value} //  value attribute to input
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="todo-btn ms-auto">
        Add Task
      </button>
    </form>
  );
}

export default TodoForm;
