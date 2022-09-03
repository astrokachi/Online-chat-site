import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import photo from '../assets/photo.svg';
import { Nav } from './Nav';
import { auth, db, storage } from '../firebase';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { getDoc, doc, updateDoc } from 'firebase/firestore';

export const Profile = () => {
  const [update, setUpdate] = useState(false);
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [img, setImg] = useState();
  const [user, setUser] = useState();
  // console.log(img);
  const [imgs, setImgs] = useState([]);
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(8);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    getDoc(doc(db, 'users', auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    });
    if (img) {
      const uploadImg = async () => {
        const imgRef = ref(storage, `avatar/${new Date().getTime()} - ${img.name}`);

        try {
          const snap = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));
          await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath,
          });
        } catch (error) {
          console.log(error);
        }
        setImg('');
      };
      uploadImg();
    }
    if (imgs) {
      const uploadImgs = () => {
        imgs.map(async (img, i) => {
          const imgRef = ref(storage, `others/${new Date().getTime()} - ${img.name}`);

          try {
            const snap = await uploadBytes(imgRef, img);
            const url = await getDownloadURL(ref(storage, snap.ref.fullPath));
            // console.log(url, i)
            await updateDoc(doc(db, 'users', auth.currentUser.uid), {
              [`images${i}`]: url,
              [`path${i}`]: snap.ref.fullPath,
            });
          } catch (error) {
            console.log(error);
          }
        });
        setImgs('');
      };
      uploadImgs();
    }
  }, [img, imgs]);

  // useEffect(() => {
  //   console.log(urls)
  //
  //     return urls
  //   })
  // }, [urls]);

  const updates = () => {
    const updateName = async () => {
      if (name) {
        try {
          await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            name: name,
          });
          console.log('done');
        } catch (error) {
          console.log(error);
        }
      }
    };

    const updateAbout = async () => {
      if (about) {
        try {
          await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            about: about,
          });
          console.log('done');
        } catch (error) {
          console.log(error);
        }
      }
    };

    updateName();
    updateAbout();
  };

  // console.log(user?.images)
  const updateImgs = (e) => {
    let tempImgs = user?.images ? [...user?.images] : [...imgs];
    console.log('count', count);
    console.log('temp', tempImgs);
    tempImgs[count] = e.target.files[0];
    setImgs(tempImgs);
  };

  // useEffect(() => {
  //   console.log('after', imgs);
  // }, [imgs])
  return (
    <div className="bg-gradient-to-b min-h-screen text-white md:px-14 sm:px-6 py-4 from-start text-center to-black">
      <Nav />
      <main className="bg-purp bg-opacity-10 h-max w-[90%] mb-8 mt-12 p-4 pb-24 mx-auto">
        <section className="text-gray-400 text-sm pt-4">Edit your profile</section>
        <div className="flex justify-center mt-3 ">
          <div className="w-full flex items-center flex-col   p-5">
            <div
              className="h-24 w-24 rounded-[50%] bg-gray-400  relative cursor-pointer"
              onMouseEnter={() => setUpdate(true)}
              onMouseLeave={() => setUpdate(false)}
            >
              {user?.avatar && <img src={user?.avatar || ''} alt="" className="h-24 w-24 rounded-[50%]" />}
              <div
                className={`h-24 w-24 rounded-[50%] bg-gray-900 opacity-5  absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]  ${
                  update ? 'block' : 'hidden'
                }`}
              ></div>
              <label htmlFor="phot">
                <img
                  src={photo}
                  alt="phot"
                  className={`h-9 absolute left-[50%] cursor-pointer top-[50%]  translate-x-[-50%] translate-y-[-50%] ${
                    update ? 'block' : 'hidden'
                  } `}
                />
              </label>
              <input
                type="file"
                id="phot"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div>

            <h3 className="text-sm  pt-4">{user?.name}</h3>
          </div>
        </div>

        <div className="w-full border-b mb-9 border-b-purp border-opacity-25 "></div>
        {edit ? (
          <form className="py-8 px-3 text-sm w-full">
            <div className="flex  max-w-xs items-center gap-5 w-max  mx-auto">
              <label htmlFor="name" className="text-gray-200 pb-2 ">
                Name
              </label>
              <textarea
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                name=""
                id="name"
                className="border-none max-h-[32px] min-h-[28px] outline-none max-w-[384px] w-96 bg-gray-300 rounded text-gray-800 px-2 py-1"
              />
            </div>
            <div className="flex  max-w-xs items-center gap-5 mx-auto pt-8 pb-9">
              <label htmlFor="name" className="text-gray-200 pb-2">
                About
              </label>
              <textarea
                onChange={(e) => setAbout(e.target.value)}
                value={about}
                type="text"
                name=""
                id="name"
                className="border-none outline-none bg-gray-300 rounded w-96 text-gray-800 px-2 py-1"
              />
            </div>
            <div className="flex justify-center gap-4">
              <button
                className="px-8 py-1 text-sm bg-purp bg-opacity-70 rounded-lg transition-all ease duration-200 hover:scale-95"
                onClick={() => setEdit(false)}
              >
                Back
              </button>
              <button
                className="px-8 py-2 text-sm bg-purp bg-opacity-70 rounded-lg transition-all ease duration-200 hover:scale-95"
                onClick={() => {
                  updates();
                  setEdit(false);
                }}
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <div className="">
            <div className="grid grid-cols-5 justify-center mb-4 gap-[2%] text-sm ">
              <p className="text-right">Name: </p>
              <h2 className="text-left" style={{ gridColumn: 'span 3' }}>
                {user?.name}
              </h2>
            </div>
            <div className="grid grid-cols-5 justify-center mb-4 gap-[2%] text-sm ">
              <p className="text-right">About: </p>
              <h2 className="text-left" style={{ gridColumn: 'span 3' }}>
                {!edit ? user?.about?.split('...')[0] || 'null' : ''}
              </h2>
            </div>

            <div className="flex justify-center">
              <button
                className="px-4 py-1 text-sm bg-purp rounded mb-9 transition-all ease duration-200 hover:scale-95"
                onClick={() => setEdit(true)}
              >
                Edit
              </button>
            </div>
          </div>
        )}

        <div className="w-full border-b border-b-purp border-opacity-25 mb-9"></div>

        <div>
          <header className="text-sm">Upload more pictures</header>
          <section className="flex justify-center items-center gap-3 px-6  pt-8 max-w-full flex-wrap ">
            {[...Array(number)].map((_, index) => {
              return (
                <div
                  key={index}
                  className={`${
                    user && user[`images${index}`]?.includes('undefined') && 'md:h-[120px] md:w-[25%] w-[47%] h-[100px]'
                  } ${
                    user && !user[`images${index}`]?.includes('undefined') && 'md:w-[35%] w-[47%] lg:w-[24%] h-[250px]'
                  } rounded bg-gray-400 relative`}
                >
                  {user && !user[`images${index}`]?.includes('undefined') && (
                    <img src={user[`images${index}`]} alt="" className="h-full w-full rounded" />
                  )}
                  <div>
                    <label htmlFor="photo">
                      <img
                        onClick={() => setCount(index)}
                        src={photo}
                        alt="phot"
                        className={`h-14 absolute left-[50%] bg-slate-600  bg-opacity-20 rounded-[50%] cursor-pointer top-[50%] px-3 py-3  translate-x-[-50%] translate-y-[-50%]`}
                      />
                    </label>
                    <input
                      type="file"
                      id="photo"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        updateImgs(e);
                        setNumber(0);
                        setNumber(8);
                      }}
                    />
                    {/* <h2 className='text-xs text-black font-medium absolute bottom-3 left-[50%] translate-x-[-50%] w-max'>Click to upload</h2> */}
                  </div>
                </div>
              );
            })}
          </section>
          <button
            className="px-8 py-2 mt-10 mx-auto text-sm bg-purp bg-opacity-70 rounded-lg transition-all ease duration-200 hover:scale-95"
            onClick={() => {
              updates();
              setEdit(false);
            }}
          >
            Save
          </button>
        </div>
      </main>
    </div>
  );
};
