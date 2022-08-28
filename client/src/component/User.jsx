import React, { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../firebase';

export const User = ({ c, m }) => {
  const { user } = useContext(AuthContext);
  const [last, setLast] = useState();

  useEffect(() => {
    let id;
    // const id = c ? (user?.uid > c?.uid ? `${user?.uid} + ${c?.uid}` : `${m?.uid} + ${user?.uid}`) : (user?.uid > m?.uid ? `${user?.uid} + ${m?.uid}` : `${m?.uid} + ${user?.uid}`);
    if (c) {
      id = user?.uid > c?.uid ? `${user?.uid} + ${c?.uid}` : `${c?.uid} + ${user?.uid}`;
      console.log(id);
    } else if (m) {
      id = user?.uid > m?.uid ? `${user?.uid} + ${m?.uid}` : `${m?.uid} + ${user?.uid}`;
      // console.log(m)
    }
    let unsub = onSnapshot(doc(db, 'lastMsg', id), (doc) => {
      setLast(doc.data());
      console.log(doc.data());
      // console.log(id)
    });
    return () => unsub();
  }, [c, m, user?.uid]);

  console.log(user);

  return (
    <Link to={`/chat/${c ? c?.uid : m?.uid}`}>
      <header className="bg-white p-4 flex gap-4 w-full">
        <div className="h-14 w-14 rounded-[50%] bg-gray-400" />
        <div className="text-gray-900 text-left flex-grow">
          <h3 className="flex items-center gap-2">
            {c ? c?.name : m?.name}{' '}
            <div
              className={`h-2 w-2 rounded-[50%] ${
                c ? (c?.isOnline ? 'bg-green-400' : 'bg-red-500') : m?.isOnline ? 'bg-green-400' : 'bg-red-500'
              }`}
            ></div>
          </h3>
          <div className="flex text-sm gap-2 w-full">
            {last && c && (
              <h1>
                <i>{last?.from === c?.uid ? `${c?.name}:` : 'You:'}</i>
              </h1>
            )}
            {last && m && (
              <h1>
                <i>{last?.from === m?.uid ? `${c?.name}:` : 'You:'}</i>
              </h1>
            )}
            {!last && <h2 className="text-sm">send a message to start chat</h2>}
            {last?.text && <h2 className="text-sm truncate flex-grow ">{last.text}</h2>}
            {last?.img && <h2>new image</h2>}
            {last?.from !== user.uid && last?.unread && <small className="bg-purp px-3 text-white rounded">New </small>}
          </div>
        </div>
      </header>
    </Link>
  );
};
