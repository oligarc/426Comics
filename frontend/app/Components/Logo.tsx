import React from 'react'
import { Link } from 'react-router'

function Logo() {
  return (
    <div>
        <Link to="/"><img className='w-64' src="/logo/logo-transparent.png"></img>
        </Link>
    </div>
  )
}

export default Logo