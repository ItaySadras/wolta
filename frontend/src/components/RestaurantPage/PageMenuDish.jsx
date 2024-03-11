import React from 'react';



const PageMenuDish = ({ dishId, dishName, price, image, ingredients, intolerances, dispatch, restaurantId }) => {

    const handleClick = () => {
        dispatch({
            type: 'ADD_DISH',
            payload: {
                dishId: dishId, 
                restaurantId: restaurantId
            }
        });
    };

    return (
        <div>
            <div>
                <h1>{dishName}</h1>
                <img src={image} alt={dishName} />
                <p>Price: ${price}</p>
                <p>Ingredients: {ingredients}</p>
                <p>Intolerances: {intolerances}</p>
            </div>
            <div>
                <button onMouseDown={() => handleClick()}>Add to order</button>
            </div>
        </div>
    );
};

export default PageMenuDish;
