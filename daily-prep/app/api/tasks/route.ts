import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client"

const createTaskSchema = z.object({
    body: z.string().min(1).max(255),
    priority: z.boolean()
});

export async function POST(request: NextRequest) {
    //take in POST request, jsonify, assign body... await bc requesting/promise so make async
    const body = await request.json();
    //use created "fake" schema to validate user input
    const validation = createTaskSchema.safeParse(body)
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400});
    }

    const newTask = await prisma.task.create({
        data: {
            body: 
        }
    })
    
}

