import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.svg';

export const Initial = () => {
  return (
    <div className="bg-gradient-to-b  from-start text-center to-black  relative flex font-normal items-center flex-col text-white px-3 py-9">
      <header className="italiano text-3xl mb-10 flex items-center gap-2">
        RSangels <img className="h-7" src={logo} alt="logo" />{' '}
      </header>

      <p className="text-sm  font-normal max-w-[706px]">
        We are creating a better experience for 18+ entertainment. Join our open-minded community & start interacting
        now for FREE.
      </p>

      <Link to="/landing">
        <button className="bg-white rounded-[25px] font-medium mt-9 px-9 py-2 w-max text-black">I'm over 18</button>
      </Link>

      <p className="text-xs max-w-xl pt-10 pb-11">
        By entering and using this website you agree to be bound by the Terms of Use and Privacy Policy 18 U.S.C. 2257
        Record-Keeping Requirements Compliance Statement
      </p>

      <p className="text-sm max-w-[706px]">
        If you provide sensitive personal data, by entering the website you give your explicit consent to process this
        data to tailor the website to your preferences.
      </p>

      <div className="flex w-[90%] justify-between gap-10 pt-10">
        <div className="w-full border-b border-b-white" />
        <div className="w-full border-b border-b-white" />
      </div>

      <a href="https://www.google.com">
        <h3 className="underline pt-6 pb-3">Exit Here</h3>
      </a>
      
      <p className="text-sm max-w-3xl pb-4">
        THIS WEBSITE CONTAINS MATERIAL THAT IS SEXUALLY EXPLICIT. You must be at least eighteen (18) years of age to use
        this Website, unless the age of majority in your jurisdiction is greater than eighteen (18) years of age, in
        which case you must be at least the age of majority in your jurisdiction. Use of this Website is not permitted
        where prohibited by law.
      </p>
      <p className="text-sm max-w-3xl pb-4">
        This Website also requires the use of cookies. More information about our cookies can be found at our Privacy
        Policy. BY ENTERING THIS WEBSITE AND USING THIS WEBSITE YOU AGREE TO THE USE OF COOKIES AND ACKNOWLEDGE THE
        PRIVACY POLICY.
      </p>

      <p className="text-sm max-w-3xl pb-4">
        All models were 18 and over at the time of the creation of such depictions.
      </p>
    </div>
  );
};
