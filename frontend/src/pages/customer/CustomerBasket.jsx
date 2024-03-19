import React, { useEffect, useState, useContext } from 'react';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import CustomerPaymentModal from '../../components/customerBasket/CustomerPaymentModal';
import './CustomerBasket.css';
import { useParams } from 'react-router-dom';
import { SocketContext } from '../../context/SocketContext';

const CustomerBasket = () => {
 const [showModal, setShowModal] = useState(false);
 const [orderDishes, setOrderDishes] = useState([]);
 const { restaurantId } = useParams();

 useEffect(() => {
    const currentOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const currentOrder = currentOrders.find(order => Object.keys(order)[0] === restaurantId);
    const orderDishes = currentOrder ? Object.values(currentOrder)[0] : [];
    setOrderDishes(orderDishes);
 }, [restaurantId]);

 const handleOpenModal = () => {
    setShowModal(true);
 };

 const handleCloseModal = () => {
    setShowModal(false);
 };

 const handleRemoveDish = (id) => {
    const updatedDishes = orderDishes.filter(dish => dish.dishId !== id);
    setOrderDishes(updatedDishes);
    const currentOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const index = currentOrders.findIndex(order => Object.keys(order)[0] === restaurantId);
    if (index !== -1) {
      currentOrders[index][restaurantId] = updatedDishes;
      localStorage.setItem('orders', JSON.stringify(currentOrders));
    }
 };

 return (
    <div className="customer-basket">
      <div className="order-summary">
        <h2 className='basket-h2'>Your order:</h2>
        <ul className="order-list">
          {orderDishes.map((order, index) => (
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
        {orderDishes.length > 0 &&
          <CustomerPaymentModal
            handleClose={handleCloseModal}
            show={showModal}
            orderDishes={orderDishes}
            restaurantId={restaurantId}
          />}
        <button className="pay-button paypal">Pay with PayPal</button>
      </div>
    </div>
 );
};

export default CustomerBasket;
