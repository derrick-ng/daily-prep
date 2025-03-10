import axios from "axios";
import { JSX, useState } from "react";
import { ListGroupItem } from "react-bootstrap";

interface ToDo {
  id: number;
  task: string;
}

interface ToDoItemInterface {
  toDo: ToDo;
  onDelete: (id: number) => void;
  onEdit: (todo: ToDo) => void;
}

function ToDoItem({ toDo, onDelete, onEdit }: ToDoItemInterface): JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  const [editTask, setEditTask] = useState(toDo.task);

  const handleDeleteTodo = async () => {
    try {
      const response = await axios.delete(`/api/todos?id=${toDo.id}`);
      console.log("successful delete response:", response);
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
      const editTodo = response.data.editTodo;
      setIsEditing(false);
      onEdit(editTodo);
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
      <ListGroupItem className="mb-2 p-0 border-0">
        {!isEditing ? (
          <div className="flex items-center border border-gray-300 p-2 rounded-md">
              {/* <span onClick={handleEditToggle} className="block px-2 py-1">
                {toDo.task}
              </span> */}
              <input
              type="text"
              value={toDo.task}
              readOnly
              onClick={handleEditToggle}
              className="border border-gray-300 px-2 py-1 rounded-md w-full"
              />
              {/* <button onClick={handleEditToggle}>Edit</button> */}
              <button className="" onClick={handleDeleteTodo}>
                Delete
              </button>
          </div>
        ) : (
          <div className="flex items-center border border-gray-300 p-2 rounded-md">
              <input
                type="text"
                value={editTask}
                onChange={(e) => {
                  setEditTask(e.target.value);
                }}
                className="border border-gray-300 px-2 py-1 rounded-md w-full"
              />
                <button onClick={handleSaveEdit} className="ml-2">Save</button>
                <button onClick={handleCancelEdit} className="ml-2">Cancel</button>
          </div>
        )}
      </ListGroupItem>
    </div>
  );
}

export default ToDoItem;
