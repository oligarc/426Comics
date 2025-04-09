import React, { useState } from "react";
import { Link } from "react-router";
import { useUser } from "~/Contexts/UserContext";
import { loginUser } from "~/Services/auth";

function Login() {
  const [nick, setNick] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const {setNick:setNickContext} = useUser(); //Getting the function setNick from useUser. Note that is gonna be named different because of the first state to get the nick in the form

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await loginUser(nick, password);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("nick", nick);
      setNickContext(nick); //Updating the nick in the global context
      setLoginSuccess(true);
    } catch (err) {
      alert("Usuario o contraseña incorrectos");
      console.error(err);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-cyan-600 mb-6">
          ¡Cuánto tiempo!
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="text"
              value={nick}
              onChange={(e) => setNick(e.target.value)}
              placeholder="Nick"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-cyan-500 text-white p-3 rounded-md hover:bg-cyan-700 transition duration-300"
          >
            Iniciar sesión
          </button>
        </form>

        {loginSuccess && (
          <>
          <p className="text-green-600 text-center mt-4 font-medium">
            ¡Bienvenido!
          </p>
          <p className="mt-4 text-center text-2xl text-cyan-700">¿Por qué no empiezas por el <span className="text-cyan-500"><Link to="/home">principio?</Link></span></p>
          </>
        )}
        <p className="text-center text-gray-600 mt-4">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-cyan-500 hover:underline">
            ¡Regístrate!
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
