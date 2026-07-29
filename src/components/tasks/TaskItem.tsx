import "./TaskItem.css";
import type { Task } from "../../types/Task";

interface Props {
  task: Task;
  onDelete: (id: string) => Promise<void>;
  onToggle: (task: Task) => Promise<void>;
}

function TaskItem({ task, onDelete, onToggle }: Props) {
  return (
    <article className={`task-item ${task.completed ? "completed" : ""}`}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p className={`task-status ${task.completed ? "done" : "pending"}`}>
        {task.completed ? "✅ Completada" : "⏳ Pendiente"}
      </p>

      <div className="task-actions">
        <button onClick={() => onToggle(task)} className="btn btn-ghost">
          {task.completed ? "Marcar pendiente" : "Completar"}
        </button>
        <button onClick={() => onDelete(task.id)} className="btn btn-danger">
          Eliminar
        </button>
      </div>
    </article>
  );
}

export default TaskItem;