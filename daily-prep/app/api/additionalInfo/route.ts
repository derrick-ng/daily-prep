import { NextRequest, NextResponse, userAgent } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

const createAdditionalFeatureSchema = z.object({
  weather: z.boolean().optional(),
  weatherCity: z.string().optional(),
  email: z.boolean().optional(),
  emailPriority: z.string().optional(),
  eta: z.boolean().optional(),
  etaStart: z.string().optional(),
  etaEnd: z.string().optional(),
  modeOfTransportation: z.number(),
});

export async function GET() {
  const session = await getServerSession(authOptions);
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session?.user.email!,
    },
  });

  const UserAdditionalInfo = await prisma.additionalInfo.findUnique({
    where: {
      authorId: currentUser?.id,
    }
  });

  return NextResponse.json(UserAdditionalInfo, { status: 200 });
}

//generic code logic in tasks/route.ts
export async function POST(request: NextRequest) {
  const body = await request.json();

  //parse to int("number" in typescript) because value is string by default
  body.modeOfTransportation = Number(body.modeOfTransportation);

  const validation = createAdditionalFeatureSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const session = await getServerSession(authOptions);
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session?.user.email!,
    },
  });

  const newAdditionalInfo = await prisma.additionalInfo.create({
    data: {
      authorId: currentUser!.id,
      weather: body.weather,
      weatherCity: body.weatherCity,
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
export async function PUT(request: NextRequest) {
  const body = await request.json();

  body.modeOfTransportation = Number(body.modeOfTransportation);

  const validation = createAdditionalFeatureSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const session = await getServerSession(authOptions);
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session?.user.email!,
    },
  });

  const updateAdditionalInfo = await prisma.additionalInfo.update({
    where: {
      authorId: currentUser?.id,
    },
    data: {
      weather: body.weather,
      weatherCity: body.weatherCity,
      email: body.email,
      emailPriority: body.emailPriority,
      eta: body.eta,
      etaStart: body.etaStart,
      etaEnd: body.etaEnd,
      modeOfTransportation: body.modeOfTransportation,
    }
  });

  return NextResponse.json(updateAdditionalInfo, { status: 200 });
}
