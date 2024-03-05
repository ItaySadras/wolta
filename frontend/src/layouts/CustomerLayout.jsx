import React from 'react'
import { Outlet } from 'react-router-dom'
import CustomerNavbar from '../components/navbars/CustomerNavbar'
import Footer from '../components/footer/Footer'

const CustomerLayout = () => {
  return (
    <div>
      <CustomerNavbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default CustomerLayout