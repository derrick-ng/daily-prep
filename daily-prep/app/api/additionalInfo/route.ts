import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const createAdditionalFeatureSchema = z.object({
  weather: z.boolean(),
  email: z.boolean(),
  emailPriority: z.string().min(1).max(50),
  eta: z.boolean(),
  etaStart: z.string().min(1).max(50),
  etaEnd: z.string().min(1).max(50),
  modeOfTransportation: z.number(),
});

//generic code logic in tasks/route.ts
export async function POST(request: NextRequest) {
  const body = await request.json();

  //parse to int("number" in typescript) because value is string by default
  body.modeOfTransportation = Number(body.modeOfTransportation);

  const validation = createAdditionalFeatureSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newAdditionalInfo = await prisma.additionalInfo.create({
    data: {
      authorId: body.id,
      weather: body.weather,
      email: body.email,
      emailPriority: body.emailPriority,
      eta: body.eta,
      etaStart: body.etaStart,
      etaEnd: body.etaEnd,
      modeOfTransportation: body.modeOfTransportation,
    },
  });

  return NextResponse.json(newAdditionalInfo, { status: 201 });
}

//might need to make a PUT request to update additionalInfo subsequent saves.
export async function PUT() {

}