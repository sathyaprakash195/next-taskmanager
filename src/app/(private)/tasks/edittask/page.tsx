"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import TaskForm from "@/components/TaskForm";
import { taskInterface } from "@/interfaces";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { SetLoading } from "@/redux/loadersSlice";
import axios from "axios";

function EditTask() {
  const searchParams = useSearchParams();
  const taskid = searchParams.get("taskid");
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
      await axios.put(`/api/tasks/${taskid}`, task);
      toast.success("Task updated successfully");
      // clear the router cache
      router.refresh();
      router.push("/tasks");
    } catch (error: any) {
      toast.error(error.message || error.response.data.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  const getTask = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(`/api/tasks/${taskid}`);
      setTask(response.data.data);
    } catch (error: any) {
      toast.error(error.response.data.message || error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    getTask();
  }, [taskid]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Edit Task</h1>
        <button className="btn-outlined" onClick={() => router.push("/tasks")}>
          Back
        </button>
      </div>

      <TaskForm task={task} setTask={setTask} onSave={onSave} />
    </div>
  );
}

export default EditTask;
