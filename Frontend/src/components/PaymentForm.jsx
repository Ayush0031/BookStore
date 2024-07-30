import React, { useEffect, useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            return;
        }

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: 'http://localhost:5173/',
            },
        });

        if (error) {
            console.log('[error]', error);
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="payment-form">
            <PaymentElement />
            <button type="submit" disabled={!stripe || loading} className="place-order-button">
                {loading ? 'Processing...' : 'Place Order'}
            </button>
        </form>
    );
};

export default PaymentForm;
