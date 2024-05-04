import React from 'react'
import Home from './Home/Home'
import {Routes,Route, Navigate} from 'react-router-dom'
import Courses from './Courses/Courses.jsx'
import Signup from './components/Signup'
import Contact from './components/Contact'
import  { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthProvider'

const App = () => {
  const[authUser,setAuthUser]=useAuth();

  return (
    <>
    <div className="dark:bg-slate-900  dark:text-white">
      <Routes>
      <Route exact path='/' element={<Home/>}></Route>

        <Route exact path='/course'
         element={authUser? <Courses/> : <Navigate to='/signup'/>} />
         
        <Route exact path='/signup' element={<Signup/>}></Route>
        <Route exact path='/contact' element={<Contact/>}></Route>
      </Routes>
      <Toaster />
      </div>
    </>
  )
}

export default App
