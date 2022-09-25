import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import alexia from '../assets/moddd/Alexia.png';

export const Box = (user) => {
  const [state, setState] = useState(false);

  return (
    <div
      className=" w-[100%] h-[200px] md:h-64 lg:h-[250px] cursor-pointer rounded-[10px] hover:scale-105 shadow-lg md:mx-auto relative bg-gray-400  transition-all duration-[400ms] ease"
      onMouseEnter={() => setState(true)}
      onMouseLeave={() => {
        setState(false);
      }}
    >
      {user.user.avatar && <img src={require(`../assets/moddd/${user.user.email.split('@')[0].toLowerCase()}.png`)} alt="" className="w-[100%] h-full absolute rounded-sm  " />}

      <Link to={`/chat/${user.user.uid}`} onClick={() => {}}>
        <button className="absolute bottom-2 px-3 py-1 z-[1] text-sm bg-purp right-4 shadow-lg">Chat</button>
      </Link>
      <Link to={`/book/${user.user.name}`}>
        <button className="absolute bottom-2 px-3 py-1 text-sm z-[1] bg-purp  left-4 shadow-lg">Book</button>
      </Link>
      <div
        className={`box absolute md:-z-50 left-[50%] bottom-0  pb-12 pt-2 bg-slate-800 bg-opacity-70 w-full translate-x-[-50%]  ${
          state ? 'md:z-0 ' : ''
        }   transition-all duration-100 ease-in-out`}
      >
        <p className=" w-full text-sm">{user.user.name}</p>
      </div>
    </div>
  );
};
