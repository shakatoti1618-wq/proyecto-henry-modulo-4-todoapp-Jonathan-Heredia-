import { logout } from "../services/auth";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();

    navigate("/");
  }

  return (
    <main>
      <h1>Dashboard</h1>

      <button onClick={handleLogout}>
        Cerrar sesión
      </button>
    </main>
  );
}

export default Dashboard;