import React, { useState } from 'react';
import { Input } from './Input';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const initialState = {
  name: '',
  password: '',
  confirm: '',
  email: '',
};

// adrianhajdin

export const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [isMatch, setIsMatch] = useState(true);


  const confirmPassword = (e) => {
    e.preventDefault();
    if (form.password === form.confirm) setIsMatch(true);
    else setIsMatch(false);

    if (isMatch) {
      handleSubmit(e);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, password, email } = form;

    const URL = 'http://localhost:5000/auth';

    const {
      data: { token, userId, hashedPassword },
    } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
      name,
      password,
      email,
    });

    cookies.set('token', token);
    cookies.set('name', name);
    cookies.set('userId', userId);
    cookies.set('email', email);

    if (isSignup) {
      cookies.set('hashedPassword', hashedPassword);
    }

    window.location.reload();
  };

  return (
    <div className="h-full w-full">
      <div className="grid grid-flow-col grid-cols-2 p-0 m-0 h-screen w-full overflow-hidden">
        {/* {isSignup ?  */}
        <div className="relative flex h-full w-full justify-center items-center ">
          <div className={`py-10 px-14 div1 w-full absolute ${!isSignup ? 'open z-10' : 'close -z-10'} `}>
            <div>
              <header className="italiano text-purp text-5xl mb-12">RSangels</header>
              <h1 className="text-2xl font-medium pb-2">Log in.</h1>
              <p className="font-medium text-sm pb-7">
                Log in with your details that you used during the sign up process
              </p>

              {/* <Input title='name' placeholder='John'  /> */}
              <form
                onSubmit={(e) => {
                  confirmPassword(e);
                }}
                onChange={(e) => handleChange(e)}
                className=""
              >
                <div className="w-[68%]">
                  <Input title="email" placeholder="John" name="email" handleChange={handleChange} />
                  <Input title="password" placeholder="password" name="password" handleChange={handleChange} />
                </div>
                <button className="outline-none border-none bg-purp w-full py-2 text-white rounded-[10px] mt-24">
                  Log in
                </button>
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
                    <Input title="username" placeholder="John" name={'name'} handleChange={handleChange} share />
                    <Input
                      title="email"
                      placeholder="example@email.com"
                      name={'email'}
                      handleChange={handleChange}
                      share
                    />
                  </div>
                  <Input title="password" placeholder="password" name={'password'} handleChange={handleChange} />
                  <Input title="confirm password" placeholder="password" name={'confirm'} handleChange={handleChange} />
                  {!isMatch && <p className="text-xs">Passwords don't match</p>}
                </div>
                <button className="outline-none border-none bg-purp w-full py-2 text-white rounded-[10px] mt-10">
                  Sign up
                </button>
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
        <section className="bg-gradient-to-b h-screen via-end from-start to-end relative">
          {/* <img src="" alt="" /> */}
        </section>
      </div>
    </div>
  );
};
