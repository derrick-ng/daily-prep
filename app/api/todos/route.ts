import prisma from "@/lib/prismaClient";
import z from "zod";
import { getTodos } from "@/lib/apiHelper";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const userIdParam = url.searchParams.get("userId");
    const userId = parseInt(userIdParam as string);

    const todos = await getTodos(userId);

    return Response.json({ todos }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 400 });
  }
}

const createTaskSchema = z.object({
  userId: z.number({
    required_error: "user needs to log in before adding tasks",
  }),
  task: z.string().min(1, { message: "task is empty" }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedBody = createTaskSchema.parse(body);
    const { userId, task } = parsedBody;

    const todo = await prisma.todo.create({
      data: {
        userId,
        task,
      },
    });
    return Response.json({ todo }, { status: 201 });
  } catch (error) {
    return Response.json({ error }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = Number(url.searchParams.get("id"));

    const deletedTodo = await prisma.todo.delete({
      where: {
        id,
      },
    });

    //204 = success with no return content
    return Response.json({ deletedTodo }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 400 });
  }
}

const editTaskSchema = z.object({
  id: z.number(),
  task: z.string().min(1, { message: "task is empty" }),
});

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const parsedBody = editTaskSchema.parse(body);
    const { id, task } = parsedBody;

    const editTodo = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        task,
      },
    });

    return Response.json({ editTodo }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 400 });
  }
}
