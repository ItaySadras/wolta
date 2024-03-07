import React, { useState } from "react";
import "./CustomerProfile.css";

const CustomerProfile = () => {
  const sampleCustomer = {
    _id: "65e81bea8630ba788c71bbd6",
    name: "Eldora Gutmann Schmidt",
    email: "Lewis_Hahn@gmail.com",
    password: "VIiRVAgeNcgx7D_",
    phoneNumber: "1-433-769-6711 x558",
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
      },
    ],
    __v: 0,
  };

  const [customer, setCustomer] = useState(sampleCustomer);
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setEditMode(false);
    console.log("Customer details saved:", customer);
  };

  return (
    <div className="customer-profile">
      <div>
        <h2>
          Hello,{" "}
          {editMode ? (
            <input
              type="text"
              name="name"
              value={customer.name}
              onChange={handleChange}
            />
          ) : (
            customer.name
          )}
          !
        </h2>
      </div>
      <div>
        <h3>
          Email:{" "}
          {editMode ? (
            <input
              type="email"
              name="email"
              value={customer.email}
              onChange={handleChange}
            />
          ) : (
            customer.email
          )}
        </h3>
      </div>
      <div>
        <h3>
          Phone number:{" "}
          {editMode ? (
            <input
              type="tel"
              name="phoneNumber"
              value={customer.phoneNumber}
              onChange={handleChange}
            />
          ) : (
            customer.phoneNumber
          )}
        </h3>
      </div>
      <div>
        <button onClick={() => setEditMode(!editMode)}>
          {editMode ? "Save Changes" : "Edit Details"}
        </button>
      </div>
    </div>
  );
};

export default CustomerProfile;
