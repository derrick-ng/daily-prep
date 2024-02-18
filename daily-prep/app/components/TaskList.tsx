import React from 'react'
import AddForm from './AddForm';

interface formContent {
  task: string;
  weather: boolean;
  email: boolean;
  emailPriority: string;
}

const TaskList = () => {  
  return (
    <div>
      <AddForm />
      <div>
       
      </div>
    </div>
  )
}

export default TaskList