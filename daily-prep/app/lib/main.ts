import prisma from "../../prisma/client";
import { getTravelTime } from "./getTravelTime";
import { getUserTasks } from "./getUserTasks";
import { getWeather } from "./getWeather";

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
        let userTasks = await getUserTasks(users[i].id);
        let travelTime = await getTravelTime(users[i].id);
        let weather = await getWeather(users[i].id);

        //on deployment/finish with apis, change id to username
        console.log(`user: ${users[i].id}\n   tasks: ${userTasks}\n   travel time: ${travelTime}\n   weather: ${weather}\n`);
    }
}
main();