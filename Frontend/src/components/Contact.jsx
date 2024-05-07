import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';
function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    const contactData={
      name:data.name,
      email:data.email,
      message:data.message
    }
    await axios.post("http://localhost:4001/contact/",contactData)
    .then((res)=>{
      if(res.data){
        toast.success("Message sent Successfully")
      }
      toast.failure("Not able to send message")
    }).catch((err)=>{
      toast.error("Error"+err.message)
    })
  }
  return (
    <>
      <Navbar/>
      <div className='flex h-screen  items-center justify-center'>
      <form onSubmit={handleSubmit(onSubmit)}>
                    
                    <h3 className="font-bold text-lg">Contact Us</h3>
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
                        <span>Message</span><br />
                        
                        <textarea {...register("message", { required: true })} className='dark:text-black w-80 px-3 py-1 border rounded-md outline-none' type='text-area' placeholder='Enter Your Message'
                            ></textarea><br/> {errors.message&& <span className='text-sm text-red-500'>This field is required</span>}
                    </div>
                    <div className='flex justify-around mt-4'>
                        <button className='bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200'>Submit</button>
                        
                    </div>
                    </form>
      </div>
      <Footer/>
    </>
  )
}

export default Contact
