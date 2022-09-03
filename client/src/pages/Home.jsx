import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.svg';
import { Nav } from '../component/Nav';
import back1 from '../assets/Group.png';
import back2 from '../assets/Group90.png';
import back3 from '../assets/Group91.png';

export const Home = () => {
  return (
    <div className="bg-gradient-to-b lg:overflow-hidden overflow-x-hidden min-h-screen relative max-w-[100vw] w-[100vw] text-white from-start text-center to-black ">
      {/* <Nav /> */}
      <header className="italiano text-3xl flex items-center gap-2 flex-1 justify-center p-4 mt-4">
        RSangels <img className="h-7" src={logo} alt="logo" />{' '}
      </header>

      <div className="flex md:flex-row flex-col w-full">
        <div
          className=" mt-14 lg:mt-[140px] md:mt- sm:px-6 lg:ml-12 px-6 w-full   py-4 lg:w-[40%] md:w-[50%]"
          style={{ gridColumn: 'span 2' }}
        >
          <p className="text-4xl pb-12 md:text-left md:max-w-sm">Find and Meet Beautiful Models.</p>

          <p className="md:text-left text-sm md:pb-20 pb-10 md:max-w-[370px]">
            Lörem ipsum nigora spesk varuska gofossa döda vinkeln-varnare. Hos kvasiform, utom telen direr androism.{' '}
          </p>

          <div className="md:w-max ">
            <Link to="/home">
              <button className="bg-purp rounded-lg shadow-3xl mx-auto px-16 py-2">Meet Models</button>
            </Link>
          </div>
        </div>

        <div className=" pb-4 mx-auto">
          <div className="rounded-lg  h-full relative w-full">
            <img src={back1} alt="" className=" md:w-[90%] w-[95%] mx-0" />
          </div>
        </div>
      </div>
    </div>
  );
};
