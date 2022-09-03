import React, { useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Auth';
import { db, auth } from '../Firebase.js';
import { addDoc, collection, query, where, onSnapshot, Timestamp, orderBy } from 'firebase/firestore';

export const Box = (user) => {
  const [state, setState] = useState(false);

  // console.log(user.user)

  return (
    <div
      className=" w-[100%] h-[200px] md:h-64 lg:h-[250px]  rounded-[10px] hover:scale-105  md:mx-auto relative bg-gray-400  transition-all duration-[400ms] ease"
      onMouseEnter={() => setState(true)}
      onMouseLeave={() => {
        setState(false);
      }}
    >
      {user.user.avatar && <img src={user.user.avatar} alt="" className="w-[100%] h-full absolute rounded-sm  " />}

      <Link to={`/chat/${user.user.uid}`} onClick={() => {}}>
        <button className="absolute bottom-2 px-3 py-1 z-10 text-sm bg-purp right-4">Chat</button>
      </Link>
      <Link to={`/book/${user.user.uid}`}>
        <button className="absolute bottom-2 px-3 py-1 text-sm z-10 bg-purp  left-4">Book</button>
      </Link>
      <div
        className={`box absolute md:-z-50 left-[50%] bottom-0  pb-12 pt-2 bg-slate-800 bg-opacity-70 w-full translate-x-[-50%]  ${
          state ? 'md:z-0 ' : ''
        }   transition-all duration-100 ease-in-out`}
      >
        <p className=" w-full text-sm">{user.user.name}</p>
        {/* <p className=''>{user.user?.about?.split('...')[0] || user.user.about}</p> */}
      </div>
    </div>
  );
};
