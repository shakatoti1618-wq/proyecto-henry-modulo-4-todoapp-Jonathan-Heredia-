import { useState } from "react";
import { register } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const userCredential = await register(email, password);

      console.log(userCredential.user);

      navigate("/dashboard");

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main>
      <h1>TodoApp</h1>
      <p>Regístrate para comenzar a usar TodoApp.</p>

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
          Crear cuenta
        </button>
      </form>

      <p>
        ¿Ya tienes una cuenta?{" "}
        <Link to="/">
          Inicia sesión
        </Link>
      </p>
    </main>
  );
}

export default Register;