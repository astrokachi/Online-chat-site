import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.svg';
import svg1 from '../assets/svgexport-39.svg';
import svg2 from '../assets/svgexport-40.svg';
import svg3 from '../assets/svgexport-41.svg';
import svg4 from '../assets/svgexport-42.svg';
import svg5 from '../assets/svgexport-43.svg';

export const Footer = () => {
  return (
    <div className="grid gap-9 bg-[rgb(33,34,35)] bg-opacity-50 text-[#909091] p-4  transition-all ease duration-150">
      <div className="md:grid md:grid-cols-4 flex flex-col-reverse gap-6 relative">
        <div className="" style={{ gridColumn: 'span 2' }}>
          <Link to={'/home'}>
            <header className="italiano text-3xl flex items-center gap-2 flex-1 pb-4">
              RSangels
              <img className="h-7" src={logo} alt="logo" />{' '}
            </header>
          </Link>

          <p className="text-sm">
            RSangels is an 18+ adult Hookup and entertainment community. You can chat with our professional models for
            absolutely free. Browse through galleries of open minded females, you can select what desire you want to
            explore from the menu, arrange private meetings.
          </p>
          <br />
          <p className="text-sm">
            The purpose of that to create an ultimate destination for adult entertainment filled with good vibes and
            happy aftertaste. Our models carry on them GPS for easy access of location and for security reasons.
          </p>
          <br />
          <p className="text-sm mb-12">
            All models appearing on this site have contractually confirmed to us that they are 18 years of age or older.
          </p>
          <br />
        </div>

        <div className="absolute border-b bottom-0 border-b-[#909091] w-[100%] " />

        <section className="flex flex-col gap-3">
          <div className="relative pb-2">
            <header className="text-white text-sm">LEGAL & SAFETY</header>
            <div className="absolute border-b bottom-0 border-b-[#909091] w-[100%]" />
          </div>
          <div className="relative pb-2">
            <Link to={'/privacy'}>
              <p className="text-sm cursor-pointer hover:text-purp">Privacy Policy</p>
            </Link>
            <div className="absolute border-b bottom-0 border-b-[#909091] w-[100%]" />
          </div>
          <div className="relative pb-2">
            <Link to="/terms">
              <p className="text-sm cursor-pointer hover:text-purp">Terms of use</p>
            </Link>
            <div className="absolute border-b bottom-0 border-b-[#909091] w-[100%]" />
          </div>
          <div className="relative pb-2">
            <Link to="/DCMA">
              <p className="text-sm cursor-pointer hover:text-purp">DCMA Policy</p>
            </Link>
            {/* <div className="absolute border-b bottom-0 border-b-[#909091] w-[100%]" /> */}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <div className="relative pb-2">
            <header className="text-white text-sm">HELP & SUPPORT</header>
            <div className="absolute border-b bottom-0 border-b-[#909091] w-[100%]" />
          </div>
          {/* <div className='relative pb-2'>
            <p className="text-sm ">Contact & Support</p>
            <div className="absolute border-b bottom-0 border-b-[#909091] w-[100%]" />
          </div> */}
          <div className="relative pb-2">
            <Link to="/support/billing">
              <p className="text-sm cursor-pointer hover:text-purp">Billing Support</p>
            </Link>
            <div className="absolute border-b bottom-0 border-b-[#909091] w-[100%]" />
          </div>
          <div className="relative pb-2">
            <Link to="/DCMA">
              <p className="text-sm cursor-pointer hover:text-purp">DCMA Protection</p>
            </Link>
            {/* <div className="absolute border-b bottom-0 border-b-[#909091] w-[100%]" /> */}
          </div>
        </section>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-0">
        <div className="flex items-center gap-6 w-[40%]">
          <a
            target={'_blank'}
            href="https://www.rtalabel.org/?content=validate&ql=b9b25de5ba5da974c585d9579f8e9d49&rating=RTA-5042-1996-1400-1577-RTA"
            rel="noreferrer"
          >
            <img src={svg1} alt="" className="h-6" />
          </a>
          <img src={svg2} alt="" className="h-10" />
          <img src={svg3} alt="" className="h-6" />
          <a href="https://pineapplesupport.org/about-pineapple-support/" target={'_blank'} rel="noreferrer">
            <img src={svg4} alt="" className="h-7" />
          </a>
        </div>
        <div className="border-b bottom-0 border-b-[#909091] w-[100%] md:hidden" />
        <div className=" flex items-center justify-between w-full md:w-[60%]">
          <Link to="/2257">
            <h2 className="text-xs hover:text-purp cursor-pointer">
              18 U.S.C. 2257 Record-Keeping Requirements Compliance Statement
            </h2>
          </Link>
          <img src={svg5} alt="" className="h-9" />
        </div>
      </div>
      <div className="border-b bottom-0 border-b-[#909091] w-[100%] " />
      <h2 className="text-xs mx-auto mb-4">© 2022 RSangels.com</h2>
    </div>
  );
};
