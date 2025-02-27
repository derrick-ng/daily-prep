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

  // fetch user's tasks on load
  useEffect(() => {
    async function getToDos() {
      if (!userId) {
        setToDos([]);
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

  const handleAddTodo = (newTodo: ToDo) => {
    setToDos((previousTodos) => [...previousTodos, newTodo]);
  };

  const handleDeleteTodo = (id: number) => {
    setToDos((previousTodos) => previousTodos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (editTodo: ToDo) => {
    console.log("edit todo:", editTodo)
    setToDos((previousTodos) => previousTodos.map((todo) => (todo.id === editTodo.id ? editTodo : todo)));
  };

  return (
    <div>
      <AddToDo userId={userId} onAdd={handleAddTodo} />
      <ToDoList toDos={toDos} onDelete={handleDeleteTodo} onEdit={handleEditTodo} />
    </div>
  );
};

export default ToDoArea;
