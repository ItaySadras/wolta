import React, { useContext } from 'react'
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import MenuDish from './MenuDish';
import { RestaurantContext } from '../../context/RestaurantContext';

const CategoryColumn = ({ dishes, setDishes, dispatch, state }) => {


    return (
        <div>
            <SortableContext items={dishes.map(dish => dish._id)} strategy={verticalListSortingStrategy}>
                {dishes.map((dish) => (
                    <MenuDish
                        key={dish._id}
                        id={dish._id}
                        name={dish.dishName}
                        image={dish.image}
                        price={dish.price}
                        ingredients={dish.ingredients}
                        intolerances={dish.intolerances}
                        dispatch={dispatch}
                        // setDishes={setDishes}
                        state={state}
                    />
                ))}
            </SortableContext>
        </div>
    )
}

export default CategoryColumn
