import React, { useState, useEffect } from 'react';
import CustomerDetails from './CustomerDetails';
import CustomerEdit from './CustomerEdit';
import "./CustomerProfile.css"
import useCustomer from '../../context/CustomerContext.jsx';

const CustomerProfile = () => {
  const { getCustomerDetails, updateCustomerDetails } = useCustomer();
  const [customer, setCustomer] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const customerId = "65e81c488630ba788c71bc68";

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      const details = await getCustomerDetails(customerId);
      if (details) {
        setCustomer(details);
      }
    };
    fetchCustomerDetails();
  }, []);

  const handleUpdateCustomer = async (updatedCustomer) => {
    await updateCustomerDetails(customerId, updatedCustomer);
    setCustomer(updatedCustomer); // Assume update is successful
    setEditMode(false); // Exit edit mode
  };

  if (!customer) return <div>Loading customer details...</div>;

  return (
    <div className="customer-profile">
      {editMode ? (
        <CustomerEdit
          customer={customer}
          onSave={handleUpdateCustomer}
          onCancel={() => setEditMode(false)}
        />
      ) : (
        <CustomerDetails
          customer={customer}
          onEdit={() => setEditMode(true)}
        />
      )}
    </div>
  );
};

export default CustomerProfile;
