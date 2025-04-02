import React from 'react'
import { Outlet } from 'react-router'
import Footer from '~/Components/Footer'
import Header from '~/Components/Header'

function Index() {
  return (
    <>
    <Header />
    <div className='w-full mx-auto mb-7 flex-grow'>
        <Outlet/>
    </div>
    <Footer />
    </>
  )
}

export default Index