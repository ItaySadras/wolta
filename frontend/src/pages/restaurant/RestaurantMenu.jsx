import React, { useContext, useEffect, useReducer, useState } from 'react';
import { RestaurantContext } from '../../context/RestaurantContext';
import './RestaurantMenu.css';
import MenuCategory from '../../components/restaurantMenu/MenuCategory';
import { useParams } from 'react-router-dom';

const ACTIONS = {
  DELETE_CATEGORY: "DELETE_CATEGORY"
};

const reducer = (state, action) => {
  const currentCategories = state.categories;
  const filteredCategories = currentCategories.filter(category => category.name === action.payload);
  switch (action.type) {
    case ACTIONS.DELETE_CATEGORY:
      return {
        categories: filteredCategories
      };
    default:
      return state;
  }
};

const RestaurantMenu = () => {
  const { getRestaurantById, restaurantInfo, createMenuCategory } = useContext(RestaurantContext);
  const [loading, setLoading] = useState(true);
  const [initialState, setInitialState] = useState({ categories: [] });
  const { restaurantId } = useParams();

  const fetchRestaurant = async () => {
    await getRestaurantById(restaurantId);
    if (restaurantInfo && restaurantInfo.menu && restaurantInfo.menu.menuCategories) {
      setInitialState({ categories: restaurantInfo.menu.menuCategories });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRestaurant();
  }, [restaurantInfo]);

  const [state, dispatch2] = useReducer(reducer, initialState);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleSubmitAddCategory = (event, menuId) => {
    event.preventDefault();
    const categoryName = event.target.elements.categoryName.value;
    createMenuCategory(menuId, categoryName);
  };

  return (
    <div className='menu-container'>
      <div className='menu-title-container'>
        <h2>Your menu</h2>
      </div>
      <div>
        <form onSubmit={(event) => handleSubmitAddCategory(event, restaurantInfo.menu._id)}>
          <input
            type="text"
            placeholder="New category name"
            name='categoryName'
          />
          <button type='submit'>
            Add new category
          </button>
        </form>
      </div>

      <div className='menu-category-container'>
        {restaurantInfo && restaurantInfo.menu && restaurantInfo.menu.menuCategories &&
          Object.values(restaurantInfo.menu.menuCategories).map((category) => (
            <MenuCategory
              categoryId={category._id}
              categoryName={category.menuCategoryName}
              sentDishes={category.dishes}
            />
          ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
