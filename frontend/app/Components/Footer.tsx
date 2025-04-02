import React from 'react'
import SocialNetworks from './SocialNetworks'

function Footer() {
  return (
    <footer className='w-full px-20 py-15'>
        <div className='flex justify-between items-center'>
            <h1>Prueba Footer</h1>
            <SocialNetworks />
        </div>

    </footer>
  )
}

export default Footer