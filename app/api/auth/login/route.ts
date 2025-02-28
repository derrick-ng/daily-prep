import { compareSync } from "bcrypt-ts";
import prisma from "@/lib/prismaClient";
import { login } from "@/lib/session";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return Response.json({ errors: "invalid user" }, { status: 401 });
    }

    const passwordCheck = compareSync(password, user.password);

    if (!passwordCheck) {
      return Response.json({ errors: "invalid password" }, { status: 401 });
    }

    await login({ username: user.username, userId: user.id.toString() });

    return Response.json({ message: "login success" }, { status: 200 });
  } catch (error) {
    return Response.json({ errors: error }, { status: 400 });
  }
}
