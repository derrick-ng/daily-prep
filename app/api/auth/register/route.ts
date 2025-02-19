import prisma from "@/lib/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { username, email, password } = await request.json();

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password,
    },
  });

  return NextResponse.json({ user });
}
