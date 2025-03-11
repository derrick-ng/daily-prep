"use server";

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { JWTPayload } from "jose";

// https://www.youtube.com/watch?v=DJvM2lSPn6w

const secretKey = process.env.secretKey;
const key = new TextEncoder().encode(secretKey);


export async function encrypt(payload: JWTPayload) {
  return await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("24 hours from now").sign(key);
}

export async function decrypt(input: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login({ username, userId }: { username: string; userId: string }) {
  const user = {username, userId};

  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encrypt({ user, expires });

  (await cookies()).set("session", session, { expires, httpOnly: true });
}

export async function logout() {
  (await cookies()).set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = (await cookies()).get("session")?.value;
  if (!session) {
    return;
  }
  const user = await decrypt(session);
  return([user])
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) {
    return null;
  }

  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const response = NextResponse.next();
  response.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: new Date(parsed.expires as string | number | Date),
  });
  return response;
}
