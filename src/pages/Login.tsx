import { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const userCredential = await login(email, password);

      console.log(userCredential.user);

      console.log("Voy al dashboard");

      navigate("/dashboard");

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main>
      <h1>TodoApp</h1>
      <p>Inicia sesión para administrar tus tareas.</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button type="submit">
          Iniciar sesión
        </button>
      </form>

      <p>
        ¿No tienes una cuenta?{" "}
        <Link to="/register">
          Regístrate
        </Link>
      </p>
    </main>
  );
}

export default Login;