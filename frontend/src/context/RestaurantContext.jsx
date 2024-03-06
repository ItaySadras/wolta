import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const RestaurantContext = createContext();

const RestaurantProvider = ({ children }) => {
    const [restaurants, setRestaurants] = useState([]);
    const [restaurantInfo, setRestaurantInfo] = useState();


    useEffect(() => {
        getAllRestaurants()
    }, [])


    const getAllRestaurants = async (page, limit) => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/restaurant/getAllRestaurants?page=${page}&limit=${limit}`
            );
            setRestaurants(prevRestaurants => [...prevRestaurants, ...response.data.restaurants]);
        } catch (error) {
            console.log(error);
        }
    };




    const contextValues = {
        restaurants,
        setRestaurants,
        restaurantInfo,
        setRestaurantInfo,
        getAllRestaurants,

    };

    return (
        <RestaurantContext.Provider value={contextValues}>
            {children}
        </RestaurantContext.Provider>
    );
};

export { RestaurantContext, RestaurantProvider };
