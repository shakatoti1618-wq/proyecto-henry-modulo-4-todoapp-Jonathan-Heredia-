import { useState } from "react";
import { logout } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";
import { sendTaskSummary } from "../services/email";
import { auth } from "../services/firebase";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";

function Dashboard() {
  const navigate = useNavigate();
  const { tasks, loading, addTask, removeTask, completeTask } = useTasks();
  const [sending, setSending] = useState(false);
  const [emailStatus, setEmailStatus] = useState<string | null>(null);

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
    } catch (error) {
      console.error(error);
      setEmailStatus("❌ Error al enviar el resumen");
    } finally {
      setSending(false);
    }
  }

  return (
    <main>
      <h1>Dashboard</h1>

      <button onClick={handleLogout}>Cerrar sesión</button>
      <button onClick={handleSendSummary} disabled={sending}>
        {sending ? "Enviando..." : "Enviar resumen por email"}
      </button>
      {emailStatus && <p>{emailStatus}</p>}

      <TaskForm onAdd={addTask} />

      {loading ? (
        <p>Cargando tareas...</p>
      ) : (
        <TaskList tasks={tasks} onDelete={removeTask} onToggle={completeTask} />
      )}
    </main>
  );
}

export default Dashboard;