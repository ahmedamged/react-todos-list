import React from "react";
import { TodoElement } from "./TodoElement";
import { useState, useEffect } from "react";
import { todosContext } from "../contexts/TodosContext";
import db from "../firebase";
import { ref, set, query, orderByChild, onValue } from "firebase/database";
import { v1 as uuidv1 } from "uuid";

export const TodosList = () => {
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);
  const todosRef = ref(db, "todos");
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const todoId = uuidv1();
    const currentTimestamp = Date.now();
    setTodos([
      ...todos,
      {
        id: todoId,
        timestamp: currentTimestamp,
        todosTitle: todoInput,
        isDone: false,
      },
    ]);
    setTodoInput("");
    set(ref(db, "todos/" + todoId), {
      id: todoId,
      timestamp: currentTimestamp,
      todosTitle: todoInput,
      isDone: false,
    });
  };

  useEffect(() => {
    const todosRefOrdered = query(ref(db, "todos"), orderByChild("timestamp"));
    const unsubscribe = onValue(todosRefOrdered, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert the Firebase object into an array
        const newArray = Object.keys(data).map((key) => ({
          id: key, // Use the Firebase key as an ID
          ...data[key],
        }));
        newArray.sort(function (x, y) {
          return x.timestamp - y.timestamp;
        });
        setTodos(newArray);
      } else {
        setTodos([]); // Handle empty data
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <>
      <todosContext.Provider value={{ todos, setTodos }}>
        {todos.length >= 1 ? (
          todos.map((todo) => (
            <TodoElement
              key={todo.id}
              todoUniqueId={todo.id}
              title={todo.todosTitle}
              isDoneFlag={todo.isDone}
            />
          ))
        ) : (
          <h2>Try to add a new todo to your todo list</h2>
        )}

        <form onSubmit={handleFormSubmit} style={{ marginTop: "30px" }}>
          <input
            type="text"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
            style={{ padding: "10px", borderRadius: "10px", margin: "0 10px" }}
          />
          <button>Add</button>
        </form>
      </todosContext.Provider>
    </>
  );
};
