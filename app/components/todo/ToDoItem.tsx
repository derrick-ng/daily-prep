import axios from "axios";
import { JSX, useState } from "react";
import { ListGroupItem } from "react-bootstrap";

interface ToDo {
  id: number,
  task: string
}

interface ToDoItemInterface {
  toDo: ToDo;
  onDelete: (id: number) => void;
  onEdit: (todo: ToDo) => void
}

function ToDoItem({ toDo, onDelete, onEdit }: ToDoItemInterface): JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  const [editTask, setEditTask] = useState(toDo.task);

  const handleDeleteTodo = async () => {
    try {
      const response = await axios.delete(`/api/todos?id=${toDo.id}`);
      console.log("successful delete response:", response)
      onDelete(toDo.id);
    } catch (error) {
      console.error("error deleting:", error);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    try {
      const data = {
        id: toDo.id,
        task: editTask,
      };
      const response = await axios.put("/api/todos", data);
      const editTodo = response.data.editTodo
      setIsEditing(false);
      onEdit(editTodo)
    } catch (error) {
      console.error("error save edit:", error);
    }
  };
  
  const handleCancelEdit = () => {
    setEditTask(toDo.task);
    setIsEditing(false);
  };

  return (
    <div>
      <ListGroupItem>
        <p>To Do Item:</p>
        {!isEditing ? (
          <div>
            <p>{toDo.task}</p>
            <button onClick={handleEditToggle}>Edit</button>
            <button onClick={handleDeleteTodo}>Delete</button>
          </div>
        ) : (
          <div>
            <input
              type="text" 
              value={editTask}
              onChange={(e) => setEditTask(e.target.value)}/>
              <button onClick={handleSaveEdit}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
          </div>
        )}
      </ListGroupItem>
    </div>
  );
}

export default ToDoItem;
