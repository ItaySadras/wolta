import React from 'react'

const CourierProfile = () => {

  const sampleCourier = {
    _id: "65e70a20797a6900e55ffe97",
    username: "ron",
    email: "avitalron12@gmail.com",
    phoneNumber: "123456789",
    address: {
      streetname: "laskov",
      streetNumber: "4",
      city: "tel aviv",
    },
    available: true,
    rating: 4.5,
  }


  return (
    <div>
      <div>
        <h2> Hello {sampleCourier.username}!</h2>
      </div>
      <div>
        <h3>Email: {sampleCourier.email}</h3>
        <button>Edit email</button>
      </div>
      <div>
        <h3>Phone number: {sampleCourier.phoneNumber}</h3>
        <button>Edit phone number</button>
      </div>
      <div>
        <div>
          <h3>Address: {Object.values(sampleCourier.address).join(', ')}</h3>
          <button>Edit address</button>
        </div>
      </div>
      <div>
        <h3>Your score: {sampleCourier.rating}</h3>
      </div>
    </div>
  )
}

export default CourierProfile