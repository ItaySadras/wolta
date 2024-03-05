import React from 'react'
import CustomerSearch from '../../components/customerDash/CustomerSearch'

const CustomerDash = () => {
  return (
    <div>
      <div>
        <h1>Hi! {/* name of customer */}</h1>
      </div>
      <div>
        <h2>Your location: {/* user location */}</h2>
      </div>
      <div>
        <CustomerSearch />
      </div>
      <div>
        {/* restaurant recommendations */}
      </div>
    </div>
  )
}

export default CustomerDash