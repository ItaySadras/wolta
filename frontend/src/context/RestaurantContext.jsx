import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const RestaurantContext = createContext();
axios.defaults.withCredentials = true;

const RestaurantProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [restaurants, setRestaurants] = useState([]);
    const [restaurantInfo, setRestaurantInfo] = useState();



    const getAllRestaurants = async (page, limit) => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/restaurant/getAllRestaurant?page=${page}&limit=${limit}`
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };

    // useEffect(() => {
    //     getAllRestaurants()
    // }, [])
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

    const updateRestaurantInfo = async (id, newData) => {
        try {
            const response = await axios.patch(
                `http://localhost:8000/api/restaurant/${id}`,
                newData
            );
            setRestaurantInfo(response.data.restaurant);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteDishById = async (id) => {
        try {
            const response = await axios.delete(
                `http://localhost:8000/api/restaurant/deleteDish/${id}`
            );
            return response
        } catch (error) {
            console.log(error);
        }
    }

    const updateDishOrder = async (categoryId, dishOrder) => {
        try {
            const response = await axios.patch(
                `http://localhost:8000/api/restaurant/changeMenuCategoryOrder/${categoryId}`,
                dishOrder,
            )
            console.log("🚀 ~ updateDishOrder ~ dishOrder:", dishOrder)
            return response
        } catch (error) {
            console.log(error);
        }
    }

    const editDish = async (dishId, newDishData) => {
        try {
            const response = await axios.patch(
                `http://localhost:8000/api/restaurant/updateDish/${dishId}`,
                newDishData
            );
            return response
        } catch (error) {
            console.log(error);
        }
    }

    const addNewDish = async (menuCategoryId, newDishData) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/api/restaurant/createDish/${menuCategoryId}`,
                { dish: newDishData }
            )
            return response
        } catch (error) {
            console.log(error)
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
        updateDishOrder,
        editDish,
        addNewDish,

    };

    return (
        <RestaurantContext.Provider value={contextValues}>
            {children}
        </RestaurantContext.Provider>
    );
};

export { RestaurantContext, RestaurantProvider };
