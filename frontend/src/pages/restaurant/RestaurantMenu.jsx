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
  const { loading, setLoading, getRestaurantById, restaurantInfo, } = useContext(RestaurantContext)
  const [restaurant, setRestaurant] = useState()
  const [fetched, setFetched] = useState(false)


  // for (category of menu) {
  //   const menuCategory = {}
  //   menuCategory.name = category.menuCategoryName
  //   menuCategory.dishes = category.dishes
  // }


  const initialState = [{}]

  useEffect(() => {
    if (!fetched) {
      const fetchRestaurant = async () => {
        await getRestaurantById("65e81f2ce6e2c0fa71c343db")
        setFetched(true)
        setLoading(false)
      }
      fetchRestaurant()
    }
  }, [getRestaurantById, fetched])

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
              id={category.id}
              categoryName={category.menuCategoryName}
              sentDishes={category.dishes}
            />
          ))}
      </div>
    </div>
  )
}

export default RestaurantMenu
