import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "./firebase";
import type { Task } from "../types/Task";

const tasksRef = collection(db, "tasks");

// Crear
export async function createTask(
  title: string,
  description: string,
  userId: string
) {
  return addDoc(tasksRef, {
    title,
    description,
    completed: false,
    userId,
  });
}

// Escuchar tareas en tiempo real
export function getTasks(
  userId: string,
  callback: (tasks: Task[]) => void
) {
  const q = query(
    tasksRef,
    where("userId", "==", userId),
    orderBy("title")
  );

  return onSnapshot(q, (snapshot) => {
    const tasks: Task[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Task, "id">),
    }));

    callback(tasks);
  });
}

// Completar / descompletar
export async function toggleTask(id: string, completed: boolean) {
  await updateDoc(doc(db, "tasks", id), {
    completed,
  });
}

// Editar
export async function updateTask(
  id: string,
  title: string,
  description: string
) {
  await updateDoc(doc(db, "tasks", id), {
    title,
    description,
  });
}

// Eliminar
export async function deleteTask(id: string) {
  await deleteDoc(doc(db, "tasks", id));
}