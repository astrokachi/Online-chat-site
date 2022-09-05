import React, { useEffect, useState } from 'react';
import { useContext } from 'react';

import { Box } from '../component/Box';
import { Footer } from '../component/Footer';
import { Nav } from '../component/Nav';
import { AuthContext } from '../Auth';
import { Link } from 'react-router-dom';
// import { db, auth } from '../firebase';
// import { collection, query, where, onSnapshot } from 'firebase/firestore';
// import { useEffect } from 'react';

export const HomePage = () => {
  let { users } = useContext(AuthContext);
  const [page, setPage] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(50);

  return (
    <>
      <Nav />
      <div className="flex w-full">
        <div className="bg-gradient-to-b w-full pb-24 transition-all ease duration-150 min-h-screen text-white from-start text-center to-black sm:px-6 md:px-14 py-32">
          <p className="font-medium text-lg text-left pt-8 pb-2 px-3">Models</p>
          <div
            id="container"
            className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-5 gap-x-8 px-3  lg:gap-x-5 gap-y-8 "
          >
            {users.map((ouser, index) =>
              index > start && index < end && ouser.email.includes('-model') ? (
                <Link to={`/${ouser.uid}/profile`}>
                  <Box key={ouser.uid} user={ouser} />
                </Link>
              ) : (
                ''
              )
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
