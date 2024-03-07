import React, { useState } from 'react'
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import CustomerPaymentModal from '../../components/customerBasket/CustomerPaymentModal';

const CustomerBasket = () => {

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const sampleOrder = [
    {
      _id: "65e81b8a8630ba788c71bb5e",
      dishName: "Lunch Salad, Chang's Chinese Chicken Salad",
      price: 86,
      quantity: 1
    },
    {
      _id: "65e81b8a8630ba788c71bb5e",
      dishName: "Lunch Salad, Chang's Chinese Chicken Salad",
      price: 86,
      quantity: 1
    },
    {
      _id: "65e81b8a8630ba788c71bb5e",
      dishName: "Lunch Salad, Chang's Chinese Chicken Salad",
      price: 86,
      quantity: 1
    }
  ]

  return (
    <div>
      <div>
        <h2>Your order:</h2>
      </div>
      <div>
        <ul>
          {sampleOrder.map((order) => (
            <li key={order._id}>
              <p>{order.dishName}</p>
              <p>price: {order.price}</p>
              <p>quantity: {order.quantity}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button onClick={handleOpenModal}>Pay with credit card</button>
        <CustomerPaymentModal handleClose={handleCloseModal} show={showModal} />

        <button>Pay with PayPal</button>
      </div>
    </div>
  )
}

export default CustomerBasket