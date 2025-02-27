import prisma from "@/lib/prismaClient";
import z from "zod";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");

  const todos = await prisma.todo.findMany({
    where: {
      userId: parseInt(userId as string),
    },
  });

  return Response.json({ todos });
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

export async function PUT() {}
