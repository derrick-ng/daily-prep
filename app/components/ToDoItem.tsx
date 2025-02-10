import { ListGroupItem } from "react-bootstrap";

interface ToDoItemInterface {
  toDo: string;
  toDos: string[];
  setToDos: any;
}

function ToDoItem({ toDo, toDos, setToDos }: ToDoItemInterface): any {
  const handleSubmit = () => {
    setToDos(toDos.filter((item) => item !== toDo));
  };

  return (
    <div>
      <ListGroupItem>
        <p>To Do Item:</p>
        <p>{toDo}</p>
        <button onClick={handleSubmit}>delete</button>
      </ListGroupItem>
    </div>
  );
}

export default ToDoItem;
