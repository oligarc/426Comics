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
    <header className="bg-white shadow">
  <div className="px-4 sm:px-6 lg:px-20 py-4 max-w-screen-xl mx-auto">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 items-center">

      {/* Logo (columna 1) */}
      <div className="flex justify-center sm:justify-start">
        <Logo />
      </div>

      {/* Centro (columna 2) */}
      <nav className="flex justify-center">
        <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 text-base sm:text-xl">
          <li><Link to="#">Qué es 426Comics</Link></li>
          {nick ? (
            <>
              <li><Link to="/publishers">Editoriales</Link></li>
              <li><Link to="/authors">Autores</Link></li>
              <li><Link to="/collection">Tu biblioteca</Link></li>
              <li><Link to="/lists">Listas</Link></li>
            </>
          ) : (
            <li><Link to="/register">¡Únete!</Link></li>
          )}
        </ul>
      </nav>

      {/* Usuario (columna 3) */}
      <div className="flex justify-center sm:justify-end">
        {nick ? (
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-base sm:text-xl">
            <span>Bienvenido, {nick}</span>
            <button
              onClick={handleLogout}
              className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <Link to="/login" className="text-base sm:text-xl">Inicia sesión</Link>
        )}
      </div>

    </div>
  </div>
</header>

  )
}

export default Header