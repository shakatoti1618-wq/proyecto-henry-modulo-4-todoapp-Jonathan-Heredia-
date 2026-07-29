import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import TaskForm from "./TaskForm";

describe("TaskForm", () => {
  it("llama a onAdd con título y descripción al enviar", () => {
    const onAdd = vi.fn();
    render(<TaskForm onAdd={onAdd} />);

    fireEvent.change(screen.getByPlaceholderText("Título"), {
      target: { value: "Mi tarea" },
    });
    fireEvent.change(screen.getByPlaceholderText("Descripción"), {
      target: { value: "Detalle" },
    });
    fireEvent.click(screen.getByText("Agregar tarea"));

    expect(onAdd).toHaveBeenCalledWith("Mi tarea", "Detalle");
  });

  it("no llama a onAdd si el título está vacío (caso borde)", () => {
    const onAdd = vi.fn();
    render(<TaskForm onAdd={onAdd} />);

    fireEvent.click(screen.getByText("Agregar tarea"));

    expect(onAdd).not.toHaveBeenCalled();
  });
});