import React, { useState } from 'react';

const CustomerEdit = ({ customer, onSave, onCancel }) => {
  const [editCustomer, setEditCustomer] = useState(customer);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditCustomer(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Hello, <input type="text" name="name" value={editCustomer.name} onChange={handleChange} />!</h2>
      <h3>Email: <input type="email" name="email" value={editCustomer.email} onChange={handleChange} /></h3>
      <h3>Phone number: <input type="tel" name="phoneNumber" value={editCustomer.phoneNumber} onChange={handleChange} /></h3>
      <button onClick={() => onSave(editCustomer)}>Save Changes</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default CustomerEdit;
