import React from 'react'
import { Outlet } from 'react-router-dom'
import CourierNavbar from '../components/navbars/CourierNavbar'
import Footer from '../components/footer/Footer'

const CustomerLayout = () => {
  return (
    <div>
      <CourierNavbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default CustomerLayout