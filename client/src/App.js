import React, { useContext, useState } from 'react';
import { Routes, Route } from "react-router-dom";
// import { Chatter }from './components/Chatter';
import { Auth } from './components/Auth';
import Cookies from 'universal-cookie';
import { StreamChat } from 'stream-chat';
import 'stream-chat-react/dist/css/index.css'
// import './App.css'
import {  Initial } from './pages/Initial';
import { Home } from './pages/Home';
import { HomePage } from './pages/HomePage';
import { Chat } from './pages/Chat';
import AuthProvider, { AuthContext } from './context/auth';
import { PrivateRoute } from './components/PrivateRoute';
import Chats from './component/Chats';
import { Profile } from './component/Profile';
import { Book } from './pages/Book';




function App() {
  // if(!authToken) return <Auth />
  // const [ouser, setouser]

   return (
    <div className='con bg-gradient-to-b from-start  to-black'>
      <div className='app'>

    <AuthProvider >
    <Routes>
      <Route path='/login' element={<Auth />} />
      <Route path='/chat/:id' element={<PrivateRoute> <Chat  /> </PrivateRoute>} />
      <Route path='/' element={<Initial /> } />
      <Route path='/landing' element={<Home />} />
      <Route path='/home' element={<HomePage />} />
      <Route path='/chats' element={<PrivateRoute><Chats /></PrivateRoute>} />
      <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path='/book/:id' element={<PrivateRoute> <Book /> </PrivateRoute>} />
    </Routes>
    </AuthProvider>
      </div>
    </div>
  );
}


export default App;
