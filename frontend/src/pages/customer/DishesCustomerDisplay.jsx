import React from 'react'
import DishBox from './DishBox';

const DishesCustomerDisplay = ({dishes}) => {
  return (

    <div>{dishes.map(dish=><DishBox key={dish._id} dish={dish}/>)}</div>
  )
}

export default DishesCustomerDisplay