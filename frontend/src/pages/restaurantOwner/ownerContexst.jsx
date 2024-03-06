import React, { createContext } from 'react'

const CustomerContext = createContext()

const CustomerProvider = () => {

    const [customers, setCustomers] = useState([]);
    const [customerInfo, setCustomerInfo] = useState()


    const getAllcustomers = async () => {
        try {
            
        } catch (error) {
            
        }
    }


    const contextValues = {

    }

  return (
    <CustomerContext.Provider value={contextValues}>
        {children}
    </CustomerContext.Provider>
  )
  }