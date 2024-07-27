import React from 'react'
import { Link } from 'react-router-dom'

function BuyModal(props) {
    return (
        <dialog id="my_modal_buy" className="modal ">
            <div className="modal-box dark:bg-slate-900  dark:text-white" tabindex="-1" >
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <Link  onClick={() => document.getElementById('my_modal_buy').close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
                        <div className="p-4 md:p-5 text-center">
                            <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to add this product to cart?</h3>
                        </div>
                        <div>
                          

                        </div>
                        <div>
                        {props.bookId}
                        </div>
                    </div>
                </div>
            </div>

        </dialog>
    )
}

export default BuyModal
