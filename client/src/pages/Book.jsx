import React, { useState } from 'react';
import Btc from '../component/Btc';
import Credit from '../component/Credit';
import { Nav } from '../component/Nav';

export const Book = () => {
  const [active, setActive] = useState('credit');
  return (
    <div className="min-h-screen text-white bg-white">
      <Credit active={active} setActive={setActive} />
      <Btc active={active} setActive={setActive} />

    </div>
  );
};
