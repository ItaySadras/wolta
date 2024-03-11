import React, { useContext, useReducer } from 'react';
import './EditDishModal.css';
import { RestaurantContext } from '../../context/RestaurantContext';

// Define the initial state
const initialState = {
    name: '',
    image: '',
    price: '',
    ingredients: '',
    intolerances: ''
};

// Define the reducer function
const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_FIELD':
            return {
                ...state,
                [action.field]: action.value
            };
        default:
            return state;
    }
};

const EditDishModal = ({ handleClose, show, dish }) => {
    const { editDish } = useContext(RestaurantContext);
    const [state, dispatch] = useReducer(reducer, {
        ...initialState,
        name: dish.name,
        image: dish.image,
        price: dish.price,
        ingredients: dish.ingredients.join(','),
        intolerances: dish.intolerances.join(',')
    });

    const handleChange = (e) => {
        dispatch({
            type: 'UPDATE_FIELD',
            field: e.target.name,
            value: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { name, image, price, ingredients, intolerances } = state;
        const ingredientsArray = ingredients.split(',');
        const intolerancesArray = intolerances.split(',');

        const dishData = {
            name,
            image,
            price,
            ingredients: ingredientsArray,
            intolerances: intolerancesArray
        };
        console.log("🚀 ~ handleSubmit ~ dishData:", dishData);

        editDish(dish.id, dishData);
        handleClose();
    };

    return (
        <div className="modal" style={{ display: show ? 'block' : 'none' }}>
            <div className="modal-main">
                <form onSubmit={handleSubmit}>
                    <div className='edit-dish-inputs'>
                        <label>
                            Name:
                            <input type="text" name="name" value={state.name} onChange={handleChange} />
                        </label>
                        <label>
                            Image URL:
                            <input type="text" name="image" value={state.image} onChange={handleChange} />
                        </label>
                        <label>
                            Price:
                            <input type="number" name="price" value={state.price} onChange={handleChange} />
                        </label>
                        <label>
                            Ingredients:
                            <input type="text" name="ingredients" value={state.ingredients} onChange={handleChange} />
                        </label>
                        <label>
                            Intolerances:
                            <input type="text" name="intolerances" value={state.intolerances} onChange={handleChange} />
                        </label>
                    </div>
                    <div className='edit-dish-buttons'>
                        <button type="submit">Save</button>
                    </div>
                </form>
                <button onClick={handleClose}>Close</button>
            </div>
        </div>
    );
};

export default EditDishModal;
