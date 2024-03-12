import React from "react";
import PageMenuDish from "./PageMenuDish";
import "./restaurantMenu.css"

const PageMenuCategory = ({
  categoryId,
  categoryName,
  sentDishes,
  dispatch,
  restaurantId,
}) => {
  return (
    <div>
      <div className="Category-backgrownd-div">
        <h3>{categoryName}</h3>
      </div>
      <ul>
        {sentDishes.map((dish) => (
          <PageMenuDish
           key= {dish._id}
            dishId={dish._id}
            dishName={dish.dishName}
            price={dish.price}
            image={dish.image}
            ingredients={dish.ingredients}
            intolerances={dish.intolerances}
            dispatch={dispatch}
            restaurantId={restaurantId}
          />
        ))}
      </ul>
    </div>
  );
};

export default PageMenuCategory;
