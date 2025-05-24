import React from 'react'
import { Link } from 'react-router'

function NoResults({searchQuery}: {searchQuery: string}) {
  return (
    <div className='flex flex-col items-center justify-center'>
        <div className='relative'>
        <img src="/noResults.jpg" alt="sinResultados" className='animate-[spin-in_1s_ease-out_forwards]' />
        <h2 className='ms-8 absolute top-44 text-white text-2xl text-center font-bold'>NOOOOOOOOOOOOOOOOOOOOO</h2>
        </div>
        <h2 className='text-3xl mt-4'>Parece que aún no tenemos registrado el cómic {searchQuery}</h2>
        <Link to="/addComic"><h2 className='text-2xl mt-5 underline'>¿Quieres introducirlo tú?</h2></Link>
    </div>
  )
}

export default NoResults