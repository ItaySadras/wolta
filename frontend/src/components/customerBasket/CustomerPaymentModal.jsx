import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import './CustomerPaymentModal.css'; // Import CSS for modal styles

const CustomerPaymentModal = ({ handleClose, show }) => {
    const [state, setState] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
    });

    const handleInputChange = (evt) => {
        const { name, value } = evt.target;

        // Limit the length of the value based on the maxLength property
        const maxLength = evt.target.maxLength;
        const truncatedValue = value.slice(0, maxLength);

        // If the value is numeric, update the state
        if (/^\d*$/.test(truncatedValue)) {
            setState((prev) => ({ ...prev, [name]: truncatedValue }));
        }
    }

    const handleInputFocus = (evt) => {
        setState((prev) => ({ ...prev, focus: evt.target.name }));
    }

    return (
        <div className={show ? "modal display-block" : "modal display-none"}>
            <section className="modal-main">
                <button onClick={handleClose}>Close</button>
                <Cards
                    number={state.number}
                    expiry={state.expiry}
                    cvc={state.cvc}
                    name={state.name}
                    focused={state.focus}
                />
                <form>
                    <input
                        type="number"
                        name="number"
                        placeholder="Card Number"
                        value={state.number}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        maxLength={16}
                    />
                    <input
                        type="number"
                        name="expiry"
                        placeholder="MM/YY"
                        value={state.expiry}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        maxLength={4}
                    />
                    <input
                        type="number"
                        name="cvc"
                        placeholder="CVC"
                        value={state.cvc}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        maxLength={3}
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="Your name"
                        value={state.name}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        maxLength={20}
                    />
                </form>
            </section>
        </div>
    );
};

export default CustomerPaymentModal;
