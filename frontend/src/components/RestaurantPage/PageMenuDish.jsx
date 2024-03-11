import React from 'react';



const PageMenuDish = ({ dishId, dishName, price, image, ingredients, intolerances }) => {
    

    


    const handleClick = () => {
        // dispatch({
        //     type: 'ADD_DISH',
        //     payload: { id: dishId, name: dishName, price, image }
        // });
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
                <button onClick={() => handleClick()}>Add to order</button>
            </div>
        </div>
    );
};

export default PageMenuDish;
