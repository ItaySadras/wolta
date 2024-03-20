import React, { useContext, useState } from 'react';
import { RestaurantContext } from '../../context/RestaurantContext';

import './AddDishModal.css';

const AddDishModal = ({ categoryId, dispatch, ACTIONS }) => {
    const { addNewDish } = useContext(RestaurantContext);

    const [newDish, setNewDish] = useState({
        dishName: '',
        image: '',
        price: '',
        // ingredients: [],
        // intolerances: []
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewDish(prevState => ({
            ...prevState,
            [name]: name === 'ingredients' || name === 'intolerances' ? value.split(',') : value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: ACTIONS.ADD_NEW_DISH,
            payload: newDish
        });
        addNewDish(categoryId, newDish);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className='add-dish-modal-form'>
                <div className='add-dish-modal-inputs'>
                    <label>
                        Name:
                        <input type="text" name="dishName" onChange={handleInputChange} />
                    </label>
                    <label>
                        Image URL:
                        <input type="text" name="image" onChange={handleInputChange} />
                    </label>
                    <label>
                        Price:
                        <input type="number" name="price" onChange={handleInputChange} />
                    </label>
                    {/* <label>
                        Ingredients:
                        <input type="text" name="ingredients" onChange={handleInputChange} />
                    </label>
                    <label>
                        Intolerances:
                        <input type="text" name="intolerances" onChange={handleInputChange} />
                    </label> */}
                </div>
                <div className='add-dish-modal-buttons'>
                    <button type="submit">Add dish!</button>
                </div>
            </form>
        </div>
    );
};

export default AddDishModal;
