import React, { useEffect, useReducer } from 'react'
import "../../pages/restaurant/restaurant.css";
import PageMenuCategory from './PageMenuCategory';
import { useParams } from 'react-router-dom';


function reducer(state, action) {
    switch (action.type) {
        case 'ADD_DISH':
            localStorage.setItem('')
        case 'NEW_RESTAURANT_ORDER':
            localStorage.setItem(`${action.payload}`, JSON.stringify([]))
        default:
            return state;
    }
}

const RestaurantPageMenu = ({ restaurantInfo }) => {
    const initialState = {
        orders: {}
    };
    const [state, dispatch] = useReducer(reducer, initialState);
    const { restaurantId } = useParams()
    console.log("🚀 ~ RestaurantPageMenu ~ restaurantId:", restaurantId)

    const createNewRestaurantOrder = () => {
        dispatch({
            type: 'NEW_RESTAURANT_ORDER',
            payload: restaurantId
        })
    }

    useEffect(() => {
        createNewRestaurantOrder()
    }, [])
    return (
        <div>
            <div>
                <h2>Menu</h2>
            </div>
            {restaurantInfo &&
                Object.values(restaurantInfo.menu.menuCategories).map((category) => (
                    <PageMenuCategory
                        categoryId={category._id}
                        categoryName={category.menuCategoryName}
                        sentDishes={category.dishes}
                    />
                ))}

        </div>
    )
}

export default RestaurantPageMenu