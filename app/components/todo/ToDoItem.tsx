import axios from "axios";
import { ListGroupItem } from "react-bootstrap";

interface ToDoItemInterface {
  toDo: { id: number; task: string };
  onDelete: (id: number) => void;
}

function ToDoItem({ toDo, onDelete }: ToDoItemInterface): any {
  const handleDeleteTodo = async () => {
    try {
      const response = await axios.delete(`/api/todos?id=${toDo.id}`);
      onDelete(toDo.id);
    } catch (error) {
      console.error("error deleting:", error);
    }
  };

  return (
    <div>
      <ListGroupItem>
        <p>To Do Item:</p>
        <p>{toDo.task}</p>
        <button onClick={handleDeleteTodo}>delete</button>
      </ListGroupItem>
    </div>
  );
}

export default ToDoItem;
