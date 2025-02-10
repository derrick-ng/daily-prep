import { ListGroup } from "react-bootstrap"
import ToDoItem from "./ToDoItem"

interface ToDoListProps {
    toDos: string[]
}


function ToDoList({toDos}: ToDoListProps): any {
  return (
    <div>
        <strong>To Do List:</strong>
        <ListGroup>
            {toDos.map((toDo, index) => (
                <ToDoItem
                key={index}
                toDo={toDo}
                />
            ))}
        </ListGroup>
    </div>
  )
}

export default ToDoList