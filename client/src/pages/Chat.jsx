import React, { useState } from 'react';

import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MessageForm } from '../component/MessageForm';
import { AuthContext } from '../Auth';

import Message from '../component/Message';
import back from '../assets/back.svg'

export const Chat = () => {
  const { id } = useParams();
  const { users } = useContext(AuthContext);
  const [msgs, setMsgs] = useState([]);
  const [number] = useState(8);
  const [image, setImage] = useState(false);
  const [imgNo, setImgNo] = useState(0);
  const otherUser = users.filter((user) => user.uid === id);

  const about = otherUser[0]?.about?.split('...')[0];
  const body = otherUser[0]?.about?.split('...')[1];
  const interest = otherUser[0]?.about?.split('...')[2];
  const zodiac = otherUser[0]?.about?.split('...')[3];
  const hair = otherUser[0]?.about?.split('...')[4];
  const eye = otherUser[0]?.about?.split('...')[5];
  const height = otherUser[0]?.about?.split('...')[6];
  const age = otherUser[0]?.about?.split('...')[7];
  const inte = otherUser[0]?.about?.split('...')[8];
  const rules = otherUser[0]?.about?.split('...')[9];


  return (
    
    <div className="grid md:grid-cols-5 h-screen overflow-hidden relative bg-gradient-to-b from-start  to-black">
      <div
        className="flex-col items-center pt-14 overflow-y-scroll hidden md:flex border-r border-r-gray-400 bg-purp bg-opacity-20 text-white"
        style={{ gridColumn: 'span 2' }}
      >
        <div className="h-24 w-24 min-h-max rounded-[50%] bg-gray-400 " style={{height: "96px;!important" , width:"96px"}}>
          {otherUser[0]?.avatar && <img src={otherUser[0].avatar} alt="" className="h-24 w-24 rounded-[50%]" />}
        </div>
        
        <h3 className="text-white text-base font-bold">{otherUser[0]?.name}</h3>
        <button className="px-5 py-2 bg-purp rounded mt-3 text-white transition-all ease duration-200 hover:scale-95">
          Book {otherUser[0]?.name}
        </button>

        {/* <div className="w-[100%] mt-6 border-b border-b-gray-200 " /> */}
        <div className="card w-[90%] bg-purp bg-opacity-40 mt-4 rounded-md p-8">
          <h1 className="pb-4  text-center">About Me</h1>
          {/* <h3 className='text-xs text-gray-600'>{otherUser[0]?.isOnline ? 'Online' : 'Offline'}</h3> */}
          <h3 className=" px-3 text-center text-sm pb-7">{about || otherUser[0]?.about}</h3>
        </div>
        {/* <div className="w-[100%] mt-2 mb-9 border-b border-b-gray-200 " /> */}
        <div className="card w-[90%] bg-purp bg-opacity-40 mt-4 rounded-md p-8 mb-4">
          <h3 className="px-3 text-center text-sm pb-2">{body}</h3>
          <h3 className=" px-3 text-center text-sm pb-2">{interest}</h3>
          <h3 className=" px-3 text-center text-sm pb-2">{zodiac}</h3>
          <h3 className="px-3 text-center text-sm pb-2">{hair}</h3>
          <h3 className="px-3 text-center text-sm pb-2">{eye}</h3>
          <h3 className="px-3 text-center text-sm pb-2">{age}</h3>
          <h3 className="px-3 text-center text-sm pb-2">{height}</h3>
          <h3 className="px-3 text-center text-sm pb-2">{inte}</h3>
          <h3 className="px-3 text-center text-sm pb-2">{rules && rules}</h3>
          {/* <div className="w-[100%] mt-2 border border-b-gray-200 " /> */}
        </div>

        <div className="rounded-md bg-purp  w-[90%] bg-opacity-40 p-4 mb-8">
          <header className="text-center text-sm pb-5">Pictures</header>
          <section className="image flex flex-wrap gap-2 justify-center">
            {[...Array(number)].map((_, index) => {
              return (
                <div
                  onMouseEnter={() => setImgNo(index)}
                  onClick={() => setImage(true)}
                  key={index}
                  className={`${
                    otherUser[0] && !otherUser[0][`images${index}`]?.includes('undefined')
                      ? 'md:w-[35%] w-[100%] lg:w-[48%] h-max'
                      : 'hidden'
                  }  rounded bg-gray-400 relative cursor-zoom-in`}
                >
                  {otherUser[0] && !otherUser[0][`images${index}`]?.includes('undefined') && (
                    <img src={otherUser[0][`images${index}`]} alt="" className="h-full w-full rounded" />
                  )}
                </div>
              );
            })}
          </section>
        </div>
      </div>
      {image && (
        <div className={`absolute flex justify-center items-center w-[100vw] h-[100vh] z-50 cursor-zoom-out bg-slate-800 bg-opacity-70`} onClick={() => setImage(false)}>
          <img src={otherUser[0][`images${imgNo}`]} alt="s" className="w-max h-[95%] rounded-md"  />
        </div>
      )}
      <div
        className=" text-white overflow-y-scroll text-center bg-gradient-to-b from-start  to-black"
        style={{ gridColumn: 'span 3' }}
      >
        <header className="bg-purp bg-opacity-30 p-4 flex gap-4 fixed w-[97%] md:w-[59%] items-center">
          <Link to='/chats'><img src={back} alt="" className='h-6 w-6 cursor-pointer' /></Link>
          <div className="h-16 w-16 rounded-[50%] bg-gray-400">
            {otherUser[0]?.avatar && <img src={otherUser[0].avatar} alt="" className="h-16 w-16 rounded-[50%]" />}
          </div>
          <div className="text-white text-left ">
            <h3 className="flex items-center gap-2">
              {otherUser[0]?.name}{' '}
              <div className={`h-2 w-2 rounded-[50%] ${otherUser[0]?.isOnline ? 'bg-green-400' : 'bg-red-500'}`}></div>
            </h3>
            {/* <h2>{otherUser[0]?.email}</h2> */}
          </div>
        </header>

        <div className="pt-32 px-3 pb-24">
          {msgs.length ? (
            msgs.map((msg, i) => {
              return <Message key={i} msg={msg} otherUser={otherUser} />;
            })
          ) : (
            <h3>This is a new conversation, send a message to start chatting 😉</h3>
          )}
        </div>

        <main className="">
          <MessageForm otherUser={otherUser[0]} setMsgs={setMsgs} />
        </main>
      </div>
    </div>
  );
};
