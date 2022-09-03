import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.svg';
import Cookies from 'universal-cookie';
import { StreamChat } from 'stream-chat';
import hamburger from '../assets/hamburger.svg';
import { auth, db } from '../firebase';
import { updateDoc, doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { AuthContext } from '../context/auth';
import userr from '../assets/User.svg';

export const Nav = () => {
  const { user } = useContext(AuthContext);
  const [isToggle, setIsToggle] = useState(true);
  const { isActive, setIsActive } = useContext(AuthContext);

  const logout = async () => {
    await updateDoc(doc(db, 'users', auth.currentUser.uid), { isOnline: false });
    await signOut(auth);
  };

  // const set = () ={

  // }

  return (
    <nav className={`flex justify w-[100%] mx-auto gap-10 items-center px-4 md:px-0 `}>
      <header className="italiano text-3xl flex items-center gap-2 flex-1 ">
        RSangels
        <Link to={'/home'}>
          <img className="h-7" src={logo} alt="logo" />{' '}
        </Link>
      </header>

      <div className="md:flex gap-12 text-sm hidden">
        <Link to="/home" onClick={() => setIsActive('home')}>
          <ol className={` hover:text-purple-400 ${isActive === 'home' && 'text-purp'}`}>Home</ol>
        </Link>
        <Link to="/chats" onClick={() => setIsActive('chats')}>
          <ol className={`hover:text-purple-400 ${isActive === 'chats' && 'text-purp'}`}>Chats</ol>
        </Link>
        <Link to="/profile" onClick={() => setIsActive('profile')}>
          <ol className={`hover:text-purple-400 ${isActive === 'profile' && 'text-purp'}`}>Profile</ol>
        </Link>
        <Link to="/login">
          <h2 className="bg-purp px-3 py-1 rounded-[20px]" onClick={logout}>
            Sign out
          </h2>
        </Link>
      </div>

      {user ? (
        <>
          {/* <p
            className="text-xs px-3 cursor-pointer py-2 bg-purp rounded-[50%] md:block hidden"
            onClick={() => setIsToggle(!isToggle)}
          >
            {auth?.currentUser?.name?.split('')[0]}
          </p> */}
          {/* <img src={userr} alt="user" className='h-8 cursor-pointer hidden md:block' onClick={() => setIsToggle(!isToggle)} /> */}

          {/* <button id="dropdownInformationButton" data-dropdown-toggle="dropdownInformation" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown header <svg className="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button> */}

          <div
            id="dropdownInformation"
            className={` w-44 bg-start  rounded divide-y divide-gray-100 shadow block absolute top-16 right-8 transition-all duration-200 ease-in ${
              !isToggle ? 'z-10' : 'opacity-0 -z-10'
            }`}
          >
            <div className="py-3 px-4 text-sm text-gray-900 dark:text-white hidden md:block">
              <div>{auth?.currentUser?.name}</div>
              <p>Hi {auth?.currentUser?.displayName}</p>
              {/* <div className="font-medium truncate"></div> */}
            </div>

            <div className="py-1 md:block hidden">
              {/* <Link to={'/chats'}><p className='text-sm hover:bg-opacity-40 hover:bg-purp cursor-pointer py-2'>Chats</p></Link>  */}
              <Link to={'/profile'}>
                <p className="text-sm  hover:bg-purp hover:bg-opacity-40 cursor-pointer py-2">Profile</p>
              </Link>
              <p
                onClick={logout}
                className="block py-2 px-4 text-sm border-t divide-gray-100 w-44 hover:bg-opacity-40 text-gray-200 hover:bg-purp cursor-pointer"
              >
                Sign out
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="gap-3 text-xs items-center md:flex hidden">
          <Link to="/login">
            <h2>Log in</h2>
          </Link>
          <Link to="/login">
            <h2 className="bg-purp px-3 py-1 rounded-[20px]">Sign up</h2>
          </Link>
        </div>
      )}

      <img src={hamburger} alt="ham" className="md:hidden cursor-pointer" onClick={() => setIsToggle(!isToggle)} />

      <div
        id="drawer-example"
        className={`fixed z-40 md:hidden h-screen p-4 overflow-y-auto  w-80 bg-start  transition-all ease-in-out right-0 duration-200 ${
          isToggle ? '-z-10 opacity-0 translate-x-80' : 'right-0 -translate-x-0'
        } top-0 `}
        tabindex="-1"
        aria-labelledby="drawer-label"
        aria-modal="true"
        role="dialog"
      >
        <h5 id="drawer-label" className="inline-flex items-center mb-4 text-base font-semibold text-gray-400">
          Hi! {user.displayName}
        </h5>
        <button
          type="button"
          data-drawer-dismiss="drawer-example"
          aria-controls="drawer-example"
          className="text-gray-400 bg-transparent  rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center hover:bg-purp hover:text-white"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setIsToggle(!isToggle)}
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>

        <section className="grid py-12 gap-8 relative">
          <Link to="/home" onClick={() => setIsActive('home')}>
            <h2
              className={`bg-purp py-2 rounded-lg hover:bg-opacity-60 cursor-pointer ${
                isActive === 'home' ? 'bg-opacity-100' : 'bg-opacity-25'
              }`}
            >
              Home
            </h2>
          </Link>
          <Link to="/chats" onClick={() => setIsActive('chats')}>
            <h2
              className={`bg-purp py-2 rounded-lg  hover:bg-opacity-60 cursor-pointer ${
                isActive === 'chats' ? 'bg-opacity-100' : 'bg-opacity-25'
              }`}
            >
              Chats
            </h2>
          </Link>
          <Link to="/profile" onClick={() => setIsActive('profile')}>
            <h2
              className={`bg-purp py-2 rounded-lg  hover:bg-opacity-60 cursor-pointer ${
                isActive === 'profile' ? 'bg-opacity-100' : 'bg-opacity-25'
              }`}
            >
              Profile
            </h2>
          </Link>

          {/* <h2 className="bg-purp py-2 rounded-lg bg-opacity-25 hover:bg-opacity-100 cursor-pointer">About</h2> */}
        </section>
        <h2 className="absolute bottom-4 mx-auto w-[90%] bg-orange-400 bg-opacity-25 cursor-pointer hover:bg-red-600 hover:bg-opacity-60 py-2 rounded-lg ">
          Sign Out
        </h2>
      </div>
    </nav>
  );
};
