import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from '../components/navbars/AdminNavbar'
import Footer from '../components/footer/Footer'

const CustomerLayout = () => {
  return (
    <div>
      <AdminNavbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default CustomerLayout