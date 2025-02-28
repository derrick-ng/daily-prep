import { ListGroup } from "react-bootstrap";
import ToDoItem from "./ToDoItem";
import { JSX } from "react";

interface ToDo {
  id: number;
  task: string;
}

interface ToDoListProps {
  toDos: ToDo[];
  onDelete: (id: number) => void;
  onEdit: (editTodo: ToDo) => void;
}

function ToDoList({ toDos, onDelete, onEdit }: ToDoListProps): JSX.Element {
  return (
    <div>
      <strong>To Do List:</strong>
      <ListGroup>
        {toDos.map((toDo) => (
          <ToDoItem key={toDo.id} toDo={toDo} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </ListGroup>
    </div>
  );
}

export default ToDoList;
