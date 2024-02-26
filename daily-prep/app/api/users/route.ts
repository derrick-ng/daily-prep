import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";
import { hash } from "bcrypt";

const createUserSchema = z.object({
  username: z.string().min(1).max(255),
  email: z.string().min(1).max(50), //change this later
  phoneNumber: z.string().min(1).max(20),
  password: z.string(),
});

//generic code logic in /tasks/route.ts
export async function POST(request: NextRequest) {
  const body = await request.json();

  console.log(body);
  
  const validation = createUserSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  //check if email is already in database
  const checkRegisteredEmail = await prisma.user.findUnique({
    where: { email: body.email },
  });
  if (checkRegisteredEmail) {
    //if email exists, nullify user creation
    return NextResponse.json({ user: null, message: "Email already registered" });
  }

  //hash password to store in database, storing raw pw in db not safe
  const hashedPassword = await hash(body.password, 10);

  const newUser = await prisma.user.create({
    data: {
      username: body.username,
      email: body.email,
      phoneNumber: body.phoneNumber,
      password: hashedPassword,
    },
  });

  return NextResponse.json(newUser, { status: 201 });
}
