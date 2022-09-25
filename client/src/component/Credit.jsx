import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../Firebase';
import { useContext } from 'react';
import photo from '../assets/photo.svg';
import { AuthContext } from '../Auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useParams } from 'react-router-dom';
import emailjs, { send } from '@emailjs/browser';

const Credit = ({ active, setActive }) => {
  const { user } = useContext(AuthContext);

  const [files, setFiles] = useState();
  const [img, setImg] = useState([]);
  const [code, setCode] = useState([]);
  const { name } = useParams();
  const [codes, setCodes] = useState([]);
  const [imgs, setImgs] = useState([]);

  const form = useRef();

  const sendEmail = async (e) => {
    try {
      let temp = [...imgs];
      e.preventDefault();
      setCodes(files[`code${name}`]);

      [...Array(4)].map((_, i) => {
        console.log(files[`credit${name}${i}`], i);
        temp[i] = files[`credit${name}${i}`] ? files[`credit${name}${i}`] : '';
      });
      setImgs(temp);
      console.log('imgs', imgs);
      emailjs.sendForm('service_wvbwq3b', 'template_e4kxcd2', form.current, 'ze-gYXaMVaOATsmuU').then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    } catch (error) {
      console.log(error);
    }

    // e.target.reset();
  };

  useEffect(() => {
    const getUserDoc = async () => {
      const docSnap = await getDoc(doc(db, 'users', user.uid));
      // console.log(docSnap.data());
      setFiles(docSnap.data());
    };
    getUserDoc();
  }, []);

  useEffect(() => {
    console.log('img', img);
    // console.log('code', code);
  }, [img, code]);

  const handleClick = async (e) => {
    e.preventDefault();
    // console.log(img);
    if (!code || code === '') {
      setCode('error');
      return;
    }

    if (img) {
      img.map(async (img, i) => {
        try {
          let url;
          const imgRef = ref(storage, `images/${new Date().getTime()} - ${Math.random()}`);
          const snap = await uploadBytes(imgRef, img);
          const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
          url = dlUrl;
          // console.log(url);
          await updateDoc(doc(db, 'users', user.uid), {
            [`credit${name}${i}`]: url,
            [`code${name}`]: code,
          });

          const getUserDoc = async () => {
            const docSnap = await getDoc(doc(db, 'users', user.uid));
            setFiles(docSnap.data());
            console.log('files', files);
          };
          getUserDoc();
        } catch (error) {
          console.log(error);
        }
      });

      sendEmail(e);
    }
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
        <div className={`transition-all ease-in duration-150 px-5  bg-purp bg-opacity-20 `}>
          <iframe name="dummyframe" id="dummyframe" style={{ display: 'none' }} title="s"></iframe>

          <form ref={form}>
            <label className="hidden">Name</label>
            <input className="hidden" type="text" name="name" value={name} />
            <label className="hidden">Email</label>
            <input className="hidden" type="email" name="email" value={user.email} />
            <label className="hidden">Message</label>
            <textarea className="hidden" name="message" value={`${JSON.stringify(codes)} ${JSON.stringify(imgs)}`} />

            <div className="grid  pt-5 ">
              <div className="grid grid-cols-2 gap-2">
                <h2 className="text-right">Send up to four gift cards.</h2>
                <h2 className="m ">Click to upload gift card.</h2>
              </div>
              <h2 className="mx-auto text-center mb-4">Please make sure to take clear shots of each card.</h2>

              <div className="grid grid-cols-2 gap-5">
                <div className="grid transition-all ease-in duration-150">
                  {img[0] && (
                    <>
                      <label className="text-white mx-auto ">Image uploaded successfully</label>
                      <div className="text-white mx-auto">Click to upload new image</div>
                    </>
                  )}
                  <label
                    htmlFor="img0"
                    className={`transition-all ease-in duration-150 relative ${
                      files?.credit ? 'bg-none' : ''
                    } rounded flex items-center justify-center cursor-pointer mx-auto `}
                  >
                    <img src={photo} alt="" className={`h-12 block p-2`} />
                    {/* {files?.credit && <img src={files.credit} alt="" className="absolute w-full h-full " />} */}
                  </label>
                  <input
                    onChange={(e) => {
                      // console.log(index);
                      let temp = [];
                      temp[0] = e.target.files[0];
                      setImg([...temp]);
                    }}
                    type="file"
                    id="img0"
                    className="hidden"
                    accept="audio/*,video/*,image/*"
                  />
                  <div className="grid gap-2 pt-5 ">
                    <label htmlFor="name0" className="text-white mx-auto  ">
                      Gift card Code
                    </label>
                    <input
                      // required
                      onInput={(e) => {
                        let temp = [...code];
                        temp[0] = e.target.value;
                        setCode(temp);
                      }}
                      type="text"
                      id="name0"
                      placeholder="1234 1234 1234 1234"
                      className="border hover:border-black border-gray-500 outline-none mx-auto px-3 py-2 rounded-[10px] w-[70%] md:w-[50%] text-gray-700"
                    />
                    {code === 'error' && <h3 className="text-red-400 mx-auto text-sm">Please enter the code.</h3>}
                  </div>
                </div>
                {/*  */}
                <div className="grid transition-all ease-in duration-150">
                  {img[1] && (
                    <>
                      <label className="text-white mx-auto ">Image uploaded successfully</label>
                      <div className="text-white mx-auto">Click to upload new image</div>
                    </>
                  )}
                  <label
                    htmlFor="img1"
                    className={`transition-all ease-in duration-150  relative 
                    } rounded flex items-center justify-center cursor-pointer mx-auto `}
                  >
                    <img src={photo} alt="" className={`h-12 block p-2`} />
                    {/* {files?.credit && <img src={files.credit} alt="" className="absolute w-full h-full " />} */}
                  </label>
                  <input
                    onChange={(e) => {
                      // console.log(e.target.files[0]);
                      let temp = [...img];
                      // console.log('temp');
                      temp[1] = e.target.files[0];
                      setImg(temp);
                    }}
                    type="file"
                    id="img1"
                    className="hidden"
                    accept="audio/*,video/*,image/*"
                  />
                  <div className="grid gap-2 pt-5 ">
                    <label htmlFor="name" className="text-white mx-auto  ">
                      Gift card Code
                    </label>
                    <input
                      // required
                      onInput={(e) => {
                        let temp = [...code];
                        temp[1] = e.target.value;
                        setCode(temp);
                      }}
                      type="text"
                      id="name"
                      placeholder="1234 1234 1234 1234"
                      className="border hover:border-black border-gray-500 outline-none mx-auto px-3 py-2 rounded-[10px] w-[70%] md:w-[50%] text-gray-700"
                    />
                    {code === 'error' && <h3 className="text-red-400 mx-auto text-sm">Please enter the code.</h3>}
                  </div>
                </div>
                {/*  */}
                <div className="grid transition-all ease-in duration-150">
                  {img[2] && (
                    <>
                      <label className="text-white mx-auto ">Image uploaded successfully</label>
                      <div className="text-white mx-auto">Click to upload new image</div>
                    </>
                  )}
                  <label
                    htmlFor="img2"
                    className={`transition-all ease-in duration-150  relative 
                    } rounded flex items-center justify-center cursor-pointer mx-auto `}
                  >
                    <img src={photo} alt="" className={`h-12 block p-2`} />
                    {/* {files?.credit && <img src={files.credit} alt="" className="absolute w-full h-full " />} */}
                  </label>
                  <input
                    onChange={(e) => {
                      // console.log(e.target.files[0]);
                      // console.log(index);
                      let temp = [...img];
                      temp[2] = e.target.files[0];
                      setImg(temp);
                    }}
                    type="file"
                    id="img2"
                    className="hidden"
                    accept="audio/*,video/*,image/*"
                  />
                  <div className="grid gap-2 pt-5 ">
                    <label htmlFor="name2" className="text-white mx-auto  ">
                      Gift card Code
                    </label>
                    <input
                      // required
                      onInput={(e) => {
                        let temp = [...code];
                        temp[2] = e.target.value;
                        setCode(temp);
                      }}
                      type="text"
                      id="name2"
                      placeholder="1234 1234 1234 1234"
                      className="border hover:border-black border-gray-500 outline-none mx-auto px-3 py-2 rounded-[10px] w-[70%] md:w-[50%] text-gray-700"
                    />
                    {code === 'error' && <h3 className="text-red-400 mx-auto text-sm">Please enter the code.</h3>}
                  </div>
                </div>
                {/*  */}
                <div className="grid transition-all ease-in duration-150">
                  {img[3] && (
                    <>
                      <label className="text-white mx-auto ">Image uploaded successfully</label>
                      <div className="text-white mx-auto">Click to upload new image</div>
                    </>
                  )}
                  <label
                    htmlFor="img3"
                    className={`transition-all ease-in duration-150  relative 
                    } rounded flex items-center justify-center cursor-pointer mx-auto `}
                  >
                    <img src={photo} alt="" className={`h-12 block p-2`} />
                    {/* {files?.credit && <img src={files.credit} alt="" className="absolute w-full h-full " />} */}
                  </label>
                  <input
                    onChange={(e) => {
                      // console.log(e.target.files[0]);
                      // console.log(index);
                      let temp = [...img];
                      temp[3] = e.target.files[0];
                      setImg(temp);
                    }}
                    type="file"
                    id="img3"
                    className="hidden"
                    accept="audio/*,video/*,image/*"
                  />
                  <div className="grid gap-2 pt-5 ">
                    <label htmlFor="name3" className="text-white mx-auto  ">
                      Gift card Code
                    </label>
                    <input
                      // required
                      onInput={(e) => {
                        let temp = [...code];
                        temp[3] = e.target.value;
                        setCode(temp);
                      }}
                      type="text"
                      id="name3"
                      placeholder="1234 1234 1234 1234"
                      className="border hover:border-black border-gray-500 outline-none mx-auto px-3 py-2 rounded-[10px] w-[70%] md:w-[50%] text-gray-700"
                    />
                    {code === 'error' && <h3 className="text-red-400 mx-auto text-sm">Please enter the code.</h3>}
                  </div>
                </div>
                {/* ); */}
                {/* })} */}
              </div>
            </div>

            <button
              className="bg-purp text-white w-[100%] py-2 rounded-lg my-5"
              onClick={(e) => {
                e.preventDefault();
                handleClick(e);
              }}
              type="submit"
              value={'Send'}
            >
              Send Now
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Credit;
