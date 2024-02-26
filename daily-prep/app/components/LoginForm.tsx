"use client";

import React from "react";
import { Button, TextField } from "@radix-ui/themes";
import Link from "next/link";

//should i make an interface or use built in js auth?

const LoginForm = () => {
  return (
    <div>
      create login form, import into users/page, create Users model, create users/routes
      <form action="" className="w-1/2">
        <TextField.Input placeholder="username" />
        <TextField.Input placeholder="password" type=""/>

        <Button>Login</Button>
      </form>
    </div>
  );
};

export default LoginForm;
