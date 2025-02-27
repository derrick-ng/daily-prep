import { ListGroupItem } from "react-bootstrap";

interface ToDoItemInterface {
  toDo: { id: number; task: string };
}

function ToDoItem({ toDo }: ToDoItemInterface): any {
  const handleSubmit = () => {};

  return (
    <div>
      <ListGroupItem>
        <p>To Do Item:</p>
        <p>{toDo.task}</p>
        <button onClick={handleSubmit}>delete</button>
      </ListGroupItem>
    </div>
  );
}

export default ToDoItem;
