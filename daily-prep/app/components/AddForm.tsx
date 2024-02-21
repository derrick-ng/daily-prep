"use client";
import { Button, TextField } from "@radix-ui/themes";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

interface TaskForm {
  description: string;
  priority: boolean;
}

const AddForm = () => {
  const { register, handleSubmit } = useForm<TaskForm>();

  return (
    <form
      className="flex border-solid border-2 border-black justify-center"
      onSubmit={handleSubmit(async (data) => {
        //this line is what calls the POST request in api/tasks.route.ts
        await axios.post("/api/tasks", data);
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
  );
};

export default AddForm;
