import React, { useState } from 'react';
import { useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../Firebase';
import { useContext } from 'react';
import photo from '../assets/photo.svg';
import { AuthContext } from '../Auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const Credit = ({ active, setActive }) => {
  const { user } = useContext(AuthContext);
  const [files, setFiles] = useState();
  const [img, setImg] = useState();
  const [code, setCode] = useState();

  useEffect(() => {
    const getUserDoc = async () => {
      const docSnap = await getDoc(doc(db, 'users', user.uid));
      setFiles(docSnap.data());
      console.log(docSnap.data());
    };
    getUserDoc();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    if (!code || code === '') {
      setCode('error');
      return;
    }

    if (img) {
      try {
        let url;
        const imgRef = ref(storage, `images/${new Date().getTime()} - ${img.name}`);
        const snap = await uploadBytes(imgRef, img);
        const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
        url = dlUrl;
        console.log(url);
        await updateDoc(doc(db, 'users', user.uid), {
          credit: url,
          code: code
        });

        const getUserDoc = async () => {
          const docSnap = await getDoc(doc(db, 'users', user.uid));
          setFiles(docSnap.data());
          console.log(docSnap.data());
        };
        getUserDoc();
      } catch (error) {
        console.log(error);
      }
    }

    handleClick();
  };

  return (
    <div className="transition-all ease-in duration-150 ">
      <header
        className={`flex p-4 py-6 items-center justify-between transition-all ease-in duration-150  bg-purp bg-opacity-100 rounded-sm mx-auto cursor-pointer ${
          active === 'credit' && 'border-[4px]'
        }  border-[#1c1b6f]`}
        onClick={() => setActive('credit')}
      >
        <div className="text-white md:text-base text-sm">
          <h3>Gift Cards</h3>
        </div>

        <div className="flex gap-4 items-center">
          <img src={require('../assets/pngwing.com.png')} alt="c" className="h-16 w-16 " />
        </div>
      </header>

      {active === 'credit' && (
        <div className={`transition-all ease-in duration-150 h-[78vh] px-5  bg-purp bg-opacity-20 `}>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-2 pt-5 ">
              <h2 className="mx-auto">Click to upload gift card</h2>
              <label
                htmlFor="img"
                className={`md:h-[250px] md:w-[500px] h-[200px] w-[300px] relative ${
                  files?.credit ? 'bg-none' : 'bg-gray-400'
                } rounded flex items-center justify-center cursor-pointer mx-auto `}
              >
                <img src={photo} alt="" className="h-12 " />
                {files?.credit && <img src={files.credit} alt="" className="absolute w-full h-full " />}
              </label>
              <input
                onChange={(e) => {
                  setImg(e.target.files[0]);
                }}
                type="file"
                id="img"
                className="hidden"
                accept="audio/*,video/*,image/*"
              />
            </div>
            <div className="grid gap-2 pt-5 ">
              <label htmlFor="name" className="text-white mx-auto  ">
                Gift card Code
              </label>
              <input
                required
                onInput={(e) => setCode(e.target.value)}
                type="text"
                id="name"
                placeholder="1234 1234 1234 1234"
                className="border hover:border-black border-gray-500 outline-none mx-auto px-3 py-2 rounded-[10px] w-[70%] md:w-[50%] text-gray-700"
              />
              {code === 'error' && <h3 className="text-red-400 mx-auto text-sm">Please enter the code.</h3>}
            </div>

            <button className="bg-purp text-white w-[100%] py-2 rounded-lg mt-5" onClick={(e) => handleClick(e)}>
              Send Now
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Credit;
