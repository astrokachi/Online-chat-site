import React, { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { MessageForm } from '../component/MessageForm';
import { AuthContext } from '../context/auth';
import { db, auth } from '../firebase.js';
import { addDoc, collection, query, where, onSnapshot, Timestamp, orderBy } from 'firebase/firestore';
import Message from '../component/Message';

export const Chat = () => {
  const { id } = useParams();
  const { users } = useContext(AuthContext);
  const [msgs, setMsgs] = useState([]);

  const otherUser = users.filter((user) => user.uid === id);

  const about = otherUser[0]?.about.split('...')[0];
  const body =  otherUser[0]?.about.split('...')[1]
  const interest =  otherUser[0]?.about.split('...')[2]
  const zodiac =  otherUser[0]?.about.split('...')[3]
  const hair =  otherUser[0]?.about.split('...')[4]
  const eye =  otherUser[0]?.about.split('...')[5]
  const height =  otherUser[0]?.about.split('...')[6]
  const age =  otherUser[0]?.about.split('...')[7]
  const rules =  otherUser[0]?.about.split('...')[8]

  return (
    <div className="grid md:grid-cols-5 h-screen overflow-hidden relative">
      <div
        className="flex-col items-center pt-24 overflow-y-scroll hidden md:flex border-r border-r-gray-400"
        style={{ gridColumn: 'span 2' }}
      >
        <div className="h-24 w-24 rounded-[50%] bg-gray-400">
          {otherUser[0]?.avatar && <img src={otherUser[0].avatar} alt="" className="h-24 w-24 rounded-[50%]" />}
        </div>
        <h3 className="text-gray-600 text-base font-bold">{otherUser[0]?.name}</h3>
        <button className="px-5 py-2 bg-purp rounded mt-3 text-white">Book {otherUser[0]?.name}</button>

        <div className="w-[100%] mt-6 border border-b-gray-200 " />
        <h1>About Me</h1>
        {/* <h3 className='text-xs text-gray-600'>{otherUser[0]?.isOnline ? 'Online' : 'Offline'}</h3> */}
        <h3 className=" px-3 text-center">{about || otherUser[0]?.about}</h3>
        <div className="w-[100%] mt-2 border border-b-gray-200 " />
        <h3 className='px-3 text-center'>{body}</h3>
        <h3 className=' px-3 text-center'>{interest}</h3>
        <h3 className=' px-3 text-center'>{zodiac}</h3>
        <h3 className='px-3 text-center'>{hair}</h3>
        <h3 className='px-3 text-center'>{eye}</h3>
        <h3 className='px-3 text-center'>{age}</h3>
        <h3 className='px-3 text-center'>{height}</h3>
        <h3 className='px-3 text-center'>{rules}</h3>
        <div className="w-[100%] mt-2 border border-b-gray-200 " />


      </div>

      <div
        className="bg-gradient-to-b text-white overflow-y-scroll  from-start text-center to-black"
        style={{ gridColumn: 'span 3' }}
      >
        <header className="bg-white p-4 flex gap-4 fixed w-full md:w-[60%]">
          <div className="h-16 w-16 rounded-[50%] bg-gray-400">
            {otherUser[0]?.avatar && <img src={otherUser[0].avatar} alt="" className="h-16 w-16 rounded-[50%]" />}
          </div>
          <div className="text-gray-900 text-left ">
            
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
