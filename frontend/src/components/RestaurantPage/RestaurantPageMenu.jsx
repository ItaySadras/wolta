import React, { useEffect, useReducer } from "react";
import "../../pages/restaurant/restaurant.css";
import PageMenuCategory from "./PageMenuCategory";
import { useParams } from "react-router-dom";

function reducer(state, action) {
  switch (action.type) {
     case "ADD_DISH":
       let ordersData = localStorage.getItem("orders");
       let parsedOrdersData = ordersData ? JSON.parse(ordersData) : [];
       if (!Array.isArray(parsedOrdersData)) {
         console.error('Expected ordersData to be an array, but got:', parsedOrdersData);
         parsedOrdersData = []; // Fallback to an empty array if not an array
       }
 
       const restaurantKey = action.payload.restaurantId;
       const dish = {
         dishId: action.payload.dishId,
         image: action.payload.image,
         price: action.payload.price,
         dishName: action.payload.dishName,
       };
 
       const index = parsedOrdersData.findIndex(
         (item) => Object.keys(item)[0] === restaurantKey
       );
 
       if (index !== -1) {
         // Check if the dish already exists in the order
         const existingDishIndex = parsedOrdersData[index][restaurantKey].findIndex(
           (existingDish) => existingDish.dishId === dish.dishId
         );
         if (existingDishIndex === -1) {
           // If the dish does not exist, add it
           parsedOrdersData[index][restaurantKey].push(dish);
         } else {
           // If the dish already exists, you might want to handle this case differently
           // For example, you could update the quantity or simply ignore the action
           console.log('Dish already exists in the order');
         }
       } else {
         // If the restaurant does not have an order yet, create a new one
         parsedOrdersData.push({ [restaurantKey]: [dish] });
       }
 
       localStorage.setItem("orders", JSON.stringify(parsedOrdersData));
       return { ...state, orders: parsedOrdersData };
 
     default:
       return state;
  }
 }
 

const RestaurantPageMenu = ({ restaurantInfo }) => {
 const initialState = {
    orders: JSON.parse(localStorage.getItem("orders")) || [],
 };
 const [state, dispatch] = useReducer(reducer, initialState);
 const { restaurantId } = useParams();

 // Uncomment and implement the useEffect hook if needed
 // useEffect(() => {
 //   // Dispatch action to create a new restaurant order
 // }, []);

 return (
    <div>
      <div>
        <h1>Menu:</h1>
      </div>
      {restaurantInfo &&
        Object.values(restaurantInfo.menu.menuCategories).map((category) => (
          <PageMenuCategory
            key={category._id}
            categoryId={category._id}
            categoryName={category.menuCategoryName}
            sentDishes={category.dishes}
            dispatch={dispatch}
            restaurantId={restaurantId}
          />
        ))}
    </div>
 );
};

export default RestaurantPageMenu;
