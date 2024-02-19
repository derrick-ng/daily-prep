import React from 'react'
import AddForm from './AddForm';
import { Button } from '@radix-ui/themes';

interface formContent {
  task: string;
  weather: boolean;
  email: boolean;
  emailPriority: string;
}

const TaskList = () => {  
  return (
    <div className='w-1/2 text-2xl border-black border-4'>
      <h3 className='text-center'>Add New Tasks</h3>
      
      <AddForm />
      <div>
       <ul>
        <li>task 1</li>
        <li>task 2</li>
        <li>task 3</li>
       </ul>
      </div>
    </div>
  )
}

export default TaskList