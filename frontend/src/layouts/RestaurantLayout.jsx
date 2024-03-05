import React from 'react'
import { Outlet } from 'react-router-dom'
import RestaurantNavbar from '../components/navbars/RestaurantNavbar'
import Footer from '../components/footer/Footer'

const CustomerLayout = () => {
  return (
    <div>
      <RestaurantNavbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default CustomerLayout