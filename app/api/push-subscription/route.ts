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
    const { userId, endpoint, p256dh, auth, enabled } = body;
    console.log(body);
    await prisma.pushSubscription.create({
      data: {
        userId: parseInt(userId as string),
        endpoint,
        p256dh,
        auth,
        enabled,
      },
    });

    return Response.json(
      {
        success: true,
        message: "Push Subscription Added to Database",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST, error adding adding notification to db", error);
    return Response.json(
      {
        success: false,
        message: "Push Subscription Failed to Add to Database",
      },
      { status: 400 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { userId, endpoint, p256dh, auth, enabled } = body;
    const userIdParam = parseInt(userId as string);

    await prisma.pushSubscription.update({
      where: {
        endpoint,
      },
      data: {
        userId: userIdParam,
        endpoint,
        p256dh,
        auth,
        enabled,
      },
    });
    const message = enabled ? "Notification Enabled" : "Notification Disabled";

    return Response.json(
      {
        success: true,
        message,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT, error updating notifications", error);
    return Response.json(
      {
        success: false,
        message: "Failed to Change Notification Setting",
      },
      { status: 400 }
    );
  }
}
