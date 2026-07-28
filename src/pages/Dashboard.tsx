import { logout } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";

function Dashboard() {
  const navigate = useNavigate();
  const { tasks, loading, addTask, removeTask, completeTask } = useTasks();

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <main>
      <h1>Dashboard</h1>

      <button onClick={handleLogout}>Cerrar sesión</button>

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