// components/Checkout.js
import React, { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useAuth } from '../context/AuthProvider';

const stripePromise = loadStripe('pk_test_51PduUnEasZfaFgfChWIk7KUqWzbu3tecD0TnP3W9ooxQsi1lt8l0ZBlCiDnmu1QYn60o12OFx7XtWyCkruHfyAkA00eBGDECry');

const CheckoutForm = ({ userId, address }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.error(error);
            return;
        }

        try {
            const response = await axios.post('http://localhost:4001/order/create', {
                userId,
                address,
                stripeToken: paymentMethod.id
            });

            if (response.status === 201) {
                alert('Order placed successfully');
            }
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Failed to place order'+error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            
            <button type="submit" disabled={!stripe}>Place Order</button>
        </form>
    );
};

const Payment = () => {
  const[authUser,setAuthUser]=useAuth()
  const user=JSON.parse(localStorage.getItem("Users"))
    
    const userId= authUser ? user._id :"null";
    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        zip: '',
        country: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <Elements stripe={stripePromise}>
            <div>
                <h2>Checkout</h2>
                <input
                    type="text"
                    name="street"
                    placeholder="Street"
                    value={address.street}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={address.city}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={address.state}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="zip"
                    placeholder="ZIP"
                    value={address.zip}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={address.country}
                    onChange={handleChange}
                />
                <CheckoutForm userId={userId} address={address} />
            </div>
        </Elements>
    );
};

export default Payment;
