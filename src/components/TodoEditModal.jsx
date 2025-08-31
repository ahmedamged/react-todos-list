import React, { useState, useContext } from "react";
import { todosContext } from "../contexts/TodosContext";
import db from "../firebase";
import { ref, update } from "firebase/database";

export const TodoEditModal = ({ todoUniqueId, setIsEditModalShown, title }) => {
  const [todoEdit, setTodoEdit] = useState("");
  const { todos, setTodos } = useContext(todosContext);

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
  };

  const handleEditClick = () => {
    const editedTodoRef = ref(db, "todos/" + todoUniqueId);
    let newUpdatedTodo = {};
    const newTodos = [...todos];
    newTodos.map((todo) => {
      if (todo.id === todoUniqueId) {
        todo.todosTitle = todoEdit;
        newUpdatedTodo = { ...todo };
      }
    });
    update(editedTodoRef, newUpdatedTodo)
      .then(() => {
        setTodos(newTodos);
        setIsEditModalShown((prev) => !prev);
      })
      .catch((error) => {
        console.error("Error updating object:", error);
      });
  };

  const handleCancelClick = () => {
    setIsEditModalShown((prev) => !prev);
  };
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0, 0.8)",
          position: "absolute",
          top: "0",
          left: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{ background: "white", padding: "50px", borderRadius: "20px" }}
        >
          <h4 style={{ marginBottom: "50px" }}>Edit Todo Title</h4>
          <form onSubmit={handleEditFormSubmit}>
            <input
              type="text"
              value={todoEdit}
              onChange={(e) => setTodoEdit(e.target.value)}
              autoFocus
              style={{
                padding: "10px",
                borderRadius: "10px",
                margin: "0 10px",
              }}
            />
            <button onClick={handleEditClick} type="submit">
              Edit
            </button>
            <button onClick={handleCancelClick}>Cancel</button>
          </form>
        </div>
      </div>
    </>
  );
};
