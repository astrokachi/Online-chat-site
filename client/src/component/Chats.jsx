import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../Auth';
import back from '../assets/back.svg';
import search from '../assets/search.svg';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { User } from './User';
import { Nav } from './Nav';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../Firebase';
import { Footer } from './Footer';

const Chats = () => {
  const [models, setModels] = useState([]);
  const [commons, setCommons] = useState([]);
  const [user, setUser] = useState();
  const { users } = useContext(AuthContext);
  const [holder, setHolder] = useState([]);
  const { isToggle, setIsToggle } = useContext(AuthContext);

  useEffect(() => {
    getDoc(doc(db, 'users', auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists()) {
        setUser(docSnap.data());
      }
    });
  }, []);

  const searchFn = (value) => {
    // console.log(value);
    if (models && value.length > 0) {
      let newM = [...holder];
      newM = newM.filter((user) => user.name.toLowerCase().includes(value.toLowerCase()));
      setModels(newM);
    }
    if (commons && value.length > 0) {
      // console.log('reached');
      let newC = [...holder];
      newC = newC.filter((user) => user.name.toLowerCase().includes(value.toLowerCase()));
      // console.log(newC);
      setCommons(newC);
    }

    if (value.length < 1) {
      setModels(holder);
      setCommons(holder);
    }
  };

  useEffect(() => {
    const sortUsers = () => {
      if (!user?.email.includes('-model')) {
        setModels(users.filter((ouser) => ouser.email.includes('-model') && ouser.texted));
        setHolder(users.filter((ouser) => ouser.email.includes('-model') && ouser.texted));
      } else if (user?.email.includes('-model')) {
        setCommons(users.filter((ouser) => !ouser.email.includes('-model')));
        setHolder(users.filter((ouser) => !ouser.email.includes('-model')));
      }
    };
    sortUsers();
  }, [user?.email, users]);

  return (
    <div className={`${!isToggle && 'overflow-y-hidden h-[100vh]'}`}>
      <Nav />
      <div
        onClick={() => setIsToggle(true)}
        className={`w-full bg-gradient-to-b min-h-screen text-white p-4 py-32 md:py-16 from-start text-center to-black transition-all ease duration-150`}
      >
        <div className="bg-purp bg-opacity-20 flex  flex-col  rounded mt-6 min-h-[85vh] relative w-full max-w-full">
          <header className=" text-white bg-purp rounded-lg bg-opacity-20 items-center p-4 flex gap-4 w-full ">
            <Link to="/home">
              <img src={back} alt="back" className="w-5 h-5 text-white cursor-pointer" />
            </Link>
            <div className="h-14 w-14 rounded-[50%] bg-gray-400 relative">
              {user?.avatar && <img src={user.avatar} alt="" className="h-14 w-14 rounded-[50%]" />}
            </div>
            <div className="text-white text-left ">
              <h3 className="flex items-center gap-2">
                {user?.displayName}{' '}
                <span>
                  <i>(me)</i>
                </span>
                <div className={`h-2 w-2 rounded-[50%] ${'bg-green-400'}`}></div>
              </h3>
              <h2>{user?.email.includes('-model') ? user.name : user?.email}</h2>
            </div>
          </header>

          <section className="pt-4 flex justify-center">
            <form className="bg-gray-200 flex w-max items-center rounded-lg px-2" onSubmit={(e) => e.preventDefault()}>
              <img src={search} alt="search" className="w-5 h-5" />
              <input
                type="text"
                className="bg-inherit outline-none border-none py-2 pl-3 text-slate-900"
                onInput={(e) => {
                  searchFn(e.target.value);
                }}
              />
            </form>
          </section>

          <div className="pt-8">
            {user?.email.includes('-model')
              ? commons.map((c, index) => <User c={c} key={index} />)
              : models.map((m, index) => <User m={m} key={index} />)}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Chats;
