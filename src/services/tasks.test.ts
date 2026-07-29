import { describe, it, expect, vi } from "vitest";
import { createTask } from "./tasks";
import { addDoc } from "firebase/firestore";

vi.mock("firebase/firestore", async () => {
  const actual = await vi.importActual("firebase/firestore");
  return {
    ...actual,
    collection: vi.fn(),
    addDoc: vi.fn(),
  };
});

vi.mock("./firebase", () => ({
  db: {},
}));

describe("createTask", () => {
  it("llama a addDoc con los datos correctos", async () => {
    await createTask("Título", "Descripción", "user123");

    expect(addDoc).toHaveBeenCalledWith(
      undefined,
      expect.objectContaining({
        title: "Título",
        description: "Descripción",
        completed: false,
        userId: "user123",
      })
    );
  });
});