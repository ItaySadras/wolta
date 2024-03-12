import axios from "axios";

export const getAllRestaurants = async (page, limit) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/customer/getAllRestaurant?page=${page}&limit=${limit}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getRestaurantBySearch = async (
  page,
  limit,
  { searchInput, filter }
) => {
  console.log("🚀 ~ filter:", filter)
  try {
    const response = await axios.get(
      `http://localhost:8000/api/customer/${searchInput}?page=${page}&limit=${limit}&filter=${filter}`
    );
    console.log("🚀 ~ response:", response)
    return response;
  } catch (error) {
    console.error("Failed to fetch restaurant", error);
  }
};
