import React from 'react'
import PageMenuDish from './PageMenuDish'

const PageMenuCategory = ({ categoryId, categoryName, sentDishes, dispatch, restaurantId }) => {
    return (
        <div>
            <h3>{categoryName}</h3>
            <ul>
                {sentDishes.map(dish => (
                    <PageMenuDish
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
    )
}

export default PageMenuCategory