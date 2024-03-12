import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const CustomerContext = createContext();
axios.defaults.withCredentials = true;

const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [customerInfo, setCustomerInfo] = useState();

  const getAllCustomers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/customer/getAllCustomers"
      );
      setCustomers(response.data);
    } catch (error) {
      console.error("Failed to fetch all customers:", error);
    }
  };

  const getCustomerDetails = async (customerId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/customer/getCustomerDetails/${customerId}`
      );
      setCustomerInfo(response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch customer details:", error);
      return null;
    }
  };

  const updateCustomerDetails = async (customerId, customerData) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/customer/updateDetails/${customerId}`,
        customerData
      );
      console.log("Customer details updated successfully:", response.data);
      return response.data; // Make sure to return the updated customer details
    } catch (error) {
      console.error("Failed to update customer details:", error);
      return null; // Return null or throw an error based on your error handling strategy
    }
  };

  const getRestaurantBySearch = async (searchInput) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/customer/${searchInput}`
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch restaurant", error);
    }
  };



  const contextValues = {
    customers,
    customerInfo,
    getAllCustomers,
    getCustomerDetails,
    updateCustomerDetails,
    getRestaurantBySearch,
  };

  return (
    <CustomerContext.Provider value={contextValues}>
      {children}
    </CustomerContext.Provider>
  );
};

export { CustomerContext, CustomerProvider };

const useCustomer = () => useContext(CustomerContext);

export default useCustomer;
