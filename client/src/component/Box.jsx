import React, { useState } from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth'
import { db, auth } from '../firebase.js';
import { addDoc, collection, query, where, onSnapshot, Timestamp, orderBy } from 'firebase/firestore';


export const Box = (user) => {

  // console.log(user.user)


  return (
    <div className=' w-[100%] h-40 md:h-64 lg:h-72 rounded-[10px]  md:mx-auto relative bg-gray-400'>
        <Link to={`/chat/${user.user.uid}`} onClick={() => {}} ><button className='absolute bottom-2 px-3 py-1 text-sm bg-purp rounded-lg right-4'>Chat</button></Link>  
        <button className='absolute bottom-2 px-3 py-1 text-sm bg-purp rounded-lg left-4'>Book</button>
    </div>
  )
}
