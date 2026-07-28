import { useEffect, useState } from "react";
import { auth } from "../services/firebase";
import {
  createTask,
  deleteTask,
  getTasks,
  toggleTask,
  updateTask,
} from "../services/tasks";
import type { Task } from "../types/Task";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;

    if (!user) {
      setLoading(false);
      return;
    }

    const unsubscribe = getTasks(user.uid, (data) => {
      setTasks(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function addTask(title: string, description: string) {
    const user = auth.currentUser;

    if (!user) return;

    await createTask(title, description, user.uid);
  }

  async function removeTask(id: string) {
    await deleteTask(id);
  }

  async function completeTask(task: Task) {
    await toggleTask(task.id, !task.completed);
  }

  async function editTask(
    id: string,
    title: string,
    description: string
  ) {
    await updateTask(id, title, description);
  }

  return {
    tasks,
    loading,
    addTask,
    removeTask,
    completeTask,
    editTask,
  };
}