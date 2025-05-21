import React from "react";

function About() {
  return (
    <>
      <div>
        <div className="about-container flex justify-center py-8">
          <h2 className="text-6xl text-cyan-600 font-bold">
            Qué es{" "}
            <span className="text-cyan-500 font-extrabold">426Comics</span>
          </h2>
        </div>
        <div className="flex justify-center mt-4">
          <div className="flex items-center justify-between w-[80%] max-w-screen-lg gap-10">
            <div className="w-1/2">
              <h1 className="text-4xl text-gray-400 py-3 font-semibold">
                Lo que siempre has querido.
              </h1>
              <h1 className="text-2xl">
                426Comics nace para que podamos organizar, compartir y
                recomendar. Lo que siempre hemos hecho con una checklist, ahora
                en tu página de confianza dónde podrás comentar con los
                compañeros y hacer recomendaciones. Aquí. Ahora.
              </h1>
            </div>
            <img className="w-1/2" src="/about/firstLook.png"></img>
          </div>
        </div>

        <div className="flex justify-center mt-16">
          <div className="flex items-center justify-between w-[80%] max-w-screen-lg gap-10">
            <img className="w-1/2" src="/about/colect.png"></img>
            <div className="w-1/2">
              <h1 className="text-4xl text-gray-400 py-3 font-semibold">
                Colecciona.
              </h1>
              <h1 className="text-2xl">
                Ya tendremos tiempo de recorrernos Ikea en otro momento. Compra,
                lee, intercambia. Aquí te comprendemos y apoyamos, todos a una.
              </h1>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-16">
          <div className="flex items-center justify-between w-[80%] max-w-screen-lg gap-10">
            <div className="w-1/2">
              <h1 className="text-4xl text-gray-400 py-3 font-semibold">
                Comparte.
              </h1>
              <h1 className="text-2xl">
                ¿Te ha flipado el último de Batman? ¡Corre a comentarlo! ¡Todos tenemos que leer ese número! Y recomienda, recomienda para que todos podamos leer mucho. De eso se trata.
              </h1>
            </div>
            <img className="w-1/2" src="/about/comment.png"></img>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
