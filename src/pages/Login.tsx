import "./Auth.css";
import { useState } from "react";
import { login, loginWithGoogle } from "../services/auth";
import { useTheme } from "../hooks/useTheme";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch {
      setError("Correo o contraseña incorrectos.");
    }
  }

  async function handleGoogleLogin() {
    setError("");
    try {
      await loginWithGoogle();
      navigate("/dashboard");
    } catch {
      setError("No se pudo iniciar sesión con Google.");
    }
  }

  return (
    <main className="auth-page">
      <button onClick={toggleTheme} className="btn btn-ghost theme-toggle">
        {theme === "dark" ? "☀️" : "🌙"}
      </button>

      <div className="auth-card">
        <h1>TodoApp</h1>
        <p>Inicia sesión para administrar tus tareas.</p>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="field">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Iniciar sesión
          </button>
        </form>

        <button onClick={handleGoogleLogin} className="btn btn-google">
          Continuar con Google
        </button>

        <p className="auth-switch">
          ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </div>
    </main>
  );
}

export default Login;