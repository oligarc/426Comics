import React from 'react'
import Logo from './Logo'
import { Link } from 'react-router'

function Header() {
  return (
    <header>
        <div className='w-full px-20'>
            <div className='flex justify-between items-center text-center'>
                <nav>
                    <ul className='flex list-none gap-x-6 items-center'>
                        <li><Logo/></li>
                        <li className='text-2xl'><Link to="#">Qué es 426Comics</Link></li>
                        <li className='text-2xl'><Link to="#">¡Únete!</Link></li>
                    </ul>
                </nav>
                <div>
                    <Link to="/login" className='text-2xl'>Inicia sesión</Link>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header