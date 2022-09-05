import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.svg';
import search from '../assets/search.svg';
import hamburger from '../assets/hamburger.svg';
import { auth, db } from '../Firebase';
import { updateDoc, doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { AuthContext } from '../Auth';

export const Nav = () => {
  const { user } = useContext(AuthContext);
  const [isToggle, setIsToggle] = useState(true);
  const { isActive, setIsActive } = useContext(AuthContext);

  const logout = async () => {
    await updateDoc(doc(db, 'users', auth.currentUser.uid), { isOnline: false });
    await signOut(auth);
  };

  const searchFn = (value) => {};

  return (
    <div className="fixed z-50 w-[100%] transition-all ease-in duration-150 shadow-lg">
      <nav className={`flex  w-full mx-auto gap-10 items-center  py-4 px-8 bg-[#3f10acf3] text-white`}>
        <img src={hamburger} alt="ham" className="cursor-pointer" onClick={() => setIsToggle(!isToggle)} />

        <div className="flex w-full md:justify-between justify-center gap-5">
          <Link to={'/home'}>
            <header className="italiano text-3xl flex items-center gap-2 flex-1 ">
              RSangels
              <img className="h-7" src={logo} alt="logo" />{' '}
            </header>
          </Link>

          <section className="justify-center hidden md:flex w-[50%] mx-auto items-center text-white text-opacity-75">
            <form
              className="bg-gray-700 bg-opacity-25 flex w-max items-center rounded-[50px] px-[30px]"
              onSubmit={(e) => e.preventDefault()}
            >
              <img src={search} alt="search" className="w-5 h-5" />
              <input
                type="text"
                className="bg-transparent outline-none border-none py-2 pl-3 text-white "
                onInput={(e) => {
                  searchFn(e.target.value);
                }}
              />
            </form>
          </section>

          <div className="md:flex gap-8 text-sm hidden items-center">
            <Link to="/profile" onClick={() => setIsActive('profile')}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#9747FF"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </Link>
            {user ? (
              <Link to="/login">
                <h2 className="bg-purp px-3 py-1 rounded-[20px]" onClick={logout}>
                  Sign out
                </h2>
              </Link>
            ) : (
              <div className="gap-3 text-xs items-center flex ">
                <Link to="/login">
                  <h2>Log in</h2>
                </Link>
                <Link to="/login">
                  <h2 className="bg-purp px-3 py-1 rounded-[20px]">Sign up</h2>
                </Link>
              </div>
            )}
          </div>

          <div
            id="drawer-example"
            className={`fixed z-40 h-[100vh] md:h-[100vh] overflow-y-hidden px-3 py-6 w-[240px] bg-start top-[68px] md:top-[72px] transition-all ease-in-out left-0 duration-200 ${
              isToggle ? '-z-10 opacity-0 -translate-x-80' : 'right-0 -translate-x-0'
            } `}
            tabindex="-1"
            aria-labelledby="drawer-label"
            aria-modal="true"
            role="dialog"
          >
            <main className="scrolls  overflow-y-scroll h-[72vh]">
              <section className="grid py-2 gap-2 relative transition-all ease-in duration-150 ">
                <Link to="/home" onClick={() => setIsActive('home')}>
                  <div className="flex w-full items-center gap-3 hover:bg-purp hover:bg-opacity-30 px-2 py-1 rounded-[5px] text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4">
                      <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                      <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                    </svg>

                    <h2>Home</h2>
                  </div>
                </Link>

                <Link to="/chats" onClick={() => setIsActive('chats')}>
                  <div className="flex w-full items-center gap-3 hover:bg-purp hover:bg-opacity-30 px-2 py-1 rounded-[5px] text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4">
                      <path
                        fill-rule="evenodd"
                        d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z"
                        clip-rule="evenodd"
                      />
                    </svg>

                    <h2>Chats</h2>
                  </div>
                </Link>
                <Link to="/profile" onClick={() => setIsActive('profile')}>
                  <div className="flex w-full items-center gap-3 hover:bg-purp hover:bg-opacity-30 px-2 py-1 rounded-[5px] text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4">
                      <path
                        fill-rule="evenodd"
                        d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                        clip-rule="evenodd"
                      />
                    </svg>

                    <h2>Profile</h2>
                  </div>
                </Link>
              </section>

              <div className="w-[99%] border-b border-b-gray-400 "></div>
              <section className="mt-6 mb-2">
                <div className="flex w-full items-center gap-3  px-2 py-1 rounded-[5px] ">
                  <h2 className="text-sm text-gray-400">BODY TYPE</h2>
                </div>

                <div className="flex w-full items-center cursor-pointer gap-3 hover:bg-purp hover:bg-opacity-30 px-2 py-1 rounded-[5px] text-sm">
                  <h2>Skinny</h2>
                </div>
                <div className="flex w-full items-center cursor-pointer gap-3 hover:bg-purp hover:bg-opacity-30 px-2 py-1 rounded-[5px] text-sm">
                  <h2>Curvy</h2>
                </div>
                <div className="flex w-full items-center cursor-pointer gap-3 hover:bg-purp hover:bg-opacity-30 px-2 py-1 rounded-[5px] text-sm">
                  <h2>Fit</h2>
                </div>
              </section>

              <section className="mt-6 mb-2">
                <div className="flex w-full items-center gap-3 cursor-pointer px-2 py-1 rounded-[5px] ">
                  <h2 className="text-sm text-gray-400">HAIR</h2>
                </div>

                <div className="flex w-full items-center gap-3 cursor-pointer hover:bg-purp hover:bg-opacity-30 px-2 py-1 rounded-[5px] text-sm">
                  <h2>brown</h2>
                </div>
                <div className="flex w-full items-center gap-3 cursor-pointer hover:bg-purp hover:bg-opacity-30 px-2 py-1 rounded-[5px] text-sm">
                  <h2>Copper shimmer</h2>
                </div>
                <div className="flex w-full items-center gap-3 cursor-pointer hover:bg-purp hover:bg-opacity-30 px-2 py-1 rounded-[5px] text-sm">
                  <h2>blonde</h2>
                </div>
                <div className="flex w-full items-center gap-3 cursor-pointer hover:bg-purp hover:bg-opacity-30 px-2 py-1 rounded-[5px] text-sm">
                  <h2>black</h2>
                </div>
              </section>

              <section className="mt-6 mb-2">
                <div className="flex w-full items-center gap-3 cursor-pointer px-2 py-1 rounded-[5px] ">
                  <h2 className="text-sm text-gray-400">POPULAR</h2>
                </div>

                <div className="flex w-full items-center gap-3 cursor-pointer hover:bg-purp hover:bg-opacity-30 px-2 py-1 rounded-[5px] text-sm">
                  <h2>Small tits</h2>
                </div>
                <div className="flex w-full items-center gap-3 cursor-pointer hover:bg-purp hover:bg-opacity-30 px-2 py-1 rounded-[5px] text-sm">
                  <h2>Big Tits</h2>
                </div>
                <div className="flex w-full items-center gap-3 cursor-pointer hover:bg-purp hover:bg-opacity-30 px-2 py-1 rounded-[5px] text-sm">
                  <h2>blonde</h2>
                </div>
                <div className="flex w-full items-center gap-3 cursor-pointer hover:bg-purp hover:bg-opacity-30 px-2 py-1 rounded-[5px] text-sm">
                  <h2>black</h2>
                </div>
              </section>
            </main>

            {user ? (
              <h2
                className="text-center fixed bottom-24 mx-auto w-[90%] cursor-pointer flex items-center gap-3 hover:bg-purp hover:bg-opacity-30 px-2 py-1 rounded-[5px] text-sm "
                onClick={logout}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                  <path
                    fill-rule="evenodd"
                    d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <h2>Sign Out</h2>
              </h2>
            ) : (
              <div className="flex w-[90%] justify-between fixed bottom-24">
                <Link to="/login">
                  <h2 className="text-center  mx-auto w-[100%] cursor-pointer flex items-center gap-3 hover:bg-purp hover:bg-opacity-30 px-2 py-1 rounded-[5px] text-sm ">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4">
                      <path
                        fill-rule="evenodd"
                        d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                        clip-rule="evenodd"
                      />
                    </svg>

                    <h2 className="w-max">Log in</h2>
                  </h2>
                </Link>
                <Link to={'/login'}>
                  <h2 className="text-center mx-auto w-[100%] cursor-pointer flex items-center gap-1 hover:bg-purp hover:bg-opacity-30 px-2 py-1 rounded-[5px] text-sm ">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3">
                      <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                    </svg>

                    <h2 className="w-max">Sign up</h2>
                  </h2>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className="w-full bg-[#101030] py-4 md:hidden">
        <section className="flex justify-center w-[50%] mx-auto items-center text-white text-opacity-75">
          <form
            className="bg-gray-700 bg-opacity-25 flex w-max items-center rounded-[50px] px-[30px]"
            onSubmit={(e) => e.preventDefault()}
          >
            <img src={search} alt="search" className="w-5 h-5" />
            <input
              type="text"
              className="bg-transparent outline-none border-none py-2 pl-3 text-white "
              onInput={(e) => {
                searchFn(e.target.value);
              }}
            />
          </form>
        </section>
      </div>
    </div>
  );
};
