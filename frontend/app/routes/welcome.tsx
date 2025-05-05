import React from "react";
import { Link } from "react-router";

//Idea is to have this welcome page inviting you to log in if you want to use the app
//Then, when you're logged in you will be redirected to /home
//So every API service is gonna be protected

function Welcome() {
  return (
    <div className="welcome-container flex flex-col justify-center items-center bg-gray-50 min-h-screen px-8 py-6">
      <section className="section-infoInicial text-center">
        <h1 className="text-4xl text-cyan-700">
          ¿Cansado de no saber cómo organizar tus cómics?
        </h1>
        
        <h2 className="text-4xl mt-5 text-cyan-700">
          ¡Bienvenido a <span className="text-cyan-500 font-bold">426Comics</span>!
        </h2>
      </section>

      <section className="section-InicioRegistro mt-10 text-center">
        <h1 className="text-2xl">¿Te interesa? ¡Únete!</h1>
        <div className="mt-3">
          <Link to="/register">
            <button className="px-32 py-3 text-2xl bg-cyan-500 hover:bg-cyan-700 text-white cursor-pointer">
              Regístrate
            </button>
          </Link>
        </div>
        <p className="mt-4">
          Si ya tienes cuenta, <Link to="/login"><span className="text-cyan-500 underline">inicia sesión</span></Link>
        </p>
      </section>
    </div>
  );
}

export default Welcome;
