import React, { useState, useEffect } from "react";
import "./Todo.css";

function EditTodoForm({ editTodo, task, id }) {
  const [value, setValue] = useState(task.title);


  // Update the value when the task changes
  // useEffect(() => {
  //   setValue(task.title);
  // }, [task.title]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === "") {
      // toast.error("Please Add Task before submit");
    } else {
      editTodo(value, id);
      
    setValue(""); // Reset input value after editing todo
      // toast.success("List added");
    }
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input my-3"
        value={value}
        placeholder="Edit Task"
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="todo-btn ms-auto">
        Edit Task
      </button>
    </form>
  );
}

export default EditTodoForm;
