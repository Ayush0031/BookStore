import axios from 'axios';
import React, { Children, useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
export const CartContext=createContext();
function CartProvider({children}) {
    const [cartCount,setCartCount]=useState(0);
    const user = JSON.parse(localStorage.getItem("Users"))
    useEffect(()=>{
        const fetchCart = async () => {
            if (user) {
              await axios.get(`http://localhost:4001/cart/${user._id}`)
                .then(res => {
                setCartCount(res.data.items.length)
                })
                .catch(err => {
                  console.log(err.response.data.message)
                })
            }
        }
        fetchCart()
        
    },[user])
  return (
    <CartContext.Provider value={{cartCount,setCartCount}}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
export const useCartContext=()=>useContext(CartContext);
