import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import PdfIcon from '../../public/pdficon.svg';
import download from '../../public/download.svg'
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

    const viewReceipt = (orderId) => {
        window.open(`http://localhost:4001/order/receipt/${orderId}`);
    };

    const downloadReceipt = (orderId) => {
        window.location.href = `http://localhost:4001/order/receipt/${orderId}?download=true`;
    };
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className='pt-20 mb-20'>
                <h1 className='text-pink-500 md:text-center text-2xl md:text-5xl' >My Orders</h1>
                {
                    orders ? orders.map((order) => (
                        <div key={order._id} className="p-5 card w-92 bg-base-100 m-5 shadow-xl hover:scale-105 
                            duration-200 dark:bg-slate-900 dark:text-white dark:border"
                            style={{ width: "40rem" }}>
                            <div >
                                <div className='px-5' key={order._id}>
                                    <div className='flex'>
                                        <div>
                                            <h1><span className='font-bold'>Invoice Number : </span> {order._id}</h1>
                                            <p><span className='font-bold'>Shipping Address : </span> {order.address.street} {order.address.city}
                                                {order.address.state} {order.address.country} Zip- {order.address.zip}</p>
                                            <p>Order Date : {formatDate(order.createdAt)}</p>
                                        </div>
                                        <div className='flex'>
                                            <button onClick={() => viewReceipt(order._id)}><img className='w-10 h-10' src={PdfIcon} alt="pdficon" />View Invoice</button>
                                            <button onClick={() => downloadReceipt(order._id)}><img className='w-10 h-10' src={download} alt="pdficon" />Download </button>
                                        </div>
                                    </div>
                                    <div className="mt-5">
                                        <table className="table w-full  text-left">
                                            <thead>
                                                <tr>
                                                    <th className='px-4 py-2'>Name</th>
                                                    <th className='px-4 py-2'>Price</th>
                                                    <th className='px-4 py-2'>Quantity</th>
                                                    <th className='px-4 py-2'>Total Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    order.items.map((item) => (
                                                        <tr key={item.bookId._id}>

                                                            <th className='border px-4 py-2'>
                                                                <div className="flex items-center gap-3">
                                                                    <div className="avatar">
                                                                        <div className="mask mask-squircle h-12 w-12">
                                                                            <img
                                                                                src={item.bookId.image}
                                                                                alt="Avatar Tailwind CSS Component" />
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <div className="font-bold">{item.bookId.name}</div>
                                                                        <div className="text-sm opacity-50 font-thin">{item.bookId.title}</div>
                                                                    </div>
                                                                </div>
                                                            </th>
                                                            <td className='border px-4 py-2'>${item.price}</td>
                                                            <td className='border px-4 py-2'>{item.quantity}</td>
                                                            <td className='border px-4 py-2'>${item.quantity * item.price}</td>
                                                        </tr>
                                                    ))
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                    <h1 className='mt-5 text-lg flex justify-between'>
                                        <span className='font-bold '>Total Price </span>
                                        <span className='text-red-600 text-right'>${order.totalPrice}</span>
                                    </h1>

                                </div>

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
