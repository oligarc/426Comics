import React from "react";
import { Link } from "react-router";

//Idea is to have this welcome page inviting you to log in if you want to use the app
//Then, when you're logged in you will be redirected to /home
//So every API service is gonna be protected

function Welcome() {
  return (
    <div className="welcome-container px-8 bg-gray-50 py-6">
      <section className="section-infoInicial">
        <h1 className="text-4xl text-center text-cyan-700">
          ¿Cansado de no saber cómo organizar tus cómics?
        </h1>
        
        <h2 className="text-4xl text-center mt-5 text-cyan-700">
          ¡Bienvenido a{" "}
          <span className="text-cyan-500 font-bold">426Comics</span>!
        </h2>
      </section>

      <section className="section-InicioRegistro mt-10">
        <div>
          <h1 className="text-2xl text-center">¿Te interesa? ¡Únete!</h1>
          <div className="flex justify-center items-center mt-3">
            <Link to="/register">
              <button className="px-32 py-3 text-2xl bg-cyan-500 hover:bg-cyan-700 text-white cursor-pointer">
                Regístrate
              </button>
            </Link>
          </div>
          <p className="text-center mt-4">Si ya tienes cuenta, <Link to="/login"><span className="text-cyan-500 underline">inicia sesión</span></Link></p>
        </div>
      </section>
    </div>
  );
}

export default Welcome;
