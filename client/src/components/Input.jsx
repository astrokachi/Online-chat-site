import React, { useEffect, useState } from 'react';

export const Input = ({ title, placeholder, name, handleChange, share, type, ...props }) => {
  const [isPassword, setIsPassword] = useState(false);
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    placeholder === 'password' && setIsPassword(true);
  }, [isPassword, placeholder]);

  let newVal = placeholder.length > 7 ? `${placeholder.substring(0, 12)}...` : placeholder;

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  function getWindowSize() {
    const { innerWidth } = window;
    return innerWidth;
  }

  if (windowSize <= 940) {
    newVal = placeholder.length > 7 ? `${placeholder.substring(0, 7)}...` : placeholder;
  }
  else if (windowSize > 1040) {
    newVal = placeholder.length > 7 ? placeholder : placeholder;
  }if (windowSize <= 700) {
    newVal = placeholder.length > 7 ? `${placeholder.substring(0, 4)}...` : placeholder;
  }

  // let type = isPassword ? 'password' : `text`;
  return (
    <div className=" pb-3 flex flex-col">
      <label className="text-sm pb-1">{title === 'confirm password' ? 'confirm password' : `Your ${title}`}</label>
      <input
        name={name}
        className={`border-2 border-gray-200 rounded-[10px] px-4 py-1 outline-none ${share && 'w-full'}`}
        type={type}
        placeholder={share ? newVal : placeholder}
        onChange={(e) => {
          handleChange(e);
        }}
        required
      />
    </div>
  );
};
