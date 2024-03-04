import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { AdditionalInfo } from "@prisma/client";

//these can be called in another file... main.ts
//use userId to check boolean values to see which functions to call, weatherCheckbox, etc
//pass in userId as a parameter
    // const session = await getServerSession(authOptions);
    // const userId = Number(session?.user.id);
export const getTravelTime = (userId: Number) => {

    //distancematrix.ai: DO NOT HAVE API KEY YET, CREATE ACCOUNT
    
    //https://api.distancematrix.ai/maps/api/distancematrix/json?origins=<origin_location_1|origin_location_2|...|origin_location_n>&destinations=<destination_location_1|destination_location_2|...|destination_location_n>&key=<your_access_token>
    //https://api.distancematrix.ai/maps/api/distancematrix/json?origins=<origin_location_1>&destinations=<destination_location_1>&key=<your_access_token>

    //return info
}

