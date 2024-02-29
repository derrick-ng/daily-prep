import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { create } from "domain";

const createTaskSchema = z.object({
  description: z.string().min(1, "description required").max(255),
  priority: z.boolean(),
});

export async function POST(request: NextRequest) {
  //take in POST request, jsonify, assign body... await bc request/promise so make function async
  const body = await request.json();

  //use created "fake" schema to validate user input
  const validation = createTaskSchema.safeParse(body);
  if (!validation.success) {
    //throws a 400 if any part of POST data doesnt follow format
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  //find current user by comparing their email with database
  const session = await getServerSession(authOptions);
  const currentUser = await prisma.user.findUnique({
    where: { email: session?.user.email!},
  })

  //creates a new task in database
  const newTask = await prisma.task.create({
    data: {
      authorId: currentUser!.id,
      description: body.description,
      priority: body.priority,
    },
  });

  return NextResponse.json(newTask, { status: 201 });
}

export async function DELETE() {}
