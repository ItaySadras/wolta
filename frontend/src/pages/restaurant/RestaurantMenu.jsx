import React, { useContext, useEffect, useState } from 'react'
import { RestaurantContext } from '../../context/RestaurantContext'

const RestaurantMenu = () => {

  const { getRestaurantById, restaurantInfo } = useContext(RestaurantContext);

  const [restaurant, setRestaurant] = useState()


  useEffect(() => {
    getRestaurantById("65e81c798630ba788c71bcb3")
  }, [])

  useEffect(() => {
    setRestaurant(restaurantInfo);
  }, [restaurantInfo]);

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <h3>Your menu</h3>
      </div>
      <div>
        {restaurant && Object.values(restaurant.menu.menuCategories).map((value, index) => (
          <div key={index}>
            <h3>
              {value.menuCategoryName}
            </h3>
            {value.dishes.map((dish, index) => (
              <div>
                <img src={dish.image} alt="" className='dish-image' />
                <p>
                  {dish.dishName}
                </p>
                <p>
                  Price:
                  {dish.price} ₪
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default RestaurantMenu