import axios from 'axios';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import DotLoader from 'react-spinners/DotLoader';
import btc from '../assets/btc.svg';
import { AuthContext } from '../Auth';
import { db } from '../Firebase';

const Btc = ({ active, setActive }) => {
  const { name } = useParams();
  const [price, setPrice] = useState();
  const { res, setRes, user } = useContext(AuthContext);
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleLoad = async () => {
      setLoading(true);
      const docSnap = await getDoc(doc(db, 'users', user.uid));
      setData(docSnap.data());
      setLoading(false);
    };
    handleLoad();
  }, []);

  const handleSubmit = (price) => {
    var data = JSON.stringify({
      price_amount: price,
      price_currency: 'usd',
      pay_currency: 'btc',
      ipn_callback_url: 'https://nowpayments.io',
      order_id: 'RGDBP-21314',
      order_description: `book ${name}`,
    });

    var config = {
      method: 'post',
      url: 'https://api.nowpayments.io/v1/payment',
      headers: {
        'x-api-key': '52SJ892-0YEMTGT-NPPTM1D-3JM34SH',
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setRes(response.data);
        updateDoc(doc(db, 'users', user.uid), {
          payment: response.data.payment_id,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (data?.payment) {
      var axios = require('axios');

      var config = {
        method: 'get',
        url: `https://api.nowpayments.io/v1/payment/${data?.payment}`,
        headers: {
          'x-api-key': '52SJ892-0YEMTGT-NPPTM1D-3JM34SH',
        },
      };

      axios(config)
        .then(function (response) {
          setRes(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  });

  const clearPayments = () => {
    updateDoc(doc(db, 'users', user.uid), {
      payment: null,
    });
    setRes(null);
    setData(null);
  };

  useEffect(() => {
    if (res) {
      if (res.payment_status !== 'waiting') {
        clearPayments();
      }
    }
  });

  if (loading) {
    return (
      <div className="h-screen bg-gradient-to-b min-h-screen relative text-white p-4 from-start text-center to-black">
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
          <DotLoader color={'#1B1A6C'} loading={loading} speedMultiplier={2} size={100} />
        </div>
      </div>
    );
  }

  //   actually_paid: 0
  // burning_percent: null
  // created_at: "2022-09-12T02:20:56.946Z"
  // invoice_id: null
  // order_description: "book Chloe"
  // order_id: "RGDBP-21314"
  // outcome_amount: 0.013683
  // outcome_currency: "btc"
  // pay_address: "3BiSL3RJ3BdCdYVzitEoXMJP81bfPLwMjc"
  // pay_amount: 0.01377344
  // pay_currency: "btc"
  // payin_hash: null
  // payment_id: 6241692067
  // payment_status: "waiting"
  // payout_hash: null
  // price_amount: 300
  // price_currency: "usd"
  // purchase_id: 4612028578
  // updated_at: "2022-09-12T02:24:13.743Z"

  if (res) {
    return (
      <div className="text-black ">
        <header className="flex p-4 py-6 items-center justify-between cursor-pointer bg-purple-200 bg-opacity-100 border-2 border-purp">
          <div className="text-black md:text-base text-sm">
            <h3>Pay In Bitcoin</h3>
          </div>
          <div className="flex gap-4">
            <img src={btc} alt="c" className="h-12 w-12" />
          </div>
        </header>
        {res.payment_status === 'waiting' ? (
          <div className="w-[90%] mx-auto flex items-center justify-center flex-col mt-14 gap-4">
            <div>
              Please pay {res.pay_amount}BTC to {res.pay_address}
            </div>
            <h3 className="text-base">Or Scan QR code</h3>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?data=${res.pay_address}&amp;size=100x100`}
              alt=""
              title=""
            />
            <div>Payment status: {res.payment_status}</div>
            <div>Payment ID: {res.payment_id}</div>
            <p className="">You'll be notified once your payment is received.</p>

            <button
              className="bg-purp transition-all ease-in duration-150 px-4 w-max rounded text-white py-1 hover:scale-[1.03]"
              onClick={clearPayments}
            >
              Cancel Payment
            </button>
          </div>
        ) : (
          <div className="flex w-full h-full items-center justify-center">
            <div className="text-black">Your payment has been confirmed!</div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div onClick={() => setActive('btc')} className="pb-4 bg-white  transition-all duration-300 ease-linear">
      <header className="flex p-4 py-6 items-center justify-between cursor-pointer bg-purple-200 bg-opacity-100 border-2 border-purp">
        <div className="text-black md:text-base text-sm">
          <h3>Pay In Bitcoin</h3>
        </div>
        <div className="flex gap-4">
          <img src={btc} alt="c" className="h-12 w-12" />
        </div>
      </header>
      {!res && (
        <section className="pt-5 bg-white text-black px-5">
          <p>
            Please note that all payments will now be in BTC to ease payment process for international clients outside
            of the US.
          </p>

          <div className="grid gap-2 mt-5 w-[45%]">
            <label htmlFor="name" className="text-black">
              Amount
            </label>
            <input
              onInput={(e) => setPrice(e.target.value)}
              type="text"
              id="name"
              placeholder="1000"
              className="border border-gray-500 hover:border-black outline-none px-3 py-2 rounded-[10px] w-[70%] text-gray-700"
            />
          </div>
          <button
            className="bg-purp text-white w-max px-4 mx-auto py-2 rounded-lg mt-10"
            onClick={() => handleSubmit(price)}
          >
            Generate wallet ID
          </button>
        </section>
      )}
    </div>
  );
};

export default Btc;
