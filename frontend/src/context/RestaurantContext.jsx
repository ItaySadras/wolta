import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const RestaurantContext = createContext();

const RestaurantProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [restaurants, setRestaurants] = useState([]);
    const [restaurantInfo, setRestaurantInfo] = useState();

    useEffect(() => {
        getAllRestaurants()
    }, [])


    const getAllRestaurants = async (page, limit) => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/restaurant/getAllRestaurant?page=${page}&limit=${limit}`
            );
            setRestaurants(prevRestaurants => [...prevRestaurants, ...response.data.restaurants]);
        } catch (error) {
            console.log(error);
        }
    };

    const getRestaurantById = async (id) => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/restaurant/${id}`
            );
            setRestaurantInfo(response.data.restaurant);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteDishById = async (id, ) => {
        try {
            const response = await axios.delete(
                `http://localhost:8000/api/restaurant/deleteDish/${id}`
            );
            return response
        } catch (error) {
            console.log(error);
        }
    }





    const contextValues = {
        // states
        restaurants,
        setRestaurants,
        restaurantInfo,
        setRestaurantInfo,
        loading,
        setLoading,
        // functions
        getAllRestaurants,
        getRestaurantById,
        deleteDishById,

    };

    return (
        <RestaurantContext.Provider value={contextValues}>
            {children}
        </RestaurantContext.Provider>
    );
};

export { RestaurantContext, RestaurantProvider };
