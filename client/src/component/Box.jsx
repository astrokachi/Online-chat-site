import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/moddd/Alexia.png'
import listReactFiles from 'list-react-files'



export const Box = (user) => {
  const [state, setState] = useState(false);
  // listReactFiles(__dirname).then(files => console.log(files))

//   find(function(result) {
//     console.log(result);
// }, {
//     dir: 'assets',
//     name: 'png'
// });

  // console.log(user.user.avatar)

  return (
    <div
      className=" w-[100%] h-[200px] md:h-64 lg:h-[250px] cursor-pointer rounded-[10px] hover:scale-105  md:mx-auto relative bg-gray-400  transition-all duration-[400ms] ease"
      onMouseEnter={() => setState(true)}
      onMouseLeave={() => {
        setState(false);
      }}
    >
      {/* {user.user.avatar && <img src={require(`../assets/moddd/${user.user.name }.png`)} alt="" className="w-[100%] h-full absolute rounded-sm  " />} */}

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
