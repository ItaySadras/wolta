import React, { createContext, useState, useContext } from 'react';

const LocationContext = createContext();

const LocationProvider = ({ children }) => {
    const [location, setLocation] = useState(null);

    const getLocation = async () => {
        try {
            const position = await new Promise((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject);
            });
        
            return { latitude: position.coords.latitude, longitude: position.coords.longitude };
          } catch (error) {
            console.error('Error getting user location:', error);
            throw error; // Rethrow the error to be caught in the handleAvailableButton function
          }
      };

    const contextValues = {
        location,
        getLocation
    }

    return (
        <LocationContext.Provider value={contextValues}>
            {children}
        </LocationContext.Provider>
    );
    
}
export {LocationContext, LocationProvider };



