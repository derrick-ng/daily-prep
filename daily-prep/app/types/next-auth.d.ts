import nextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        username: string
    }
    interface Session {
        user: User & {
            id: string
        }
        // token: {
        //     username: string
        // }
    }
}