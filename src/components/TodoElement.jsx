import React, { useState, useContext } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { todosContext } from "../contexts/TodosContext";
import { TodoEditModal } from "./TodoEditModal";
import db from "../firebase";
import { update, ref, remove } from "firebase/database";

export const TodoElement = ({ todoUniqueId, title, isDoneFlag }) => {
  const { todos, setTodos } = useContext(todosContext);
  const [isDone, setIsDone] = useState(isDoneFlag);
  const [isEditModalShown, setIsEditModalShown] = useState(false);

  const handleCheckClick = () => {
    const editedTodoRef = ref(db, "todos/" + todoUniqueId);
    let newUpdatedTodo = {};
    const newTodos = [...todos];
    newTodos.map((todo) => {
      if (todo.id === todoUniqueId) {
        todo.isDone = !isDoneFlag;
        newUpdatedTodo = { ...todo };
      }
    });
    update(editedTodoRef, newUpdatedTodo)
      .then(() => {
        setIsDone((prev) => !prev);
        setTodos(newTodos);
      })
      .catch((error) => {
        console.error("Error updating object:", error);
      });
  };

  const handleEditClick = () => {
    setIsEditModalShown((prev) => !prev);
  };

  const handleDeleteClick = () => {
    const itemRef = ref(db, `todos/${todoUniqueId}`);
    remove(itemRef)
      .then(() => {
        const newTodos = [...todos];
        setTodos(newTodos.filter((todo) => todo.id !== todoUniqueId));
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(139, 185, 193, 0.5)",
          padding: "0 20px",
          borderRadius: "10px",
          marginBottom: "10px",
          minWidth: "450px",
          maxWidth: "450px",
        }}
      >
        <p
          style={{
            textDecoration: isDone ? "line-through" : "none",
            overflow: "hidden",
          }}
        >
          {title}
        </p>
        <div style={{ minWidth: "fit-content" }}>
          {isDone ? (
            <CheckCircleRoundedIcon
              style={{ color: "green", cursor: "pointer", margin: "0 20px" }}
              onClick={handleCheckClick}
            />
          ) : (
            <CheckCircleOutlineOutlinedIcon
              style={{ color: "green", cursor: "pointer", margin: "0 20px" }}
              onClick={handleCheckClick}
            />
          )}
          <EditRoundedIcon
            style={{ color: "black", cursor: "pointer" }}
            onClick={handleEditClick}
          />
          <DeleteForeverRoundedIcon
            style={{ color: "black", cursor: "pointer", marginLeft: "20px" }}
            onClick={handleDeleteClick}
          />
        </div>
      </div>
      {isEditModalShown ? (
        <TodoEditModal
          setIsEditModalShown={setIsEditModalShown}
          title={title}
          todoUniqueId={todoUniqueId}
        />
      ) : null}
    </>
  );
};
