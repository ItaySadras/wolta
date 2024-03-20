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
    SORT_DISHES: "SORT_DISHES",
    ADD_NEW_DISH: "ADD_NEW_DISH",
}


const reducer = (state, action) => {
    const currentDishes = state.dishes
    const filteredDishes = currentDishes.filter(dish => dish._id !== action.payload)
    switch (action.type) {
        case ACTIONS.DELETE_DISH:
            return {
                dishes: filteredDishes
            }
        case ACTIONS.SORT_DISHES:
            const { activeId, overId } = action.payload;
            const activeIndex = currentDishes.findIndex(dish => dish._id === activeId);
            const overIndex = currentDishes.findIndex(dish => dish._id === overId);
            const newDishes = arrayMove(currentDishes, activeIndex, overIndex);
            return {
                dishes: newDishes
            };
        case ACTIONS.ADD_NEW_DISH:
            return {
                dishes: [...currentDishes, action.payload]
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


    const { updateDishOrder, deleteMenuCategory } = useContext(RestaurantContext)


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
    };

    const handleDeleteCategory = (e, categoryId) => {
        e.preventDefault()
        deleteMenuCategory(categoryId)

    }



    return (
        <div className='category-container'>
            <div>
                <h2 className='category-title'>{categoryName}</h2>
            </div>
            <div>
                <button onClick={(e) => handleDeleteCategory(e, categoryId)}>Delete category</button>
            </div>
            <div>
                <div>
                    <AddDishModal
                        categoryId={categoryId}
                        dispatch={dispatch}
                        ACTIONS={ACTIONS}
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
