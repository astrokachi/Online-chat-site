import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/auth';
import back from '../assets/back.svg';
import search from '../assets/search.svg';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { User } from './User';

const Chats = () => {
  const { users, user } = useContext(AuthContext);
  const [models, setModels] = useState([]);
  const [commons, setCommons] = useState([]);

//   console.log(models)

  const sortUsers = () => {
    if (!user.email.includes('-model')) {
      setModels(users.filter((ouser) => ouser.email.includes('-model')));
    } else if (user.email.includes('-model')) {
      setCommons(users.filter((ouser) => !ouser.email.includes('-model')));
    }
  };

//   console.log('models', models);
//   console.log('commons', commons);

  useEffect(() => {
    sortUsers();
  }, [user, users]);

  return (
    <div className="w-full ">
      <header className="bg-purp text-white items-center p-4 flex gap-4 fixed w-full">
        <Link to="/home">
          <img src={back} alt="back" className="w-5 h-5 text-white cursor-pointer" />
        </Link>
        <div className="h-14 w-14 rounded-[50%] bg-gray-400" />
        <div className="text-white text-left ">
          <h3 className="flex items-center gap-2">
            {user.displayName}{' '}
            <span>
              <i>(me)</i>
            </span>
            <div className={`h-2 w-2 rounded-[50%] ${'bg-green-400'}`}></div>
          </h3>
          <h2>{user.email.includes('-model') ? user.email.split('-')[0] : user.email}</h2>
        </div>
      </header>

      <section className="pt-24 flex justify-center">
        <form action="" className="bg-gray-200 flex w-max items-center rounded-lg px-2">
          <img src={search} alt="search" className="w-5 h-5" />
          <input type="text" className="bg-inherit outline-none border-none py-2 pl-3 text-slate-900" />
        </form>
      </section>

      {user.email.includes('-model')
        ? commons.map((c, index) => <User c={c} key={index} />)
        : models.map((m, index) => <User m={m} key={index} />)}
    </div>
  );
};

export default Chats;
