import React, { useState } from 'react';
import { useEffect } from 'react';
import Btc from '../component/Btc';
import Credit from '../component/Credit';
import { Nav } from '../component/Nav';

export const Book = () => {
  const [active, setActive] = useState('credit');

  useEffect(() => {
    console.log(active);
  }, [active]);
  return (
    <>
      <Nav />
      <div className="min-h-screen text-white transition-all ease duration-150 md:pt-16 sm:pt-32">
        <Credit active={active} setActive={setActive} />
        <Btc active={active} setActive={setActive} />
      </div>
    </>
  );
};
