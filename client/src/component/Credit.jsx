import React, { useState } from 'react';
import card1 from '../assets/image1.svg';
import card3 from '../assets/image3.svg';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Credit = ({ setActive, active }) => {
  

 

  return (
    <div onClick={() => setActive('credit')} className="pb-8 bg-white">
      <header className="flex p-4 py-6 items-center justify-between cursor-pointer bg-purple-200 bg-opacity-100 border-2 border-purp">
        <div className="text-black md:text-base text-sm">
          <h3>Credit & Debit Cards</h3>
          <h3 className="text-gray-500">Transaction fees may apply</h3>
        </div>

        <div className="flex gap-4 items-center">
          <img src={card1} alt="c" className="md:h-16 md:w-16 w-10 " />
          <img src={require('../assets/mastercard.png')} alt="c" className="md:h-12 md:w-16 w-10 " />
          <img src={card3} alt="c" className="md:h-16 md:w-16 w-10 " />
        </div>
      </header>

      {active === 'credit' && (
        <div className="bg-white py-6 px-5 ">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-2">
              <label htmlFor="name" className="text-black">
                Cardholder Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                className="border border-gray-500 hover:border-black outline-none px-3 py-2 rounded-[10px] w-[70%] text-gray-700"
              />
            </div>
            <div className="grid gap-2 mt-5 ">
              <label htmlFor="name" className="text-black">
                Card Number
              </label>
              <input
                type="text"
                id="name"
                placeholder="1234 1234 1234 1234"
                className="border hover:border-black border-gray-500 outline-none px-3 py-2 rounded-[10px] w-[70%] text-gray-700"
              />
            </div>

            <div className="flex w-[100%] md:w-[70%] justify-between">
              <div className="grid gap-2 mt-5 ">
                <label htmlFor="name" className="text-black">
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="MM/YY"
                  className="border hover:border-black border-gray-500 outline-none px-3 py-2 rounded-[10px] w-[70%] text-gray-700"
                />
              </div>

              <div className="grid gap-2 mt-5 ">
                <label htmlFor="name" className="text-black">
                  cvv
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="123"
                  className="border hover:border-black border-gray-500 outline-none px-3 py-2 rounded-[10px] w-[70%] text-gray-700"
                />
              </div>
            </div>
            <div className="grid gap-2 mt-5 w-[45%]">
              <label htmlFor="name" className="text-black">
                Amount
              </label>
              <input
                type="text"
                id="name"
                placeholder="1000"
                className="border border-gray-500 hover:border-black outline-none px-3 py-2 rounded-[10px] w-[70%] text-gray-700"
              />
            </div>

            <button className="bg-purp text-white w-[100%] py-2 rounded-lg mt-10" >Pay Now</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Credit;
