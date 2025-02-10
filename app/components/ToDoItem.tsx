import { ListGroupItem } from "react-bootstrap"

interface ToDoItemInterface {
    toDo: string
}

function ToDoItem({toDo}: ToDoItemInterface): any {
  return (
    <div>
        <ListGroupItem>
            <p>To Do Item:</p>
            <p>{toDo}</p>
        </ListGroupItem>
    </div>
  )
}

export default ToDoItem