import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenSquare,
  faTrash,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import "./Todo.css";

function TodoWork({ task, toggleComplete, deleteTodo, editTodo }) {
  const notifycomp = (comp) => {
    comp.preventDefault();
  };

  return (
    <div className="Todo" key={task._id}>
      <p
        onClick={(comp) => {
          toggleComplete(task._id);  // Update here
          notifycomp(comp);
        }}
        className={task.isCompleted ? "completed my-2" : "my-2"}  // Update here
      >
        {task.title}  
      </p>

      <div className="edicon ms-auto">
        <FontAwesomeIcon
          onClick={(event) => {
            event.preventDefault();
            toggleComplete(task._id);  
            notifycomp(event);
          }}
          className={task.isCompleted ? "completed mx-2" : "mx-2"}  
          icon={faCheck}
        />
        <FontAwesomeIcon
          onClick={() => {
            editTodo(task._id);  
          }}
          className="edit-icon"
          icon={faPenSquare}
        />
        <FontAwesomeIcon
          onClick={() => {
            deleteTodo(task._id);  
          }}
          className="delete-icon"
          icon={faTrash}
        />
      </div>
    </div>
  );
}

export default TodoWork;
