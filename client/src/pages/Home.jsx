import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.svg';
import { Nav } from '../component/Nav';

export const Home = () => {
  return (
    <div className="bg-gradient-to-b min-h-screen text-white from-start text-center to-black sm:px-6 md:px-14 py-4">
      <Nav />

      <div className="grid md:grid-cols-2 md:grid-rows-none px-6 sm:grid-rows-2 mt-12 md:mt-48">
        <div className="">
          <p className="text-4xl pb-12 text-left max-w-sm">Find and Meet Beautiful Models.</p>

          <p className="text-left text-sm pb-20 max-w-[370px]">
            Lörem ipsum nigora spesk varuska gofossa döda vinkeln-varnare. Hos kvasiform, utom telen direr androism.{' '}
          </p>

          <div className="w-max">
            <Link to="/home">
              <button className="bg-purp rounded-lg shadow-3xl w-max px-16 py-2">Meet Models</button>
            </Link>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
};
