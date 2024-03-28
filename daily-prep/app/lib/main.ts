import prisma from "../../prisma/client";
import { getTravelTime } from "./getAPIData";
import { getUserTasks } from "./getUserTasks";

//final logic:
//main.ts   loop through each user, grab id and phone number
    //check Task(db) to see if user has tasks
        //get all tasks where authorId = id, return as array

    //getTravelTime(id: number)
        //findunique where authorId = id
            //return array of
    //getWeather(id: number)
        //prob same
    //getEmail(id: number)
        //prob same
    //format and send all info via phone number
async function main() {
    const users = await prisma.user.findMany();
    const userCount = await prisma.user.count();
    
    //
    for (let i = 0; i < userCount; i++) {
        getUserTasks(users[i].id);  //need to store this
    }
}
main();