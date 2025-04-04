import prisma from "@/lib/prismaClient";
import z from "zod";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { login } from "@/lib/session";

const createUserSchema = z.object({
  username: z
    .string({
      required_error: "Name is required",
    })
    .min(4, {
      message: "Must be 4 or move characters long",
    }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Invalid email address" }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(3, { message: "Password must be 3 or more characters long" }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    //validates request form data with the zod object
    const parsedBody = createUserSchema.parse(body);

    //assign variables using the "validated" versions of the request
    const { username, email, password } = parsedBody;

    //hash password
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const userId = String(user.id);
    await login({ username, userId });
    
    return Response.json({ user }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.issues.map((err) => `${err.path.join(".")}: ${err.message}`);

      console.log("errorMessages created", errorMessages);
      return Response.json({ errors: errorMessages }, { status: 400 });
    } else if (error instanceof Error) {
      return Response.json({ errors: [error.message] }, { status: 400 });
    }
    return Response.json({ errors: ["unexpected error in registration"] }, { status: 400 });
  }
}
