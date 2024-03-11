import React, { useState } from 'react';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import CustomerPaymentModal from '../../components/customerBasket/CustomerPaymentModal';
import './CustomerBasket.css';

const CustomerBasket = () => {
  const [showModal, setShowModal] = useState(false);
  
  const [orderObjects, setOrderObjects] = useState([
    {
      _id: "65e81b8a8630ba788c71bb5e1",
      dishName: "Lunch Salad, Chang's Chinese Chicken Salad",
      price: 86,
      quantity: 1
    },
    {
      _id: "65e81b8a8630ba788c71bb5e2",
      dishName: "Szechuan Beef",
      price: 95,
      quantity: 2
    },
    {
      _id: "65e81b8a8630ba788c71bb5e3",
      dishName: "Mongolian Pork",
      price: 78,
      quantity: 1
    },
  ]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleRemoveDish = (id) => {
    const updatedOrderObjects = orderObjects.filter(order => order._id !== id);
    setOrderObjects(updatedOrderObjects);
  };


  // localStorage.setItem('order', JSON.stringify(orderObjects));
  // console.log(JSON.parse(localStorage.getItem('order')));

  return (
    <div className="customer-basket">
      <div className="order-summary">
        <h2 className='basket-h2'>Your order:</h2>
        <ul className="order-list">
          {orderObjects.map((order, index) => (
            <li key={order._id + index} className="order-item">
              <p className="dish-name">{order.dishName}</p>
              <p className="price">Price: ${order.price}</p>
              <p className="quantity">Quantity: {order.quantity}</p>
              <button className="basket-remove-button" onClick={() => handleRemoveDish(order._id)}>remove</button>
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
