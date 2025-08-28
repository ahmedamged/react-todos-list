import React from "react";
import { TodoElement } from "./TodoElement";
import { useState } from "react";
import { todosContext } from "../contexts/TodosContext";

export const TodosList = () => {
  const [todoId, setTodoId] = useState(4);
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([
    { id: 1, todosTitle: "Finish editing your posts", isDone: true },
    { id: 2, todosTitle: "Add more motivational videos", isDone: false },
    { id: 3, todosTitle: "Create more advanced articles", isDone: false },
  ]);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setTodoId((prevId) => prevId + 1);
    setTodos([...todos, { id: todoId, todosTitle: todoInput, isDone: false }]);
    setTodoInput("");
  };
  return (
    <>
      <todosContext.Provider value={{ todos, setTodos }}>
        {todos.length >= 1 ? (
          todos.map((todo) => (
            <TodoElement
              key={todo.id}
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
