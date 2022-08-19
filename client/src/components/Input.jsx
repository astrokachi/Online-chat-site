import React, { useEffect, useState } from 'react';

export const Input = ({ title, placeholder, name, handleChange, share }) => {
  const [isPassword, setIsPassword] = useState(false);

  

  useEffect(() => {
    placeholder === 'password' && setIsPassword(true);
  }, [isPassword, placeholder]);

  let type = isPassword ? 'password' : `text`;
  return (
    <div className=" pb-3 flex flex-col">
      <label className="text-sm pb-1">{title === 'confirm password' ? 'confirm password' : `Your ${title}`}</label>
      <input
        name={name}
        className={`border-2 border-gray-200 rounded-[10px] px-4 py-1 outline-none ${share && 'w-full'}`}
        type={type}
        placeholder={placeholder}
        onChange={(e) => {
          handleChange(e);
        }}
        // required
      />
    </div>
  );
};
