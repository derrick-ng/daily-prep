"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { setErrorMap } from "zod";

interface TaskForm {
  description: string;
  priority: boolean;
}

const AddForm = () => {
  const { register, handleSubmit } = useForm<TaskForm>();
  const [error, setError] = useState("");

  return (
    <div>
      <form
        className="flex border-solid border-2 border-black justify-center"
        onSubmit={handleSubmit(async (data) => {
          //this line is what calls the POST request in api/tasks.route.ts
          try {
            await axios.post("/api/tasks", data);
          } catch (error) {
            setError("An error occurred");
          }
        })}
      >
        <div>
          <label htmlFor="">priority</label>
          <input type="checkbox" {...register("priority")} />
        </div>
        <TextField.Root>
          <TextField.Input placeholder="type new task" {...register("description")} />
        </TextField.Root>
        <Button className="float-right">Add Task</Button>
      </form>
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
    </div>
  );
};

export default AddForm;
