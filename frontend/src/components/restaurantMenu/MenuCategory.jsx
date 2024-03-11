import React, { useContext, useReducer, useState } from 'react'
import './MenuCategory.css'
import CategoryColumn from './CategoryColumn';

//dnd
import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    closestCorners,
} from "@dnd-kit/core";
import {
    SortableContext,
    arrayMove,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { RestaurantContext } from '../../context/RestaurantContext';
import AddDishModal from './AddDishModal';

const ACTIONS = {
    DELETE_DISH: "DELETE_DISH",
    SORT_DISHES: "SORT_DISHES"
}


const reducer = (state, action) => {
    const currentDishes = state.dishes
    console.log("🚀 ~ reducer ~ currentDishes:", currentDishes)
    const filteredDishes = currentDishes.filter(dish => dish._id !== action.payload)
    switch (action.type) {
        case ACTIONS.DELETE_DISH:
            return {
                dishes: filteredDishes
            }
        case ACTIONS.SORT_DISHES:
            const { activeId, overId } = action.payload;
            const activeIndex =currentDishes.findIndex(dish => dish._id === activeId);
            const overIndex = currentDishes.findIndex(dish => dish._id === overId);
            const newDishes = arrayMove(currentDishes, activeIndex, overIndex);
            console.log("🚀 ~ reducer ~ newDishes:", newDishes)
            return {
                dishes: newDishes
            };
        default:
            return state;
    }
}

const MenuCategory = ({ categoryId, categoryIndex, categoryName, sentDishes }) => {

    const initialState = {
        dishes: sentDishes
    }
    const [state, dispatch] = useReducer(reducer, initialState)


    const { updateDishOrder } = useContext(RestaurantContext)


    const sensors = useSensors(
        useSensor(PointerSensor),

    );

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id === over.id) return;

        dispatch({
            type: ACTIONS.SORT_DISHES,
            payload: { activeId: active.id, overId: over.id }
        });
        const dishOrder = state.dishes.map((dish => dish._id.toString()))


        updateDishOrder(categoryId, dishOrder)
        console.log("🚀 ~ handleDragEnd ~ categoryId:", categoryId)
        console.log('biger was right')


    };

    

    return (
        <div className='category-container'>
            <div>
                <h2 className='category-title'>{categoryName}</h2>
            </div>
            <div>
                <div>
                    <AddDishModal
                        
                        categoryId={categoryId}
                    />
                </div>
            </div>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragEnd={handleDragEnd}
            >
                <div className='dish-list'>
                    <CategoryColumn
                        dishes={state.dishes}
                        dispatch={dispatch}
                        state={state}
                        ACTIONS={ACTIONS}
                    />
                </div>
            </DndContext>
        </div >
    )
}

export default MenuCategory
