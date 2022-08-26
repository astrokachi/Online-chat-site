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




function App() {
  // if(!authToken) return <Auth />
  // const [ouser, setouser]

   return (
    <AuthProvider >
    <Routes>
      <Route path='/login' element={<Auth />} />
      <Route path='/chat/:id' element={<Chat  />} />
      <Route path='/' element={<PrivateRoute><Initial /></PrivateRoute> } />
      <Route path='/landing' element={<Home />} />
      <Route path='/home' element={<PrivateRoute><HomePage /></PrivateRoute>} />
    </Routes>
    </AuthProvider>
  );
}


export default App;
