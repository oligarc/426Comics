import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useUser } from '~/Contexts/UserContext'

function Logo() {

  const {nick} = useUser();

  return (
    <div>
      {nick ? (
        <Link to="/home"><img className='w-64' src="/logo/logo-transparent.png"></img>
        </Link>
      ): (
        <Link to="/"><img className='w-64' src="/logo/logo-transparent.png"></img>
        </Link>
      )}
        
    </div>
  )
}

export default Logo