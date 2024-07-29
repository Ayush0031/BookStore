import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
function Cart() {
  const [cart, setCart] = useState(null);
  const [cartIsEmpty, setCartIsEmpty] = useState("false");
  const [totalAmount, setTotalAmount] = useState(0);
  const user = JSON.parse(localStorage.getItem("Users"))

  const fetchCartItems = async () => {
    if (user) {
      await axios.get(`http://localhost:4001/cart/${user._id}`)
        .then(res => {
          console.log(res.data.items)
          setCartIsEmpty(false)
          setCart(res.data)
         
        })
        .catch(err => {
          console.log(err.response.data.message)
          if (err.response.data.message === "Cart Not Found") {
            setCartIsEmpty(true)
          }
          console.error(err + cartIsEmpty)
        })
    }

  }
  useEffect(() => {
    fetchCartItems();
    if(cart != null){
      let total = 0;
      cart.items.forEach(item => {
        total += item.bookId.price * item.quantity
      })
      setTotalAmount(total);
    }

  }, [cart])
  if (cart === null && cartIsEmpty === false) {
    return <div>Loading...</div>;
  }
  
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <div className=' pt-24  container mx-auto md:px-2 px-4'>
          
            <h1 className='text-pink-500 text-2xl md:inline-flex' >Shopping Cart</h1>
            
            <h1>{totalAmount}</h1>
            <Link className='bg-pink-500 rounded-full px-2 mt-1 md:mx-40
           text-white hover:bg-red-600' to='/payment'>Checkout</Link>
          

          {
            cartIsEmpty ? <p>"No item in cart"</p>
              : cart.items.map((item) => (
                <div 
                key={item.bookId._id} style={{ maxWidth: '35rem' }}
                className="card m-4 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border "
              >
                <img src={item.bookId.image} className="w-24 h-24" alt={item.bookId.name} />
                <p>{item.bookId.name} - {item.bookId.price*item.quantity}</p>
              </div>
              ))}
        </div>

      </div>
    </>
  )
}

export default Cart
