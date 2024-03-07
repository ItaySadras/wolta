import React from 'react'

const CustomerProfile = () => {

  const sampleCustomer = {
    _id: "65e81bea8630ba788c71bbd6",
    name: "Eldora.Gutmann-Schmidt0",
    email: "Lewis_Hahn@gmail.com",
    password: "VIiRVAgeNcgx7D_",
    phoneNumber: [
      "1-433-769-6711 x558"
    ],
    addresses: [
      {
        streetname: "hahilazon",
        streetNumber: "3",
        city: "ramat gan",
      },
      {
        streetname: "agmon",
        streetNumber: "2",
        city: "ramat efal",
      }
    ],
    __v: 0
  }

  return (
    <div>
      <div>
        <h2> Hello {sampleCustomer.name}!</h2>
      </div>
      <div>
        <h3>Email: {sampleCustomer.email}</h3>
        <button>Edit email</button>
      </div>
      <div>
        <h3>Phone number: {sampleCustomer.phoneNumber}</h3>
        <button>Edit phone number</button>
      </div>
      <div>
        <h3>Addresses:</h3>
        <ol>
          {sampleCustomer.addresses.map((address, index) => (
            <li key={index}>
              <ul>
                {Object.entries(address).map(([key, value], index) => (
                  <li key={index}>
                    {key}: {value}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <div>
          <button>add address</button>
        </div>
      </div>
    </div>
  )
}

export default CustomerProfile