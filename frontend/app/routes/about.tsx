import React, { useState, useEffect } from "react";


interface AnimatedSectionProps {
  children: React.ReactNode; // Any React content like components, text...
  delay?: number; 
  direction?: 'up' | 'left' | 'right' | 'fade'; 
}

// Component
const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, delay = 0, direction = 'up' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  let transformClass = '';
  if (direction === 'up') {
    transformClass = isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0';
  } else if (direction === 'left') {
    transformClass = isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0';
  } else if (direction === 'right') {
    transformClass = isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0';
  } else { 
    transformClass = isVisible ? 'opacity-100' : 'opacity-0';
  }

  return (
    <div
      className={`transition-all duration-700 ease-out ${transformClass}`}
    >
      {children}
    </div>
  );
};

function About() {
  return (
    <>
      <div>
        <AnimatedSection delay={300} direction="up">
          <div className="about-container flex justify-center py-8">
            <h2 className="text-6xl text-cyan-600 font-bold">
              Qué es{" "}
              <span className="text-cyan-500 font-extrabold">426Comics</span>
            </h2>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={600} direction="right">
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
              <img className="w-1/2" src="/about/firstLook.png" alt="Primer vistazo"></img>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={1500} direction="up">
          <div className="flex justify-center mt-16">
            <div className="flex items-center justify-between w-[80%] max-w-screen-lg gap-10">
              <img className="w-1/2" src="/about/colect.png" alt="Colecciona"></img>
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
        </AnimatedSection>

        <AnimatedSection delay={2000} direction="left">
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
              <img className="w-1/2" src="/about/comment.png" alt="Comparte"></img>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </>
  );
}

export default About;
