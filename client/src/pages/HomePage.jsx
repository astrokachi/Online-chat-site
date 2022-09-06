import React, { useEffect, useState } from 'react';
import { useContext } from 'react';

import { Box } from '../component/Box';
import { Footer } from '../component/Footer';
import { Nav } from '../component/Nav';
import { AuthContext } from '../Auth';
import { Link, useParams } from 'react-router-dom';
// import { db, auth } from '../firebase';
// import { collection, query, where, onSnapshot } from 'firebase/firestore';
// import { useEffect } from 'react';

export const HomePage = () => {
  let { users } = useContext(AuthContext);
  const { isToggle, setIsToggle } = useContext(AuthContext);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(20);
  const { pref } = useParams();
  const [models, setModels] = useState([]);
  // const [page, setPage] = useState([]);

  // console.log(pref)
  useEffect(() => {
    let place = [...models];
    place = users.filter((model) => model?.email.includes('-model'));
    setModels(place);
  }, [users]);

  const paginate = (index) => {
    if (index >= 1) {
      setStart(20 * index);
      setEnd(20 + 20 * index);
    } else if (index < 1) {
      setStart(0);
      setEnd(20);
    }
  };

  return (
    <div className={`${!isToggle && 'overflow-y-hidden h-[100vh]'}`}>
      <Nav />
      <div className="flex w-full" onClick={() => setIsToggle(true)}>
        <div className="bg-gradient-to-b w-full pb-24 transition-all ease duration-150 min-h-screen text-white from-start text-center to-black sm:px-6 md:px-14 py-32">
          <p className="font-medium text-lg text-left pt-8 pb-2 px-3">
            {pref ? `${pref.toUpperCase()} MODELS` : 'MODELS'}
          </p>
          <div
            id="container"
            className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-5 gap-x-8 px-3  lg:gap-x-5 gap-y-8 "
          >
            {pref
              ? models.map((ouser, index) =>
                  index >= start && index < end && ouser?.about?.toLowerCase().includes(pref?.toLowerCase()) ? (
                    <Link to={`/${ouser.uid}/profile`}>
                      <Box key={ouser.uid} user={ouser} />
                    </Link>
                  ) : (
                    ''
                  )
                )
              : models.map((ouser, index) =>
                  index >= start && index < end ? (
                    <Link to={`/${ouser.uid}/profile`}>
                      <Box key={ouser.uid} user={ouser} />
                    </Link>
                  ) : (
                    ''
                  )
                )}
          </div>

          <div className="flex justify-center gap-3 w-full mt-12">
            {[...Array(Math.round(models.length / 20))].map((_, i) => {
              console.log(Math.round(models.length / 20) - Math.round(models.length / end));
              return (
                <div
                  key={i}
                  onClick={() => paginate(i)}
                  className={`px-3 h-1 text-sm bg-purp hover:bg-opacity-100 cursor-pointer rounded-lg transition-all ease-in duration-200 ${
                    Math.round(models.length / 20) - Math.round(models.length / end) === i
                      ? 'bg-opacity-100'
                      : 'bg-opacity-70'
                  }`}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
