import React from 'react'
import { Outlet } from 'react-router'
import Header from '~/Components/Header'

function Index() {
  return (
    <>
    <Header />
    <div className='w-full mx-auto mb-7 flex-grow'>
        <Outlet/>
    </div>
    </>
  )
}

export default Index