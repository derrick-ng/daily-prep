import React from "react";
import AddForm from "./AddForm";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";


const TaskList = async () => {
  const session = await getServerSession(authOptions);
  console.log("start");
  const userEmail = session?.user.email
  console.log(userEmail);
  const userId = Number(session?.user.id)
  console.log(userId);
  console.log("end");
  
  //grabs all tasks in database
  const tasks = await prisma.task.findMany(
    {
    where: {
      authorId: userId
    }
  }
  );
  console.log(tasks);

  return (
    <div className="w-1/2 text-2xl border-black border-4">
      <h3 className="text-center">Add New Tasks</h3>

      <AddForm />
      <div>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;
