import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { useCartContext } from '../context/CartProvider';
function Cart() {
  const [cart, setCart] = useState(null);
  const [cartIsEmpty, setCartIsEmpty] = useState("false");
  const [totalAmount, setTotalAmount] = useState(0);
  const user = JSON.parse(localStorage.getItem("Users"))
  const {setCartCount}=useCartContext();
  const fetchCartItems = async () => {
    if (user) {
      await axios.get(`http://localhost:4001/cart/${user._id}`)
        .then(res => {
          setCartCount(res.data.items.length);
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
    if (cart != null) {
      let total = 0;
      cart.items.forEach(item => {
        total += item.bookId.price * item.quantity
      })
      setTotalAmount(total);
    }

  }, [cartIsEmpty])
  if (cart === null && cartIsEmpty === false) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />

      <div>
        <div className='  pt-24  container mx-auto md:px-2 px-4'>

          <h1 className='text-pink-500 md:text-center text-2xl md:text-5xl ' >Shopping Cart</h1>

          <h1 className=' mt-2 text-green-500 md:text-2xl md:inline-flex' >Total Cart Value ${totalAmount}</h1>
          <Link className=' bg-pink-500 rounded-full px-2 mt-1 md:mx-40
           text-white hover:bg-red-600' to='/payment'>Checkout</Link>


          {
            cartIsEmpty ? <p>"No item in cart"</p>
              : cart.items.map((item) => (
                <div
                  key={item.bookId._id} style={{ maxWidth: '35rem' }}
                  className=" card m-4 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border "
                >
                  <div className='flex'>
                    <div className="w-40 h-40">
                      <img src={item.bookId.image} className="w-full h-full object-cover p-2 rounded-md" alt={item.bookId.name} />
                    </div>
                    <div className='p-2 md:text-lg'>
                    <p>{item.bookId.name}</p>
                    <p>{item.bookId.title}</p>
                    <p>${item.bookId.price}</p>
                    </div>
                    
                  </div>


                </div>
              ))}
        </div>

      </div>
      <div className='flex flex-col h-screen justify-end'>
        <Footer />
      </div>

    </>
  )
}

export default Cart
