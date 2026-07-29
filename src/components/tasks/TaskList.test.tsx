import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import TaskList from "./TaskList";
import type { Task } from "../../types/Task";

const tasks: Task[] = [
  { id: "1", title: "Tarea 1", description: "desc", completed: false, userId: "u1" },
];

describe("TaskList", () => {
  it("muestra un mensaje cuando no hay tareas (caso borde)", () => {
    render(<TaskList tasks={[]} onDelete={vi.fn()} onToggle={vi.fn()} />);
    expect(screen.getByText("No hay tareas.")).toBeInTheDocument();
  });

  it("renderiza las tareas recibidas", () => {
    render(<TaskList tasks={tasks} onDelete={vi.fn()} onToggle={vi.fn()} />);
    expect(screen.getByText("Tarea 1")).toBeInTheDocument();
  });
});