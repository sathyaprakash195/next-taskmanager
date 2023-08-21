"use client";
import React from "react";
import { useRouter } from "next/navigation";
import TaskForm from "@/components/TaskForm";
import { taskInterface } from "@/interfaces";
import { useDispatch } from "react-redux";
import { SetLoading } from "@/redux/loadersSlice";
import axios from "axios";
import { toast } from "react-hot-toast";

function AddTask() {
  const [task, setTask] = React.useState<taskInterface>({
    title: "",
    description: "",
    status: "open",
    category: "personal",
    priority: "low",
    dateToStart: "",
    dateToFinish: "",
    reference: "",
  });
  const router = useRouter();
  const dispatch = useDispatch();

  const onSave = async () => {
    try {
      dispatch(SetLoading(true));
      await axios.post("/api/tasks", task);
      toast.success("Task added successfully");
      // clear the router cache
      router.refresh();
      router.push("/tasks");
    } catch (error: any) {
      toast.error(error.message || error.response.data.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Add Task</h1>
        <button className="btn-outlined" onClick={() => router.push("/tasks")}>
          Back
        </button>
      </div>
      <TaskForm task={task} setTask={setTask} onSave={onSave} />
    </div>
  );
}

export default AddTask;
