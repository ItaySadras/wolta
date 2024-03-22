import React from 'react';

const OrderCompleted = () => {
  return (
    <div style={styles.container}>
      <p style={styles.message}>Your order is completed, our courier is on his way!</p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: 20,
  },
  message: {
    fontFamily: 'Arial, sans-serif',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
};

export default OrderCompleted;
