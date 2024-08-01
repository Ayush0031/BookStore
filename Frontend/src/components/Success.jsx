import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Success = () => {
    const location = useLocation();
    const [orderId, setOrderId] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setOrderId(params.get('orderId'));
    }, [location]);
    
    useEffect(()=>{
        setTimeout(()=>{
            window.location.href = 'http://localhost:5173/';
        },7000)
    },[])

    return (
        <>
            <Navbar />
            <div className='pt-48 flex justify-center'>
                <div className="card w-92 bg-base-100 m-5 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border" style={{ width: "35rem" }}>
                    <h2 className='text-pink-500 md:text-4xl md:text-center'>Payment Successful</h2>
                    <p className='text-center mt-4'>Thank you for your purchase! Your order ID is {orderId}. You will be redirected shortly...</p>
                </div>
            </div>
            <div className='flex flex-col h-screen justify-end'>
                <Footer />
            </div>
        </>
    );
};

export default Success;
