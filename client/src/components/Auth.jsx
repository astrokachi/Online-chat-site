import React, { useEffect, useState } from 'react';
import { Input } from './Input';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { setDoc, doc, Timestamp, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';



const initialState = {
  name: '',
  password: '',
  confirm: '',
  email: '',
  error: null,
  loading: false,
};

export const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(true);
  const [isMatch, setIsMatch] = useState(true);
  // const [error, setError] = useState('');

  const navigate = useNavigate();

  // console.log(isSignup)

  const confirmPassword = (e) => {
    e.preventDefault();
    if (form.password === form.confirm) setIsMatch(true);
    else setIsMatch(false);

    if (isMatch) {
       handleSubmit(e);
    }
  };
  useEffect(() => {
    console.log(form);
  }, [form]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setForm({ ...form, error: null, loading: true });
    try {
      const result = await createUserWithEmailAndPassword(auth, form.email, form.password);
      // console.log(result.user);
      await setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        name: form.name,
        email: form.email,
        hhh: form.password,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true,
      });
      // const auth = getAuth();
      updateProfile(auth.currentUser, {
        displayName: form.name
      }).then(() => {
        // Profile updated!
        console.log('done')
        // ...
      }).catch((error) => {
        // An error occurred
        console.log(error)
        // ...
      });
      navigate('/');
      setForm({ name: '', email: '', password: '', error: null, loading: false });
    } catch (error) {
      setForm({ ...form, error: error.message, loading: false });
      // console.log(error);
    }
  };

  const handleSubmitLog = async (e) => {
    e.preventDefault();
    setForm({ ...form, error: null, loading: true });
    try {
      const result = await signInWithEmailAndPassword(auth, form.email, form.password);
      await updateDoc(doc(db, 'users', result.user.uid), { isOnline: true });
      console.log(result.user);
      navigate('/home');
      setForm({ name: '', email: '', password: '', error: null, loading: false });
    } catch (error) {
      setForm({ ...form, error: error.message, loading: false });
      console.log(error);
    }
  };

  return (
    <div className="h-full w-full">
      <div className="grid grid-flow-col md:grid-cols-2 p-0 m-0 h-screen w-full overflow-hidden">
        <div className="relative flex h-full w-full justify-center items-center bg-white">
          <div className={`py-10 px-14 div1 w-full absolute ${!isSignup ? 'open z-10' : 'close -z-10'} `}>
            <div>
              <header className="italiano text-purp text-5xl mb-12">RSangels</header>
              <h1 className="text-2xl font-medium pb-2">Log in.</h1>
              <p className="font-medium text-sm pb-7">
                Log in with your details that you used during the sign up process
              </p>

              <form className="">
                <div className="w-[68%]">
                  <Input title="email" placeholder="example@email.com" name="email" handleChange={handleChange} />
                  <Input
                    title="password"
                    type="password"
                    placeholder="password"
                    name="password"
                    handleChange={handleChange}
                  />
                  {form.error && <p className="text-red-300 text-xs">{form.error.split(':')[1]}</p>}
                </div>
                {/* <Link to="/home"> */}
                <button
                  onClick={(e) => {
                    handleSubmitLog(e);
                  }}
                  className="outline-none border-none  bg-purp w-full py-2 text-white rounded-[10px] mt-24"
                >
                  Log in
                </button>
                {/* </Link> */}
              </form>
            </div>

            <h4 className="text-sm text-center p-2 pt-4">
              Don't have an account?{' '}
              <span className="text-purp cursor-pointer" onClick={() => setIsSignup(true)}>
                Sign up
              </span>
            </h4>
            <h4 className="text-purp text-sm text-center ">Forgot Password?</h4>
          </div>
          {/* : */}
          <div className={`py-10 px-14 h-max div w-full absolute  ${isSignup ? 'open z-10' : 'close -z-10'} `}>
            <div className="">
              <header className="italiano text-purp text-5xl mb-12">RSangels</header>
              <h1 className="text-2xl font-medium pb-2">Sign up.</h1>
              <p className="font-medium text-sm pb-7">Enter with your details to sign up.</p>
              <form
                onSubmit={(e) => {
                  confirmPassword(e);
                }}
                onChange={(e) => handleChange(e)}
                className=""
              >
                <div className="">
                  <div className="flex justify-between w-full gap-[15%]">
                    <Input title="username" placeholder="John" name={'name'} share handleChange={handleChange} />
                    <Input
                      title="email"
                      placeholder="example@email.com"
                      name={'email'}
                      handleChange={handleChange}
                      type="email"
                      share
                    />
                  </div>
                  <Input
                    title="password"
                    type="password"
                    placeholder="password"
                    name={'password'}
                    handleChange={handleChange}
                  />
                  <Input
                    title="confirm password"
                    type="password"
                    placeholder="password"
                    name={'confirm'}
                    handleChange={handleChange}
                  />
                  {!isMatch && <p className="text-xs">Passwords don't match</p>}
                </div>
                {/* <Link to="/home"> */}
                <button
                  className="outline-none border-none text-white bg-purp w-full py-2  rounded-[10px] mt-10"
                  disabled={form.loading}
                >
                  Sign up
                </button>
                {/* </Link> */}
              </form>
            </div>

            <h4 className="text-sm text-center p-2 pt-4">
              Already have an account?{' '}
              <span className="text-purp cursor-pointer" onClick={() => setIsSignup(false)}>
                Log in
              </span>
            </h4>
            <h4 className="text-purp text-sm text-center">Forgot Password?</h4>
          </div>
        </div>

        {/* } */}
        <section className="bg-gradient-to-b h-screen via-end from-start to-end relative hidden md:block">
          {/* <img src="" alt="" /> */}
        </section>
      </div>
    </div>
  );
};
