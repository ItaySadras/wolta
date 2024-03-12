import React, { useEffect, useState } from 'react';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import CustomerPaymentModal from '../../components/customerBasket/CustomerPaymentModal';
import './CustomerBasket.css';
import { useParams } from 'react-router-dom';

const CustomerBasket = () => {
  const [showModal, setShowModal] = useState(false);
  const [orderDishes, setOrderDishes] = useState([])
  // console.log("🚀 ~ CustomerBasket ~ orderDishes:", orderDishes)

  const { restaurantId } = useParams()

  const currentOrders = JSON.parse(localStorage.getItem('orders'))

  const currentOrder = currentOrders.filter((order) => {
    if (Object.keys(order).toString() === restaurantId) {
      // console.log("🚀 ~ currentOrder ~ Object.keys(order):", Object.keys(order).toString())
      return order
    }
  })

  const orderOBJ = currentOrder[0]
  // console.log("🚀 ~ CustomerBasket ~ displayedOrder:", orderOBJ)

  const orderARR = Object.values(orderOBJ)
  // console.log("🚀 ~ CustomerBasket ~ orderARR:", orderARR)

  const orderARR2 = orderARR[0]

  const newOrderARR = orderARR2.filter((element, index) => index % 2 !== 0);
  // console.log("🚀 ~ newOrderARR ~ newOrderARR:", newOrderARR)

  useEffect(() => {
    setOrderDishes(newOrderARR)
  },[])

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleRemoveDish = (id) => {
    const updatedDishes = orderDishes.filter(dish => dish.dishId !== id);
    // console.log("🚀 ~ handleRemoveDish ~ updatedDishes:", updatedDishes)
    setOrderDishes(updatedDishes);
 };



  return (
    <div className="customer-basket">
      <div className="order-summary">
        <h2 className='basket-h2'>Your order:</h2>
        <ul className="order-list">
          {newOrderARR.map((order, index) => (
            <li key={index} className="order-item">
              <p className="dish-name">{order.dishName}</p>
              <p className="price">Price: ${order.price}</p>
              <button className="basket-remove-button" onClick={() => handleRemoveDish(order.dishId)}>remove</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="payment-options">
        <button onClick={handleOpenModal} className="pay-button credit-card">Pay with credit card</button>
        <CustomerPaymentModal handleClose={handleCloseModal} show={showModal} />
        <button className="pay-button paypal">Pay with PayPal</button>
      </div>
    </div>
  );
};

export default CustomerBasket;
