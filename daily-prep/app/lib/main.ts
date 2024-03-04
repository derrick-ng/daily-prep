import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { getTravelTime } from "./getAPIData";

//grab all users, grab all addInfo, do stuff
async function main() {
    //gets more recent row: filter by id in descending order and take first one
    const userAdditionalInfo = prisma.additionalInfo.findFirst({
        orderBy: {
            id: "desc",
            
        },
        take: 1,
    })

    //userAdditionalInfo.
    //const travelTime = getTravelTime(userAdditionalInfo);
}