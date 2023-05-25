import React, {useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { web } from '../context_api/WebScrap'
import axios from 'axios'

function Header() {
   const {user,changeUserLog} = useContext(web)

   const logout = async() =>{
      try {
        const res = await axios.post("https://webscrap-zunj.onrender.com/api/logout",{},{withCredentials:true})
        if(res.data.massage === "logout successfull"){
          localStorage.setItem("user",null)
          changeUserLog()
        }
      } catch (error) {
        alert(error)
      }
   }

   
   useEffect(()=>{
    changeUserLog()
   },[])

  return (
    <div className=' container m-auto p-5 py-2 flex items-center justify-between gap-5 w-1/2'>
         <Link to={'/'}>
      <button className='p-1 px-2 bg-gray-500 text-white rounded-sm font-medium'>
        Home
      </button>
      </Link>
      {user?
      <span>
        <i className="uil uil-user-circle mr-2 font-medium"></i>
        <span className='font-medium mr-3'>{user.UserName}</span>
        <button className=' py-1 px-2 bg-gray-500 text-white rounded-sm font-medium text-center' onClick={logout}>logout</button>
      </span>
      :
      <span>
        <Link to={'/signin'}>
      <button className='p-1 px-2 bg-gray-500 text-white mr-5 rounded-sm font-medium'>
        Sign In
      </button>
      </Link>
      <Link to={'/signup'}>
      <button className='p-1 px-2 bg-gray-500 text-white rounded-sm font-medium'>
        Sign Up
      </button>
      </Link>
      </span>
     }
    </div>
  )
}

export default Header