import React from 'react'
import BuyModal from './BuyModal'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import toast from 'react-hot-toast';

function Card(props) {
    const[authUser,setAuthUser]=useAuth();
    const user=JSON.parse(localStorage.getItem("Users"))
    
    const userId= authUser ? user._id :"null";
    const handleAddToCart = async () => {
        const quantity=1
        await axios.post("http://localhost:4001/cart/create",{
            userId,
            bookId:props.item._id,
            quantity

        }).then(response=>{
            
            toast.success('"Book Added to Cart Successfully!!'+user.name);
        }).catch(err=>{
            toast.error("Error : " + err.response.data.message+user);
            console.error(err)
        })
    }
    return (
        <>
            <div className='mt-4 my-3 p-3'>
                <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
                    <figure><img src={props.item.image}  alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            {props.item.name} 
                            <div className="badge badge-secondary">{props.item.category}</div>
                        </h2>
                        <p>{props.item.title}</p>
                        <div className="card-actions  justify-between">
                            <div className="">{props.item.price}</div>
                            {
                                authUser ? <button onClick={()=>handleAddToCart()} className="cursor-pointer px-2 py-1 rounded-full 
                                border-[2px] bg-pink-500 text-white hover:bg-green-500 hover:text-white duration-200">
                                    Add To cart</button>:""
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card
