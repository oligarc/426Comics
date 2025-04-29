import React, { useEffect, useState } from 'react'
import Logo from './Logo'
import { Link } from 'react-router'
import { useUser } from '~/Contexts/UserContext';

function Header() {

    const  {nick , setNick} = useUser(); //Global context

    const handleLogout = () => {
      sessionStorage.removeItem('nick');
      sessionStorage.removeItem('token');
      setNick(null);
    }

  return (
    <header>
        <div className='w-full px-20'>
            <div className='flex justify-between items-center text-center'>
                <nav>
                    <ul className='flex list-none gap-x-6 items-center'>
                        <li><Logo/></li>
                        <li className='text-2xl'><Link to="#">Qué es 426Comics</Link></li>
                        <li className='text-2xl'><Link to="/publishers">Editoriales</Link></li>
                        {nick ? (
                          <>
                          <li className='text-2xl'><Link to="/authors">Autores</Link></li>
                          <li className='text-2xl'><Link to="/collection">Tu biblioteca</Link></li>
                          </>
                        ):(
                          <li className='text-2xl'><Link to="/register">¡Únete!</Link></li>
                        )}
                    </ul>
                </nav>
                <div>
  {nick ? (
    <div className="text-2xl flex items-center gap-4">
      <span>Bienvenido, {nick}</span>
      <button
        onClick={handleLogout}
        className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Cerrar sesión
      </button>
    </div>
  ) : (
    <Link to="/login" className='text-2xl'>Inicia sesión</Link>
  )}
</div>
            </div>
        </div>
    </header>
  )
}

export default Header