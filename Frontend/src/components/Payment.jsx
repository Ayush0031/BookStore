import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useAuth } from '../context/AuthProvider';
import Navbar from './Navbar';
import Footer from './Footer';

const stripePromise = loadStripe('pk_test_51PduUnEasZfaFgfChWIk7KUqWzbu3tecD0TnP3W9ooxQsi1lt8l0ZBlCiDnmu1QYn60o12OFx7XtWyCkruHfyAkA00eBGDECry');
const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: '#32325d',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a',
        },
    },
};

const CheckoutForm = ({ userId, address }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        const createPaymentIntent = async () => {
            try {
                const response = await axios.post('http://localhost:4001/order/payment-intents', { userId, address });
                setClientSecret(response.data.clientSecret);
            } catch (error) {
                console.error('Error creating payment intent:', error);
            }
        };

        createPaymentIntent();
    }, [userId, address]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const cardElement = elements.getElement(CardElement);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    address: {
                        line1: address.street,
                        city: address.city,
                        state: address.state,
                        postal_code: address.zip,
                        country: address.country
                    }
                }
            },
            
           
        });
        if (error) {
            console.error(error);
            alert('Payment failed: ' + error.message);
            return;
        }

        try {
            const response = await axios.post('http://localhost:4001/order/create', {
                userId,
                address,
                paymentIntentId: paymentIntent.id,
            });

            if (response.status === 201) {
                alert('Order placed successfully');
                console.log(response)
                setTimeout(()=>{
                    window.location.href = `http://localhost:5173/success?orderId=${response.data._id}`;
                },2000)
                
            } else {
                console.error('Order creation failed with status:', response.status);
            }
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Failed to place order: ' + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement options={CARD_ELEMENT_OPTIONS} />
            <button type="submit" disabled={!stripe || !clientSecret}>Place Order</button>
        </form>
    );
};

const Payment = () => {
    const [authUser, setAuthUser] = useAuth()
    const user = JSON.parse(localStorage.getItem("Users"))

    const userId = authUser ? user._id : "null";
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
        <>
            <Navbar />
            <div className='pt-48 flex justify-center'>
                <Elements stripe={stripePromise}>

                    <div className=" card w-92 bg-base-100 m-5 shadow-xl hover:scale-105 
                            duration-200 dark:bg-slate-900 dark:text-white dark:border"
                        style={{ width: "35rem" }}>
                        <h2 className='text-pink-500 md:text-4xl md:text-center'>Enter Details</h2>
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

            </div>

            <div className='flex flex-col h-screen justify-end'>
                <Footer />
            </div>
        </>
    );
};

export default Payment;
