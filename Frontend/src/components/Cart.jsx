import React, { useEffect, useState } from 'react'
import axios from 'axios';
function Cart({userId}) {
  const[cart,setCart]=useState(null);

  useEffect(()=>{
    fetchCartItems();
   
  },[])
  const fetchCartItems=async()=>{
    await axios.get(`http://localHost:4001/cart/${userId}`)
    .then(res=>{
      setCart(res.data)
    })
    .catch(err=>{
      console.error(err)
    })
  }
  return (
    <div>
      {
       cart.items.length ? cart.items.map((item)=>{
          <div key={item.bookId._id}>
              <p>{item.bookId.title} - {item.bookId.price}*{item.quantity} </p>
          </div>
        })
        :"No item in cart"}
    </div>
  )
}

export default Cart
