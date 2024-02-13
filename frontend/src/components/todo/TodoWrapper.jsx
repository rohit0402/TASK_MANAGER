import React, { useEffect, useState } from "react";
import TodoForm from "./TodoFrom";
import { v4 as uuidv4 } from "uuid";
import "./Todo.css";
import TodoWork from "./TodoWork";
import EditTodoForm from "./EditTodoForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

let userId = sessionStorage.getItem("id");
let email = sessionStorage.getItem("email");
function TodoWrapper() {
  const [todos, setTodos] = useState([]);
  const [check, setCheck] = useState(true);
  const [uid, setUid] = useState();

  useEffect(() => {
    userId = sessionStorage.getItem("id");
    const initialFetch = async () => {
      try {
        if (userId) {
          const res = await axios.get(
            `${window.location.origin}/api/v2/gettask/${userId}`
          );
          setTodos(res.data.list); // Use setTodos directly
          setCheck(!check);
        }
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    };
    initialFetch();
  }, []);

  useEffect(() => {
    fetch();
  }, [check]);

  const fetchUid = async () => {
    let userId = await sessionStorage.getItem("id");
    setUid(userId);
  };

  const fetch = async () => {
    try {
      if (userId) {
        const res = await axios.get(
          `${window.location.origin}/api/v2/gettask/${userId}`
        );
        setTodos(res.data.list); // Use setTodos directly
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async (value) => {
    try {
      if (userId) {
        const res = await axios.post(`${window.location.origin}/api/v2/addtask`, {
          title: value,
          email: email,
        });

        const newTask = {
          id: uuidv4(),
          task: value,
          isCompleted: false,
          isEditing: false,
        };
        setTodos((prevTodos) => {
          if (!prevTodos || !Array.isArray(prevTodos)) {
            return [newTask];
          } else {
            return [...prevTodos, newTask];
          }
        });
        setCheck(!check);
        toast.success("you have added a new task");
      }else{
        toast.error("please signin/signup first");
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      await axios.put(`${window.location.origin}/api/v2/isComplete/${id}`, {
        email,
      });
      setTodos((prevTodos) =>
      prevTodos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
      );
      setCheck(!check);
      const updatedTodo = todos.find((todo) => todo._id === id);
      if (updatedTodo && updatedTodo.isCompleted===false) {
        toast.success("Well done! You completed your task");
      }
    } catch (error) {
      console.error("Error toggling complete status:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(
        `${window.location.origin}/api/v2/deleteTask/${id}?email=${email}`
      );
      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => todo.id !== id);
      });
      setCheck(!check);
      toast.success("your task is deleted");
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const editTodo = async (id) => {
    try {
      await axios.put(`${window.location.origin}/api/v2/isEditing/${id}`, {
        email,
      });

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
        )
      );
      setCheck(!check);
    } catch (error) {
      console.error("Error toggling complete status:", error);
    }
  };

  const editTask = async (task, id) => {
    try {
      await axios.put(`${window.location.origin}/api/v2/editTask/${id}`, {
        title: task,
        email: email,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
        )
      );

      await axios.put(`${window.location.origin}/api/v2/isEditing/${id}`, {
        email: email,
      });
      setCheck(!check);
      toast.success("your task is updated");
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  return (
    <div className="TodoWrapper">
      <h1>Work to Complete!</h1>
      <TodoForm addTodo={addTodo} />
      {todos && todos.length > 0 ? (
        todos.map((todo, index) =>
          todo.isEditing ? (
            <EditTodoForm
              key={index}
              editTodo={editTask}
              task={todo}
              id={todo._id}
            />
          ) : (
            <TodoWork
              key={index}
              task={todo}
              toggleComplete={() => toggleComplete(todo._id)}
              deleteTodo={() => deleteTodo(todo._id)}
              editTodo={() => editTodo(todo._id)}
            />
          )
        )
      ) : (
        <p style={{ color: "white" }}>
          {userId ? "No tasks added yet" : "Loading..."}
        </p>
      )}
    </div>
  );
}

export default TodoWrapper;