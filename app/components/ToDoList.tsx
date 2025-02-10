import { ListGroup } from "react-bootstrap"
import ToDoItem from "./ToDoItem"

interface ToDoListProps {
    toDos: string[]
    setToDos: any
}


function ToDoList({toDos, setToDos}: ToDoListProps): any {
  return (
    <div>
        <strong>To Do List:</strong>
        <ListGroup>
            {toDos.map((toDo, index) => (
                <ToDoItem
                key={index}
                toDo={toDo}
                toDos={toDos}
                setToDos={setToDos}
                />
            ))}
        </ListGroup>
    </div>
  )
}

export default ToDoList