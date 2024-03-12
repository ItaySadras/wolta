import React, { useEffect, useReducer } from "react";
import "../../pages/restaurant/restaurant.css";
import PageMenuCategory from "./PageMenuCategory";
import { useParams } from "react-router-dom";

function reducer(state, action) {
  // console.log("🚀 ~ reducer ~ action:", action)
  switch (action.type) {
    case "ADD_DISH":
      const ordersData = localStorage.getItem("orders");
      const restaurantKey = action.payload.restaurantId;
      const dishId = action.payload.dishId;
      const dishName = action.payload.dishName;
      const price = action.payload.price;
      const image = action.payload.image;
      const parsedOrdersData = JSON.parse(ordersData);
      // console.log("🚀 ~ reducer ~ parsedOrdersData:", parsedOrdersData)
      const index = parsedOrdersData.findIndex(
        (item) => Object.keys(item)[0] === restaurantKey
      );
      if (index !== -1) {
        // console.log(index);
        const helper = parsedOrdersData[index];
        // console.log("🚀 ~ reducer ~ helper:", Object.values(helper))
        helper[restaurantKey].push({ dishId, image, price, dishName });
        parsedOrdersData[index] = helper;
        localStorage.setItem("orders", JSON.stringify(parsedOrdersData));
        return state;
      } else {
        parsedOrdersData.push({ [restaurantKey]: [dishId] });
        localStorage.setItem("orders", JSON.stringify(parsedOrdersData));
        return state;
      }
      return state;
    default:
      return state;
  }
}
// const usedRestaurantId = action.payload.restaurantId
// const initialData = [{ [usedRestaurantId]: [] }]
// console.log("🚀 ~ reducer ~ initialData:", initialData)
// localStorage.setItem('orders', `${JSON.stringify(initialData)}`

// if (ordersData) {
//     try {

//         if (Array.isArray(parsedOrdersData)) {
//             parsedOrdersData.map((currentOrder) => {
//                 const keys = Object.keys(currentOrder);
//                 keys.forEach((key) => {
//                     if (key !== usedRestaurantId) {
//                         parsedOrdersData.push({ usedRestaurantId: [] })
//                         localStorage.setItem('orders', JSON.stringify(parsedOrdersData));
//                         console.log('bobby')
//                     } else {
//                         return
//                     }
//                 })
//             })
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }

const RestaurantPageMenu = ({ restaurantInfo }) => {
  const initialState = {
    orders: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { restaurantId } = useParams();

  // const createNewRestaurantOrder = () => {
  //     dispatch({
  //         type: 'NEW_RESTAURANT_ORDER',
  //         payload: {
  //             restaurantId: restaurantId
  //         }
  //     })
  // }

  // useEffect(() => {
  //     createNewRestaurantOrder()
  // }, [])

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
