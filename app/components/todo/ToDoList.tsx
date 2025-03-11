import { ListGroup } from "react-bootstrap";
import ToDoItem from "./ToDoItem";
import { JSX } from "react";
import { Todo } from "@/app/types/Todo";

interface ToDoListProps {
  toDos: Todo[];
  onDelete: (id: number) => void;
  onEdit: (editTodo: Todo) => void;
}

function ToDoList({ toDos, onDelete, onEdit }: ToDoListProps): JSX.Element {
  return (
    <div>
      <ListGroup>
        {toDos.map((toDo) => (
          <ToDoItem key={toDo.id} toDo={toDo} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </ListGroup>
    </div>
  );
}

export default ToDoList;
