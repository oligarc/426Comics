import React from 'react'

function SocialNetworks() {
  return (
    <nav>
        <ul className='inline-flex space-x-5 items-center'>
            <li><a href="#"><img src="/iconos/fb-icon.svg" alt="fb-icon" className='w-10' /></a></li>
            <li><a href="#"><img src="/iconos/gmail-icon.svg" alt="gmail-icon" className='w-10' /></a></li>
            <li><a href="#"><img src="/iconos/ig-icon.svg" alt="ig-icon" className='w-10' /></a></li>
            <li><a href="#"><img src="/iconos/yt-icon.svg" alt="yt-icon" className='w-10' /></a></li>
        </ul>
    </nav>
  )
}

export default SocialNetworks