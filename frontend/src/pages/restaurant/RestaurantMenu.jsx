//react
import React, { useContext, useEffect, useState } from 'react'
import { RestaurantContext } from '../../context/RestaurantContext'

//style
import './RestaurantMenu.css'

//components
import MenuCategory from '../../components/restaurantMenu/MenuCategory'


const reducer = (state, action) => {

}


const RestaurantMenu = () => {
  const { getRestaurantById, restaurantInfo, } = useContext(RestaurantContext)
  const [restaurant, setRestaurant] = useState()
  const [loading, setLoading] = useState(true)

  const fetchRestaurant = async () => {
    await getRestaurantById("65e81e3de6e2c0fa71c34279")
    setLoading(false)
  }

  useEffect(() => {
    fetchRestaurant()
  }, [getRestaurantById])

  useEffect(() => {
    if (restaurantInfo) {
      setRestaurant(restaurantInfo)
    }
  }, [restaurantInfo])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className='menu-container'>
      <div className='menu-title-container'>
        <h2>Your menu</h2>
      </div>

      <div className='menu-category-container'>
        {restaurant &&
          Object.values(restaurant.menu.menuCategories).map((category) => (
            <MenuCategory
              categoryId={category._id}
              categoryName={category.menuCategoryName}
              sentDishes={category.dishes}
            />
          ))}
      </div>
    </div>
  )
}

export default RestaurantMenu
