import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

//authentication type, could be credentials, github, discord etc... check docs /providers
export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        //JSON web token
        strategy: "jwt"
    },
    pages: {
        signIn: "/login"
    },
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "Credentials",
          // `credentials` is used to generate a form on the sign in page.
          // You can specify which fields should be submitted, by adding keys to the `credentials` object.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            email: { label: "email", type: "text", placeholder: "johndoe@mail.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            //if user input is empty, dont authorize
            if (!credentials?.email || !credentials.password) {
                return null;
            }
      
            //ERROR CHECKING:
            //check if user exists by finding provided email
            //if not found, dont auth
            const findUser = await prisma.user.findUnique({
                where: {email: credentials.email}
            });
            if (!findUser) {
                return null;
            }
            //check if password matches
            const passwordValidate = await compare(credentials.password, findUser.password);
            if (!passwordValidate) {
                return null;
            }

            return {
                id: `${findUser.id}`,       //not sure why this needs to be string
                username: findUser.username,
                email: findUser.email,
                phoneNumber: findUser.phoneNumber,
            }
          }
        })
      ],
      //all the values in authorize get sent to jwt
      //jwt sends value to session
      callbacks: {
        async jwt({ token, user }) {
            //console.log("start");
            
            //console.log(token, user);
            
            if (user) {
                //console.log("middle");
                return {
                    ...token,
                    id: user.id
                }
            }
            //console.log("end");
            
            return token
        },
        async session({ session, user, token }){
            //console.log("start");
            
           //console.log(token, user);
           
           //console.log("middle");
           
           //returns session, which has values of user saved
           //id: token.sub gives authorId
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.sub,
                }
            }
        }
      }
}