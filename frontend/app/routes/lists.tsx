import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';
import { getAllLists } from '~/Services/functions';
import type { ListDTO } from '~/Types/interfaces';

function Lists() {

  const [lists, setLists] = useState<ListDTO[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const fetchedLists = await getAllLists();  
        setLists(fetchedLists);  
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message); 
        } else {
          setError("Ha ocurrido un error desconocido.");
        }
    }
    };

    fetchLists();
  }, []);

  return (
    <div className="min-h-screen w-full py-12 px-6">
      <div className="max-w-7xl mx-auto">
      <h2 className='text-center text-3xl mb-6 text-cyan-700 font-bold'>Listas de la comunidad</h2>
  
        {error && <p className="text-red-400 text-center font-semibold">{error}</p>}
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lists.length > 0 ? (
            lists.map((list) => (
              <div
                className="bg-white px-6 py-14 rounded-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
                key={list.id}
              >
                <img className='mb-4' src="/listcover.jpg" alt="Placeholderparalistas" />
                <h3 className="text-4xl font-bold text-cyan-600 mb-3">{list.titulo}</h3>
                <p className="text-gray-600 mb-4">{list.descripcion}</p>
                <p className="text-gray-500">
                  {list.user.nick}
                </p>
  
                <div className="mt-4">
                  <Link to={`/lists/${list.id}`}>
                  <button
                    className="px-4 py-2 bg-cyan-500 text-white font-semibold rounded-md hover:bg-cyan-700 transition duration-300 ease-in-out"
                  >
                    Echa un vistazo
                  </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-lg text-gray-400">Nadie creó una lista aún ;(</p>
          )}
        </div>
      </div>
    </div>
  );
  
}

export default Lists