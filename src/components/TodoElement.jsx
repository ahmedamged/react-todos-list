import React, { useState, useContext } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { todosContext } from "../contexts/TodosContext";
import { TodoEditModal } from "./TodoEditModal";

export const TodoElement = ({ title, isDoneFlag }) => {
  const { todos, setTodos } = useContext(todosContext);
  const [isDone, setIsDone] = useState(isDoneFlag);
  const [isEditModalShown, setIsEditModalShown] = useState(false);

  const handleCheckClick = () => {
    setIsDone((prev) => !prev);
    const newTodos = [...todos];
    newTodos.map((todo) => {
      if (todo.todosTitle === title) {
        todo.isDone = !isDoneFlag;
      }
    });
    setTodos(newTodos);
  };

  const handleEditClick = () => {
    setIsEditModalShown((prev) => !prev);
  };

  const handleDeleteClick = () => {
    const newTodos = [...todos];
    setTodos(newTodos.filter((todo) => todo.todosTitle !== title));
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p style={{ textDecoration: isDone ? "line-through" : "none" }}>
          {title}
        </p>
        <div>
          {isDone ? (
            <CheckCircleRoundedIcon
              style={{ color: "green", cursor: "pointer", margin: "0 30px" }}
              onClick={handleCheckClick}
            />
          ) : (
            <CheckCircleOutlineOutlinedIcon
              style={{ color: "green", cursor: "pointer", margin: "0 30px" }}
              onClick={handleCheckClick}
            />
          )}
          <EditRoundedIcon
            style={{ color: "black", cursor: "pointer" }}
            onClick={handleEditClick}
          />
          <DeleteForeverRoundedIcon
            style={{ color: "black", cursor: "pointer", margin: "0 30px" }}
            onClick={handleDeleteClick}
          />
        </div>
      </div>
      {isEditModalShown ? (
        <TodoEditModal
          setIsEditModalShown={setIsEditModalShown}
          title={title}
        />
      ) : null}
    </>
  );
};
