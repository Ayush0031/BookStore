import React from 'react'
import Home from './Home/Home'
import {Routes,Route} from 'react-router-dom'
import Courses from './Courses/Courses'

const App = () => {
  return (
    <>
    <div className="dark:bg-slate-900  dark:text-white">
      <Routes>
      <Route exact path='/' element={<Home/>}></Route>
        <Route exact path='/course' element={<Courses/>}></Route>
      </Routes>
      </div>
    </>
  )
}

export default App
