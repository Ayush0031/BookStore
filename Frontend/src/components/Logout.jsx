import React from 'react'
import { useAuth } from '../context/AuthProvider'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
function Logout() {
  const[authUser,setAuthUser]=useAuth();
  const navigate=useNavigate();
  const handleLogout=()=>{
    try {
      setAuthUser({
        ...authUser,
        user:null
      })
      localStorage.removeItem("Users")
      toast.success("Logged Out Successfully")
      setTimeout(()=>{
        window.location.reload()
      },1000)
      
    } catch (error) {
      toast.error("Error"+error.message)
      setTimeout(()=>{},1000)
    }
    setAuthUser(undefined);
    navigate('/');
  }

  return (
    <div>
      <button onClick={handleLogout} className='px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer'>Logout</button>
    </div>
  )
}

export default Logout
