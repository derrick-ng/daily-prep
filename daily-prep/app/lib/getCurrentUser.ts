import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import prisma from "@/prisma/client";


export async function getCurrentUser() {
   const session = await getServerSession(authOptions);
    const currentUser = await prisma.user.findUnique({
     where: {
       email: session?.user.email!,
     }
   });
    return currentUser;
 }

