import React, { useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box } from '../component/Box';
import { Footer } from '../component/Footer';
import { Nav } from '../component/Nav';
import { AuthContext } from '../context/auth';
// import { db, auth } from '../firebase';
// import { collection, query, where, onSnapshot } from 'firebase/firestore';
// import { useEffect } from 'react';

export const HomePage = () => {
  const { user, users } = useContext(AuthContext);

  // console.log(user);
  console.log(users);

  return (
    <>
      <div className="bg-gradient-to-b pb-24 transition-all ease duration-150 min-h-screen text-white from-start text-center to-black sm:px-6 md:px-14 py-4">
        <Nav />

        {/* <div id="" className="pt-4 w-max ml-3 mb-6 mt-4">
        <Link to='/chat'><button className='p-2 rounded bg-purp'>Chat</button></Link>
      </div> */}
        <p className="font-medium text-lg text-left pt-8 pb-2 px-3">Models</p>
        <div
          id="container"
          className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-5 gap-x-8 px-3  lg:gap-x-5 gap-y-8 "
        >
          {users.map((ouser) => {
            if (ouser.email.includes('-model')) return <Box key={ouser.uid} user={ouser} />;
            else return '';
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};
