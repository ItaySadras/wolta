import axios from "axios";

export const getAllRestaurants = async (page, limit) => {
    try {
        const response = await axios.get(
            `http://localhost:8000/api/restaurant/getAllRestaurant?page=${page}&limit=${limit}`
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getRestaurantBySearch = async (page,limit,{searchInput}) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/customer/${searchInput}?page=${page}&limit=${limit}`
      );
      return response;
    } catch (error) {
      console.error("Failed to fetch restaurant", error);
    }
  };
