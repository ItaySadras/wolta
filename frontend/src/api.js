import axios from "axios";

export const getAllRestaurants = async (page, limit) => {
    try {
        const response = await axios.get(
            `http://localhost:8000/api/restaurant/getAllRestaurant?page=${page}&limit=${limit}`
        );
        return response.data;
    } catch (error) {
        console.log("boob");
        console.log(error);
    }
};

export const getRestaurantBySearch = async ({searchInput}) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/customer/${searchInput}`
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch restaurant", error);
    }
  };
