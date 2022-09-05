import React, { useContext } from 'react';

import { useState } from 'react';
import photo from '../assets/photo.svg';
import { Nav } from './Nav';
import { Footer } from './Footer';
import { AuthContext } from '../Auth';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export const ProfileClient = () => {
  const [number] = useState(8);
  const [grow, setGrow] = useState(false);
  const [imgNo, setImgNo] = useState();

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
    <>
      <Nav />
      <div className={` `}>
        <div
          className={`bg-gradient-to-b  relative text-white md:px-14 sm:px-6 py-16 from-start text-center to-black `}
        >
       
          <main className="bg-purp bg-opacity-10 h-max w-[90%] mb-8 mt-12 p-4 pb-24 mx-auto">
            <section className="text-gray-400 text-sm pt-4">{user?.name}'s profile</section>
            <div className="flex justify-center mt-3 ">
              <div className="w-full flex items-center flex-col   p-5">
                <div className="h-24 w-24 rounded-[50%] bg-gray-400  relative cursor-pointer">
                  {user?.avatar && <img src={user?.avatar || ''} alt="" className="h-24 w-24 rounded-[50%]" />}
                </div>

                <h3 className="text-sm  pt-4">{user?.name}</h3>
              </div>
            </div>

            <div className="w-full border-b mb-9 border-b-purp border-opacity-25 "></div>

            <div className="">
              <div className="grid grid-cols-5 justify-center mb-4 gap-[2%] text-sm ">
                <p className="text-right">Name: </p>
                <h2 className="text-left" style={{ gridColumn: 'span 3' }}>
                  {user?.name}
                </h2>
              </div>
              <div className="grid grid-cols-5 justify-center mb-4 gap-[2%] text-sm ">
                <p className="text-right">About: </p>
                <h2 className="text-left" style={{ gridColumn: 'span 3' }}>
                  {user?.about?.split('...')[0] || 'null'}
                </h2>
              </div>

              {arr.map((item) => {
                return (
                  <div className="grid grid-cols-5 justify-center mb-4 gap-[2%] text-sm " key={item}>
                    <p className="text-right">{item?.split(':')[0]}: </p>
                    <h2 className="text-left" style={{ gridColumn: 'span 3' }}>
                      {item?.split(':')[1]}
                    </h2>
                  </div>
                );
              })}
            </div>

            <div className="w-full border-b border-b-purp border-opacity-25 mb-9"></div>

            <div>
              <header className="text-sm">More pictures</header>
              <section className="flex justify-center items-center gap-3 px-6  pt-8 max-w-full flex-wrap ">
                {/* {grow && (
      <div
        className={`absolute top-0 flex justify-center items-center w-[100vw] h-[100vh] z-50 cursor-zoom-out bg-slate-800 bg-opacity-70`}
        onClick={() => setGrow(false)}
      >
        <img src={user[`images${imgNo}`]} alt="s" className="w-max h-[95%] rounded-md" />
      </div>
    )} */}
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
                      {user && !user[`images${index}`]?.includes('undefined') && (
                        <a href={user[`images${index}`]} target="_blank" rel="noreferrer">
                          <img src={user[`images${index}`]} alt="" className="h-full w-full rounded  " />
                        </a>
                      )}
                      <div>
                        <label htmlFor="photo"></label>
                        <input type="file" id="photo" accept="image/*" className="hidden" />
                        {/* <h2 className='text-xs text-black font-medium absolute bottom-3 left-[50%] translate-x-[-50%] w-max'>Click to upload</h2> */}
                      </div>
                    </div>
                  );
                })}
              </section>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
};
