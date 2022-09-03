import React, { useEffect } from 'react';
import { Upload } from '../assets/Upload.jsx';
import { db, auth } from '../Firebase.js';
import {
  addDoc,
  collection,
  query,
  setDoc,
  doc,
  onSnapshot,
  Timestamp,
  orderBy,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { useContext } from 'react';
import { AuthContext } from '../context/Auth.js';
import { useState } from 'react';
import { storage } from '../Firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import send from '../assets/Send.svg';

export const MessageForm = ({ otherUser, setMsgs }) => {
  const [text, setText] = useState('');
  const { user, last, setLast } = useContext(AuthContext);
  const [img, setImg] = useState();

  // console.log(user, otherUser)

  useEffect(() => {
    const handleClick = async () => {
      const id = user?.uid > otherUser?.uid ? `${user?.uid} + ${otherUser?.uid}` : `${otherUser?.uid} + ${user?.uid}`;
      const msgRef = collection(db, 'messages', id, 'chat');
      const q = query(msgRef, orderBy('createdAt', 'asc'));
      onSnapshot(q, (querySnapShot) => {
        let msgs = [];
        querySnapShot.forEach((doc) => {
          msgs.push(doc.data());
        });
        setMsgs(msgs);
        //   console.log(msgs)
      });
      const docSnap = await getDoc(doc(db, 'lastMsg', id));
      if (docSnap.data() && docSnap.data().from !== user.uid) {
        await updateDoc(doc(db, 'lastMsg', id), { unread: false });
      }
    };
    handleClick();
  }, [otherUser?.uid, user?.uid]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = user.uid > otherUser.uid ? `${user.uid} + ${otherUser.uid}` : `${otherUser.uid} + ${user.uid}`;

    try {
      let url;
      if (img) { 
        const imgRef = ref(storage, `images/${new Date().getTime()} - ${img.name}`);
        const snap = await uploadBytes(imgRef, img);
        const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
        url = dlUrl;
      }
      await addDoc(collection(db, 'messages', id, 'chat'), {
        text: text,
        from: user.uid,
        to: otherUser.uid,
        createdAt: Timestamp.fromDate(new Date()),
        media: url || '',
      });


      setText('');

      await setDoc(doc(db, 'lastMsg', id), {
        text: text || 'New media',
        from: user.uid,
        to: otherUser.uid,
        createdAt: Timestamp.fromDate(new Date()),
        media: url || '',
        unread: true,
      });
     
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="flex items-center border bg-black  rounded-lg border-white m-2 p-3 justify-between gap-3 fixed bottom-0 w-[94%] md:w-[56%] lg:w-[57%]">
      <label htmlFor="img">
        <Upload />
      </label>
      <input
        onChange={(e) => {
          setImg(e.target.files[0]);
          
        }}
        type="file"
        id="img"
        accept="audio/*,video/*,image/*"
        className="hidden"
      />
      <div className="flex-1">
        <input
          type="text"
          placeholder="Enter message"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            // handleSubmit(e);
          }}
          className="w-full outline-none bg-inherit   "
        />
      </div>
      <div>
        <button onClick={(e) => handleSubmit(e)}>
          <img src={send} alt="send" className="h-6 w-6" />
        </button>
      </div>
    </form>
  );
};
