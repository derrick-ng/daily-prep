import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";
import { hash } from "bcrypt";

const createUserSchema = z.object({
  username: z.string().min(1, "username required").max(255),
  email: z.string().min(1, "email required").email(),
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
    //409 request means conflict with existing resource (email)
    return NextResponse.json({ user: null, message: "Email already registered" }, { status: 409 });
  }

  const checkRegisteredPhoneNumber = await prisma.user.findUnique({
    where: { phoneNumber: body.phoneNumber },
  });
  if (checkRegisteredPhoneNumber) {
    return NextResponse.json({ user: null, message: "Phone Number already registered" }, { status: 409 });
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

  //create a rest object without password to return
  //dont want to return password, even if hashed
  const { password: newUserPassword, ...rest } = newUser;

  return NextResponse.json({ user: rest, message: "User created" }, { status: 201 });
}
