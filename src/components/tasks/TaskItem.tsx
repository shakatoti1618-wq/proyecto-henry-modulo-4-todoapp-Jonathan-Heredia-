import type { Task } from "../../types/Task";

interface Props {
  task: Task;
  onDelete: (id: string) => Promise<void>;
  onToggle: (task: Task) => Promise<void>;
}

function TaskItem({
  task,
  onDelete,
  onToggle,
}: Props) {
  return (
    <article
      style={{
        border: "1px solid #ddd",
        padding: "1rem",
        marginBottom: "1rem",
      }}
    >
      <h3>{task.title}</h3>

      <p>{task.description}</p>

      <p>
        Estado:
        {" "}
        {task.completed ? "✅ Completada" : "⏳ Pendiente"}
      </p>

      <button onClick={() => onToggle(task)}>
        {task.completed
          ? "Marcar pendiente"
          : "Completar"}
      </button>

      <button onClick={() => onDelete(task.id)}>
        Eliminar
      </button>
    </article>
  );
}

export default TaskItem;