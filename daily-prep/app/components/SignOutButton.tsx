"use client";

import { Button } from "@radix-ui/themes";
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  return (
    <Button onClick={() => signOut({
        //sends user back to "/" on sign out
        redirect:true,
        callbackUrl: `${window.location.origin}/`
    })}>
        Sign Out
    </Button>
  )
}

export default SignOutButton