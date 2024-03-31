import prisma from "../../prisma/client";

export const getUserTasks = async (id: number) => {
  let userTaskDescription: string[] = [];

  const taskCount = await prisma.task.count({
    where: {
      authorId: id,
    },
  });
  const UserTaskInfo = await prisma.task.findMany({
    where: {
      authorId: id,
    },
  });

  for (let i = 0; i < taskCount; i++) {
    userTaskDescription.push(UserTaskInfo[i].description);
  }

  return userTaskDescription;
};
