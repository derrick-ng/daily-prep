"use client";

import ToDoList from "./ToDoList";
import AddToDo from "./AddToDo";
import { useState } from "react";

const ToDoArea = () => {
  const [toDos, setToDos] = useState<string[]>(["task1", "task2", "task3"]);

  return (
    <div>
      <AddToDo toDos={toDos} setToDos={setToDos} />
      <ToDoList toDos={toDos} setToDos={setToDos} />
    </div>
  );
};

export default ToDoArea;
