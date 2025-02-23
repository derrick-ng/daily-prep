"use client";

import { useState } from "react";

interface AddToDoProps {
  toDos: string[];
  setToDos: any;
}

function AddToDo({ toDos, setToDos }: AddToDoProps): any {
  const [toDo, setToDo] = useState("");

  //... is a spread operator
  /// creates a new array using toDos, adds toDo
  // cant use .push bc react needs states to be immutable
  const handleSubmit = () => {
    setToDos([...toDos, toDo]);
  };
  return (
    <div>
      <input type="text" placeholder="Add Task" value={toDo} onChange={(e) => setToDo(e.target.value)} />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}

export default AddToDo;
