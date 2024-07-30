import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';

function MyOrders() {
    const [orders, setOrder] = useState(null);
    const [authUser, setAuthUser] = useAuth();
    const user = JSON.parse(localStorage.getItem("Users"));
    const userId = authUser ? user._id : null;
    const fetchOrder = async () => {
        await axios.get(`http://localhost:4001/order/view/${userId}`)
            .then(res => {
                setOrder(res.data)
                console.log(res.data)
            }).catch(err => {
                console.error("error in fetching order" + err)
            })
    }
    useEffect(() => {
        fetchOrder();
    }, [])



    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className='pt-28'>
                <h1 className='text-pink-500 md:text-center text-2xl md:text-5xl ' >My Orders</h1>
                {
                    orders ? orders.map((order) => (
                        <div className="card w-92 bg-base-100 m-5 shadow-xl hover:scale-105 
                            duration-200 dark:bg-slate-900 dark:text-white dark:border"
                            style={{ width: "35rem" }}>
                            <div className='px-5'>
                                <h1><span className='font-bold'>Order Id</span> {order._id}</h1>
                                <p><span className='font-bold'>Shipping Address</span> {order.address.street} {order.address.city} {order.address.state} {order.address.country} Zip- {order.address.zip}</p>
                                <h1><span className='font-bold'>Total Price </span>${order.totalPrice}</h1>
                            </div>

                        </div>
                    ))
                        : <h1>No Orders Placed Yet!!</h1>}
            </div>
            <div className='flex flex-col h-screen justify-end'>
                <Footer />
            </div>
        </div>
    )
}

export default MyOrders
