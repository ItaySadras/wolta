const CustomerDetails = ({ customer, onEdit }) => {
    return (
      <div>
        <h2>Hello, {customer.name}!</h2>
        <h3>Email: {customer.email}</h3>
        <h3>Phone number: {customer.phoneNumber}</h3>
        <button onClick={onEdit}>Edit Details</button>
      </div>
    );
  };
  
  export default CustomerDetails;
  