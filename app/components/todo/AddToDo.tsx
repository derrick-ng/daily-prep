"use client";

import axios from "axios";
import { useState } from "react";
import { Todo } from "@/app/types/Todo";


interface AddToDoProp {
  userId: number | null;
  onAdd: (newTodo: Todo) => void;
}

function AddToDo({ userId, onAdd }: AddToDoProp) {
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
    <div className="flex items-center gap-2">
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
