import "./Dashboard.css";
import { useState } from "react";
import { logout } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";
import { useTheme } from "../hooks/useTheme";
import { sendTaskSummary } from "../services/email";
import { auth } from "../services/firebase";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";

type Filter = "all" | "pending" | "completed";

function Dashboard() {
  const navigate = useNavigate();
  const { tasks, loading, addTask, removeTask, completeTask } = useTasks();
  const { theme, toggleTheme } = useTheme();
  const [sending, setSending] = useState(false);
  const [emailStatus, setEmailStatus] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  async function handleSendSummary() {
    const email = auth.currentUser?.email;
    if (!email) return;

    setSending(true);
    setEmailStatus(null);

    try {
      await sendTaskSummary(email, tasks);
      setEmailStatus("✅ Resumen enviado a tu correo");
    } catch {
      setEmailStatus("❌ Error al enviar el resumen");
    } finally {
      setSending(false);
    }
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>TodoApp</h1>
        <div className="header-actions">
          <button onClick={toggleTheme} className="btn btn-ghost">
            {theme === "dark" ? "☀️ Claro" : "🌙 Oscuro"}
          </button>
          <button onClick={handleSendSummary} disabled={sending} className="btn btn-ghost">
            {sending ? "Enviando..." : "Enviar resumen"}
          </button>
          <button onClick={handleLogout} className="btn btn-ghost">
            Cerrar sesión
          </button>
        </div>
        {emailStatus && <p className="email-status">{emailStatus}</p>}
      </header>

      <div className="app-body">
        <section className="task-form-card">
          <h2>Nueva tarea</h2>
          <TaskForm onAdd={addTask} />
        </section>

        <section className="task-list-wrapper">
          <div className="filter-bar">
            <button
              className={`btn btn-filter ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              Todas
            </button>
            <button
              className={`btn btn-filter ${filter === "pending" ? "active" : ""}`}
              onClick={() => setFilter("pending")}
            >
              Pendientes
            </button>
            <button
              className={`btn btn-filter ${filter === "completed" ? "active" : ""}`}
              onClick={() => setFilter("completed")}
            >
              Completadas
            </button>
          </div>

          {loading ? (
            <p className="empty-state">Cargando tareas...</p>
          ) : (
            <TaskList tasks={filteredTasks} onDelete={removeTask} onToggle={completeTask} />
          )}
        </section>
      </div>
    </div>
  );
}

export default Dashboard;