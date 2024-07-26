import React from 'react'
import BuyModal from './BuyModal'
import { Link} from 'react-router-dom';
function Card(props) {
    console.log("price______"+props.item.price)
    return (
        <>
            <div className='mt-4 my-3 p-3'>
                <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
                    <figure><img src={props.item.image} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            {props.item.name}
                            <div className="badge badge-secondary">{props.item.category}</div>
                        </h2>
                        <p>{props.item.title}</p>
                        <div className="card-actions  justify-between">
                            <div className="">{props.item.price}</div>
                            <Link className="cursor-pointer px-2 py-1 rounded-full 
                            border-[2px] hover:bg-pink-500 hover:text-white duration-200" onClick={() => 
                             { document.getElementById("my_modal_buy").showModal() }}>Buy Now</Link>
                            <BuyModal />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card
