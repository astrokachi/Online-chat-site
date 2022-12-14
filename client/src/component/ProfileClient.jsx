import React, { useContext } from 'react';

import { useState } from 'react';
import photo from '../assets/photo.svg';
import { Nav } from './Nav';
import { Footer } from './Footer';
import { AuthContext } from '../Auth';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';

export const ProfileClient = () => {
  const [number] = useState(8);
  const [grow, setGrow] = useState(false);
  const [imgNo, setImgNo] = useState();
  const { isToggle, setIsToggle } = useContext(AuthContext);

  const { users } = useContext(AuthContext);
  const { id } = useParams();

  const user = users.filter((ouser) => ouser.uid === id)[0];

  const body = user?.about?.split('...')[1];
  const interest = user?.about?.split('...')[2];
  const zodiac = user?.about?.split('...')[3];
  const hair = user?.about?.split('...')[4];
  const eye = user?.about?.split('...')[5];
  const height = user?.about?.split('...')[6];
  const age = user?.about?.split('...')[7];
  const inte = user?.about?.split('...')[8];
  const rules = user?.about?.split('...')[9];

  const arr = [body, interest, zodiac, hair, eye, height, age, inte, rules];

  return (
    <div
      className={`overflow-x-hidden ${!isToggle && 'overflow-hidden h-[100vh] w-[100vw]'} ${
        grow && 'overflow-hidden h-[100vh] w-[100vw]'
      }`}
    >
      <Nav />
      <div className={` `}>
        <div
          onClick={() => setIsToggle(true)}
          className={`bg-gradient-to-b  relative text-white md:px-14 sm:px-6 md:py-16 py-32 from-start text-center to-black `}
        >
          <main className="bg-purp bg-opacity-10 h-max w-[90%] mb-8 mt-12 p-4 pb-24 mx-auto">
            <section className="text-gray-400 text-sm pt-4">{user?.name}'s profile</section>
            <div className="flex justify-center mt-3 ">
              <div className="w-full flex items-center flex-col   p-5">
                <div className="h-24 w-24 rounded-[50%] bg-gray-400  cursor-pointer">
                  {user?.avatar && (
                    <img
                      src={require(`../assets/moddd/${user?.email?.split('@')[0].toLowerCase()}.png`)}
                      alt=""
                      className="h-24 w-24 rounded-[50%]"
                    />
                  )}
                </div>

                <h3 className="text-sm  pt-4">{user?.name}</h3>

                <div className="flex text-sm gap-6">
                  <Link to={`/chat/${user?.uid}`}>
                    <button className="px-5 py-2 bg-purp rounded mt-3 text-white transition-all ease duration-200 hover:scale-95">
                      Chat
                    </button>
                  </Link>
                  <Link to={`/book/${user?.name}`}>
                    <button className="px-5 py-2 bg-purp rounded mt-3 text-white transition-all ease duration-200 hover:scale-95">
                      Book
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="w-full border-b mb-9 border-b-purp border-opacity-25 "></div>

            <div className="">
              <div className="grid grid-cols-6 justify-center mb-4 gap-[2%] text-sm nnnn">
                <p className="text-right" style={{ gridColumn: 'span 2' }}>
                  Name:{' '}
                </p>
                <h2 className="text-left " style={{ gridColumn: 'span 3' }}>
                  {user?.name}
                </h2>
              </div>
              <div className="grid grid-cols-6 justify-center mb-4 gap-[2%] text-sm nnnn">
                <p className="text-right" style={{ gridColumn: 'span 2' }}>
                  About:{' '}
                </p>
                <h2 className="text-left" style={{ gridColumn: 'span 3' }}>
                  {user?.about?.split('...')[0] || 'null'}
                </h2>
              </div>

              {arr.map((item) => {
                return (
                  <>
                    {item && (
                      <div className="grid grid-cols-6 justify-center mb-4 gap-[2%] text-sm nnnn" key={item}>
                        <p className="text-right" style={{ gridColumn: 'span 2' }}>
                          {item?.split(':') !== '' && item.split(':') && item?.split(':')[0]}:{' '}
                        </p>
                        <h2 className="text-left" style={{ gridColumn: 'span 3' }}>
                          {item?.split(':') !== '' && item.split(':') && item?.split(':')[1]}
                        </h2>
                      </div>
                    )}
                  </>
                );
              })}
            </div>

            <div className="w-full border-b border-b-purp border-opacity-25 mb-9"></div>

            <div>
              <header className="text-sm">More pictures</header>
              <section className="flex justify-center items-center gap-3 px-6  pt-8 max-w-full flex-wrap ">
                {grow && (
                  <div
                    className={`absolute top-0 flex  justify-center items-center w-[100vw] h-[100vh] z-50 cursor-zoom-out bg-slate-800 bg-opacity-70`}
                    onClick={() => setGrow(false)}
                  >
                    <img
                      src={user?.email.includes('-model') ? require(`../assets/moddd/${user?.email?.split('@')[0].toLowerCase()}${imgNo}.png`) : user[`images${imgNo}`]}
                      alt="s"
                      className="w-sceen h-screen rounded-md"
                    />
                  </div>
                )}
                {[...Array(number)].map((_, index) => {
                  return (
                    <div
                      onClick={() => setGrow(true)}
                      onMouseEnter={() => setImgNo(index)}
                      key={index}
                      className={`${user && !user[`images${index}`] && 'hidden'} ${
                        user &&
                        !user[`images${index}`]?.includes('undefined') &&
                        'md:w-[35%] w-[47%] lg:w-[24%] md:h-[350px] '
                      }  rounded bg-gray-400  cursor-pointer hover:scale-105 transition-all ease-in duration-[350ms]`}
                    >
                      {user && user[`images${index}`] && !user[`images${index}`]?.includes('undefined') && (
                        // <a href={user[`images${index}`]} target="_blank" rel="noreferrer">
                        <img
                        src={user?.email.includes('-model') ? require(`../assets/moddd/${user?.email?.split('@')[0].toLowerCase()}${index}.png`) : user[`images${index}`]}
                          alt=""
                          className="h-full w-full rounded  "
                        />
                        // </a>
                      )}
                    </div>
                  );
                })}
              </section>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
};
