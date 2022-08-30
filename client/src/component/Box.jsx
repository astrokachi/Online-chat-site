import React, { useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import { db, auth } from '../firebase.js';
import { addDoc, collection, query, where, onSnapshot, Timestamp, orderBy } from 'firebase/firestore';

export const Box = (user) => {
  const [state, setState] = useState(false);

  // console.log(user.user)

  return (
    <div
      className=" w-[100%] h-40 md:h-64 lg:h-72 rounded-[10px] hover:scale-105  md:mx-auto relative bg-gray-400  transition-all duration-[400ms] ease"
      onMouseEnter={() => setState(true)}
      onMouseLeave={() => {
        setState(false);
      }}
    >
      {user.user.avatar && <img src={user.user.avatar} alt="" className="w-[100%] h-full absolute rounded-[10px] " />}

      <Link to={`/chat/${user.user.uid}`} onClick={() => {}}>
        <button className="absolute bottom-2 px-3 py-1 z-10 text-sm bg-purp rounded-lg right-4">Chat</button>
      </Link>
      <button className="absolute bottom-2 px-3 py-1 text-sm z-10 bg-purp rounded-lg left-4">Book</button>
      <div className={`box absolute -z-50 left-[50%] bottom-0 bg-slate-600 bg-opacity-70 w-full translate-x-[-50%]  ${state && 'z-0 '}   transition-all duration-200 ease-in-out`}>
        <p className=" w-full">{user.user.name}</p>
        <p className=''>{user.user?.about?.split('...')[0] || user.user.about}</p>
      </div>
    </div>
  );
};
