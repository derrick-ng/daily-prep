"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Todo {
  id: number;
  task: string;
}

interface AddToDoProp {
  userId: number | null;
  onAdd: (newTodo: Todo) => void;
}

function AddToDo({ userId, onAdd }: AddToDoProp) {
  const router = useRouter();
  const [toDo, setToDo] = useState("");

  const handleAddTodo = async () => {
    try {
      const data = {
        userId: userId,
        task: toDo,
      };

      const response = await axios.post("/api/todos", data);
      const newTodo = response.data.todo;
      setToDo("");
      onAdd(newTodo);
    } catch (error) {
      console.error("error in add to do", error);
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Add Task"
        value={toDo}
        onChange={(e) => {
          setToDo(e.target.value);
        }}
      />
      <button onClick={handleAddTodo}>Add</button>
    </div>
  );
}

export default AddToDo;
