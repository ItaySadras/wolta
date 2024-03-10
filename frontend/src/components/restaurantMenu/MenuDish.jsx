// MenuDish.js
import React, { useContext, useState } from 'react';
import './MenuDish.css';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RestaurantContext } from '../../context/RestaurantContext';

const MenuDish = ({ id, name, image, price, ingredients, intolerances, dispatch, state, setDishes }) => {

    const { deleteDishById } = useContext(RestaurantContext);


    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id, direction: "vertical" });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition || 'transform 0.2s ease',
        cursor: isDragging ? "grabbing" : "pointer",
        backgroundColor: "white",
        border: "1px solid black",
        boxShadow: "1px 1px 2px grey",
    };

    const handleDishDelete = async (e, id) => {
        e.preventDefault()
        try {
            const response = await deleteDishById(id);

            if (response.status === 200) {
                dispatch({
                    type: "DELETE_DISH",
                    payload: id
                })
                // setDishes(state.dishes)
            }
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className='dish'
        >
            <div>
                <h4>{name}</h4>
                <img src={image} alt={name} className='dish-image' />
                <p>Price: {price} ₪</p>
                <p>Ingredients: {ingredients}</p>
                <p>Intolerances: {intolerances}</p>
            </div>
            <div>
                <button onMouseDown={(e) => handleDishDelete(e, id)}>Delete dish</button>
            </div>
        </div>
    );
}

export default MenuDish;
