import React from "react";

const PageMenuDish = ({
  dishId,
  dishName,
  price,
  image,
  ingredients,
  intolerances,
  dispatch,
  restaurantId,
}) => {
  const handleClick = () => {
    dispatch({
      type: "ADD_DISH",
      payload: {
        dishId: dishId,
        restaurantId: restaurantId,
        dishName: dishName,
        price: price,
        image: image,
      },
    });
  };

  return (
    <div className="dish-menu-for-restaurant-container">
      <div className="dish-menu-for-restaurant">
        <div>
          {" "}
          <img className="img-for-dish" src={image} alt={dishName} />
        </div>
        <div>
          {" "}
          <h1>{dishName}</h1>
          <p>Price: ${price}</p>
          <p>Ingredients: {ingredients}</p>
          <p>Intolerances: {intolerances}</p>
        </div>
        
      </div>
      <div>
          <button className="dish-addtoorder-button" onClick={handleClick}>Add to order</button>
        </div>
    </div>
  );
};

export default PageMenuDish;
