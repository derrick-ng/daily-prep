import { getPushSubscriptions } from "@/lib/apiHelper";
import prisma from "@/lib/prismaClient";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const endpoint = url.searchParams.get("endpoint");
    if (!endpoint) {
      throw new Error("no endpoint found");
    }

    const response = await getPushSubscriptions(endpoint);

    return Response.json({ response }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 400 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, endpoint, p256dh, auth } = body;
    console.log(body);
    const response = await prisma.pushSubscription.create({
      data: {
        userId: parseInt(userId as string),
        endpoint,
        p256dh,
        auth,
      },
    });

    return Response.json({ response }, { status: 201 });
  } catch (error) {
    return Response.json({ error }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { userId, endpoint, p256dh, auth } = body;
    const userIdParam = parseInt(userId as string);

    const response = await prisma.pushSubscription.update({
      where: {
        endpoint,
      },
      data: {
        userId: userIdParam,
        endpoint,
        p256dh,
        auth,
      },
    });
    return Response.json({ response }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 400 });
  }
}
