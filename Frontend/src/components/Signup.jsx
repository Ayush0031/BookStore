import React from 'react'
import { Link } from 'react-router-dom'
import Login from './Login'
import { useForm } from "react-hook-form"
import axios from 'axios'
function Signup() {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
    
      const onSubmit = async (data) => {
        const user={
            name:data.name,
            email:data.email,
            password:data.password,
        }
       await axios.post("http://localhost:4001/user/signup",user)
        .then((res)=>{
            console.log(res.data);
            if(res.data){
                alert("Signup successfull")
            }
           
        }).catch((err)=>{
            console.log(err)
            alert("error",err)
        })
      }
  return (
    <>
      <div className='flex h-screen  items-center justify-center '>
      <div className="w-[600px]">
                <div className="modal-box dark:bg-slate-900  dark:text-white">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* if there is a button in form, it will close the modal */}
                        <Link to='/' className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
                    
                    <h3 className="font-bold text-lg">SignUp</h3>
                    <div className='space-y-2 mt-4'>
                        <span>Name</span>
                        <br />
                        <input {...register("name", { required: true })} className='w-80 px-3 py-1 border rounded-md outline-none' type='text' placeholder='Enter Your Full Name'
                            ></input><br/>
                            {errors.name && <span className='text-sm text-red-500'>This field is required</span>}
                    </div>
                    <div className='space-y-2 mt-4'>
                        <span>Email</span>
                        <br />
                        <input {...register("email", { required: true })} className='w-80 px-3 py-1 border rounded-md outline-none' type='email' placeholder='Enter Your Email'
                            ></input><br/>
                            {errors.email && <span className='text-sm text-red-500'>This field is required</span>}
                    </div>
                    
                    <div className='space-y-2 mt-4'>
                        <span>Password</span><br />
                        <input {...register("password", { required: true })} className='w-80 px-3 py-1 border rounded-md outline-none' type='password' placeholder='Enter Your Password'
                            ></input><br/> {errors.password && <span className='text-sm text-red-500'>This field is required</span>}
                    </div>
                    <div className='flex justify-around mt-4'>
                        <button className='bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200'>SignUp</button>
                        <p className='text-xl'>
                            Have Account?
                            <button onClick={()=>{document.getElementById("my_modal_3").showModal()}} 
                            className='underline cursor-pointer text-blue-500' >Login</button>
                            <Login/>
                            </p>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default Signup
