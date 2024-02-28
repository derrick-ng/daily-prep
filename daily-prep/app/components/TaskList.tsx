import React from "react";
import AddForm from "./AddForm";
import prisma from "@/prisma/client";
import UserTasks from "./UserTasks";


const TaskList = async () => {
  //grabs all tasks in database
  //const tasks = await prisma.task.findMany();
  //console.log(tasks);

  return (
    <div className="w-1/2 text-2xl border-black border-4">
      <h3 className="text-center">Add New Tasks</h3>

      <AddForm />
      <div>
        {/* <ul>
          {tasks.map((task) => (
            <li>
              <UserTasks />
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};

export default TaskList;
