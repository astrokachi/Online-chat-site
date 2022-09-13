import React from 'react';
import { Footer } from '../component/Footer';
import { Nav } from '../component/Nav';

const Billing = () => {
  return (
    <div className="transition-all ease-in duration-200">
      <Nav />
      <div className="md:pt-24 pt-44 p-4 text-white">Billing support</div>
      <section className="container pt-2  text-white mx-auto mb-12">
        <div className="md:mt-7 mt-12 p-4 bg-opacity-50 rounded-md  bg-[#222222] text-sm">
         <p></p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Billing;
