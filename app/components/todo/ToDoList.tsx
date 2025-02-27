import { ListGroup } from "react-bootstrap";
import ToDoItem from "./ToDoItem";

interface ToDo {
  id: number;
  task: string;
}

interface ToDoListProps {
  toDos: ToDo[];
  onDelete: (id: number) => void;
}

function ToDoList({ toDos, onDelete }: ToDoListProps): any {
  return (
    <div>
      <strong>To Do List:</strong>
      <ListGroup>
        {toDos.map((toDo) => (
          <ToDoItem key={toDo.id} toDo={toDo} onDelete={onDelete} />
        ))}
      </ListGroup>
    </div>
  );
}

export default ToDoList;
