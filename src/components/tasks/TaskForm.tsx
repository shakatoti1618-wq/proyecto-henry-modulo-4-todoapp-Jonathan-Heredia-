import { useState } from "react";

interface Props {
  onAdd: (title: string, description: string) => Promise<void>;
}

function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) return;

    await onAdd(title, description);

    setTitle("");
    setDescription("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Nueva tarea</h2>

      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">
        Agregar tarea
      </button>
    </form>
  );
}

export default TaskForm;