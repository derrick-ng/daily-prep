import React from "react";
import AddForm from "./AddForm";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";

const TaskList = async () => {
  //grabs current server session info from cookies
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user.id);

  //grabs all tasks in database that the user has created
  const tasks = await prisma.task.findMany({
    where: {
      authorId: userId,
    },
  });
  console.log(tasks);


  return (
    <div className="w-1/2 text-2xl border-black border-4">
      <h3 className="text-center">Add New Tasks</h3>

      <AddForm />
      <div>
        <ul>
          {session?.user ? (
          tasks.map((task) => 
          <li key={task.id}>
            {task.description}
          </li>)
          ) : 
          <p>no tasks</p>
          }
        </ul>
      </div>
    </div>
  );
};

export default TaskList;
