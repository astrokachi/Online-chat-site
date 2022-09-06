import React, { useState } from 'react';
import { Link } from 'react-router-dom';



export const UserSearch = ({ model }) => {

  return (
    <Link to={`/${model?.uid}/profile`}>
      <header className="bg py-2 flex gap-4 w-full hover:bg-purp hover:bg-opacity-10 items-center">
        <div className="h-8 w-8 rounded-[50%] bg-gray-400">
          {model?.avatar && <img src={model.avatar} alt="" className="h-8 w-8 rounded-[50%]" />}
        </div>
        <div className="text-white text-left flex-grow">
          <h3 className="flex items-center gap-2 text-sm">
            {model?.name}{' '}
          </h3>
        </div>
      </header>
    </Link>
  );
};
