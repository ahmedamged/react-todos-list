import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { todosContext } from "../contexts/TodosContext";
import db from "../firebase";
import { ref, update } from "firebase/database";

export const TodoEditModal = ({
  todoUniqueId,
  setIsEditModalShown,
  title,
  userId,
}) => {
  const [todoEdit, setTodoEdit] = useState(title);
  const { todos, setTodos } = useContext(todosContext);

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
  };

  const handleEditClick = () => {
    const editedTodoRef = ref(db, `todos/${userId}/${todoUniqueId}`);
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
          zIndex: "2",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "50px",
            borderRadius: "20px",
            zIndex: "3",
          }}
        >
          <h4 style={{ marginBottom: "50px" }}>Edit Todo Title</h4>
          <form onSubmit={handleEditFormSubmit}>
            <TextField
              label="Edit a Todo"
              variant="outlined"
              size="small"
              helperText="Please edit your todo"
              value={todoEdit}
              onChange={(e) => setTodoEdit(e.target.value)}
              autoFocus
              style={{
                margin: "0px 10px 20px",
              }}
            />
            <Button
              variant="contained"
              className="main-btn"
              onClick={handleEditClick}
              type="submit"
              style={{
                background: "#a7d0d3",
                color: "#000000",
                marginRight: "10px",
              }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              className="main-btn"
              onClick={handleCancelClick}
              style={{
                background: "#a7d0d3",
                color: "#000000",
              }}
            >
              Cancel
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};
