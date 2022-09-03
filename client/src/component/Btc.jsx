import React from 'react';
import btc from '../assets/btc.svg';
import qr from '../assets/qr.svg';

const Btc = ({ active, setActive }) => {
  return (
    <div onClick={() => setActive('btc')} className="pb-4 bg-white  transition-all duration-300 ease-linear">
      <header className="flex p-4 py-6 items-center justify-between cursor-pointer bg-purple-200 bg-opacity-100 border-2 border-purp">
        <div className="text-black md:text-base text-sm">
          <h3>Bitcoin</h3>
          {/* <h3 className="text-gray-500">Transaction fees may apply</h3> */}
        </div>

        <div className="flex gap-4">
          <img src={btc} alt="c" className="h-12 w-12" />
        </div>
      </header>
      {active === 'btc' && (
        <section className="pt-5 bg-white text-black px-5">
          <div className="flex items-center flex-col pb-4">
            <img src={qr} alt="c" className="h-[180px]" />
            <p>0.028234445BTC</p>
          </div>

          <form>
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
          </form>

          <div className='p-4'>
            <p className="w-max mx-auto  ">Send 0.00001435BTC (in 1 payment) to:</p>
            <p className="w-max mx-auto  ">Please note that the transaction fee is not incldued in this amount </p>
          </div>

          <button className="bg-purp w-[100%] text-white py-2 rounded-lg mt-8">Pay Now</button>
        </section>
      )}
    </div>
  );
};

export default Btc;
