import prisma from "@/lib/prismaClient";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");

  const todos = await prisma.todo.findMany({
    where: {
      userId: parseInt(userId as string),
    },
  });

  return Response.json({ todos });
}

export async function POST() {}

export async function PUT() {}
