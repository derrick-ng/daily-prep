"use client";

import ToDoList from "./ToDoList";
import AddToDo from "./AddToDo";
import { useEffect, useState } from "react";
import axios from "axios";

interface ToDo {
  id: number;
  task: string;
}

interface ToDoAreaProps {
  userId: number | null;
}

const ToDoArea = ({ userId }: ToDoAreaProps) => {
  const [toDos, setToDos] = useState<ToDo[]>([]);

  useEffect(() => {
    async function getToDos() {
      if (!userId) {
        return;
      }
      try {
        const response = await axios.get("/api/todos", {
          params: { userId },
        });
        setToDos(response.data.todos);
      } catch (error) {
        console.error("error in to do area: ", error);
      }
    }
    getToDos();
  }, [userId]); //not sure if this is needed

  return (
    <div>
      <AddToDo />
      <ToDoList toDos={toDos} />
    </div>
  );
};

export default ToDoArea;
