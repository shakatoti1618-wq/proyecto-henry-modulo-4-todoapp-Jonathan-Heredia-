import type { Task } from "../types/Task";

export async function sendTaskSummary(toEmail: string, tasks: Task[]) {
  const response = await fetch("/api/send-summary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ toEmail, tasks }),
  });

  if (!response.ok) {
    throw new Error("No se pudo enviar el resumen");
  }

  return response.json();
}