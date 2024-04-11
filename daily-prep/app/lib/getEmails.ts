import prisma from "../../prisma/client"

export const getEmails = async (id: number) => {
    let senders: string[] = [];

    const user = await prisma.user.findMany({
        where: {
            id: id,
        }
    });

    const additionalInfo = await prisma.additionalInfo.findMany({
        where: {
            authorId: id,
        }
    });

    const additionalInfoCount = await prisma.additionalInfo.count({
        where: {
            authorId: id,
        }
    });

    for (let i = 0; i < additionalInfoCount; i++) {
        let userEmail = user[i].email;
        console.log(userEmail);
        
        let emailSenderPriorityString = additionalInfo[i].emailPriority;

        //parses/separates string by comma, remove trailing/leading whitespace, removes empty strings
        const emailSenderPriority = emailSenderPriorityString?.split(",").map(str => str.trim()).filter(str => str != "");
        const numberOfSenders = emailSenderPriority?.length;

        for (let i = 0; i < numberOfSenders!; i++) {
            if (isValidEmail(emailSenderPriority![i])) {
                senders.push(emailSenderPriority![i]);
            }
        }
    }

    console.log(senders);


    //return emails
}
getEmails(25);

//function param type string. function itself type boolean
const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //.test is built in regex function to test if pattern exists in string, returns true/false
    return emailRegex.test(email);
}