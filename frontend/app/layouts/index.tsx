import React from 'react'
import { Outlet } from 'react-router'
import Footer from '~/Components/Footer'
import Header from '~/Components/Header'

function Index() {
  return (
    <>
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='w-full mx-auto mb-7 flex-grow'>
        <Outlet />
      </div>
      <Footer />
    </div>
    </>
  )
}

export default Index