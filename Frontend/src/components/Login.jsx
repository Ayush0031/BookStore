import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
    
      const onSubmit = (data) => console.log(data)
    return (
        <div>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}

            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form  onSubmit={handleSubmit(onSubmit)} >
                        {/* if there is a button in form, it will close the modal */}
                        <Link to='/' onClick={() => document.getElementById('my_modal_3').close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
                   
                    <h3 className="font-bold text-lg">Login</h3>
                    <div className='space-y-2 mt-4'>
                        <span>Email</span>
                        <br />
                        <input {...register("email", { required: true })} className='w-80 px-3 py-1 border rounded-md outline-none' type='email' placeholder='Enter Your Email'
                            ></input>
                            <br/>
                             {errors.email && <span className='text-sm text-red-500'>This field is required</span>}
                    </div>
                    <div className='space-y-2 mt-4'>
                        <span>Password</span><br />
                        <input {...register("password", { required: true })} className='w-80 px-3 py-1 border rounded-md outline-none' type='password' placeholder='Enter Your Password'
                            ></input><br/>
                             {errors.password && <span className='text-sm text-red-500'>This field is required</span>}
                    </div>
                    <div className='flex justify-around mt-4'>
                        <button className='bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200'>login</button>
                        <p>
                            Not registered?
                            <Link to='/signup' className='underline cursor-pointer text-blue-500' >SignUp</Link>
                            </p>
                    </div>
                    </form>
                </div>
            </dialog>
        </div>
    )
}

export default Login
