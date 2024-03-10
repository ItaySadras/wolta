import React, { createContext, useState } from 'react';
import axios from 'axios';

const CustomerContext = createContext();

const CustomerProvider = ({ children }) => {
    const [customers, setCustomers] = useState([]);
    const [customerInfo, setCustomerInfo] = useState();

    const getAllcustomers = async () => {
        try {
            const response = await axios.get(
                'http://localhost:8000/api/customer/getAllCustomers'
            );
            setCustomers(response.data);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };


    // const updateCustomerDetails = async (id, data) => {
    //     try {
    //         const response = await axios.post(`http://localhost:8000/api/customer/updateCustomer`)
    //         setCustomerInfo(response.data)
    //     } catch (error) {
            
    //     }
    // }
    

    const contextValues = {
        getAllcustomers
    };

    return (
        <CustomerContext.Provider value={contextValues}>
            {children}
        </CustomerContext.Provider>
    );
};

export { CustomerContext, CustomerProvider };
