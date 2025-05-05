import React from 'react'
import SocialNetworks from './SocialNetworks'

function Footer() {
  return (
    <footer className='w-full px-20 py-15'>
        <div className='flex justify-between items-center'>
            <h1 className='text-2xl text-cyan-600 font-bold'>Incluso Bruce Wayne tendría esta app</h1>
            <SocialNetworks />
        </div>

    </footer>
  )
}

export default Footer