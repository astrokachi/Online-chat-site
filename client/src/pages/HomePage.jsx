import React, { useEffect, useState } from 'react';
import { useContext } from 'react';

import { Box } from '../component/Box';
import { Footer } from '../component/Footer';
import { Nav } from '../component/Nav';
import { AuthContext } from '../Auth';
import { Link, useParams } from 'react-router-dom';
import Chatra from '@chatra/chatra';

let config = {
  integration: {
    name: 'RS bot',
    email: 'astrokachi@gmail.com',
  },
  ID: 'yXhm9kiPWX5GoZwLP',
};

Chatra('init', config);
// Chatra('pageView')

Chatra('setZIndex', 1);

export const HomePage = () => {
  let { users } = useContext(AuthContext);
  const { isToggle, setIsToggle } = useContext(AuthContext);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(20);
  let { pref } = useParams();
  const [models, setModels] = useState([]);
  const [page, setPage] = useState(0);
  const [i, setI] = useState(0);
  pref = pref?.toLowerCase();

  useEffect(() => {
    Chatra('show');
  }, []);

  useEffect(() => {
    let place = [...models];
    place = users.filter((model) => model?.email?.includes('-model'));
    setModels(place);
  }, [users]);

  const paginate = (index) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    if (index >= 1) {
      setStart(20 * index);
      setEnd(20 + 20 * index);
    } else if (index < 1) {
      setStart(0);
      setEnd(20);
    }
  };

  console.log(models.length);

  return (
    <div className={`${!isToggle && 'overflow-y-hidden h-[100vh]'}`}>
      <Nav />
      <div className="flex w-full" onClick={() => setIsToggle(true)}>
        <div className="bg-gradient-to-b w-full pb-24 transition-all ease duration-150 min-h-screen text-white from-start text-center to-black sm:px-6 md:px-14 py-32">
          <p className="font-medium text-lg text-left pt-8 pb-2 px-3">
            {pref ? `${pref.toUpperCase()}` : 'ALL MODELS'}
          </p>
          <div
            id="container"
            className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-5 gap-x-8 px-3  lg:gap-x-5 gap-y-8 "
          >
            {pref
              ? models.map((ouser, index) =>
                  // index >= start &&
                  // index < end &&
                  ouser?.about
                    ?.toLowerCase()
                    .includes(
                      pref.includes('big') ? (pref.includes('tits') ? 'big tits' : 'big ass') : pref?.split(' ')[0]
                    ) ? (
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
            <button
              className="bg-purp rounded  px-2 mr-8"
              onClick={() => {
                i > 0 && setI(i - 1);
                i > 0 && paginate(i - 1);
              }}
            >
              Prev
            </button>

            {!pref &&
              [...Array(Math.round(60 / 20))].map((_, i) =>
                true ? (
                  <div
                    onLoad={() => setI(i)}
                    key={i}
                    onClick={() => paginate(i)}
                    className={`px-3 py-1 text-sm bg-white text-black hover:bg-opacity-100 cursor-pointer rounded-lg transition-all ease-in duration-200 ${
                      Math.round(Math.round(60 / 20) - Math.round(60 / end)) === i ? 'bg-opacity-100' : 'bg-opacity-70'
                    }`}
                  >
                    {' '}
                    {i + 1}
                  </div>
                ) : (
                  <div>...</div>
                )
              )}

            <button
              className="bg-purp rounded  px-2 ml-8"
              onClick={() => {
                i < 2 && setI(i + 1);
                i < 2 && paginate(i + 1);
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
