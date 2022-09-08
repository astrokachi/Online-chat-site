import React, { useContext } from 'react';
import { Routes, Route } from "react-router-dom";
// import { Chatter }from './components/Chatter';
import { Auth } from './components/Auth';

import 'stream-chat-react/dist/css/index.css'
// import './App.css'
import {  Initial } from './pages/Initial';
import { Home } from './pages/Home';
import { HomePage } from './pages/HomePage';
import { Chat } from './pages/Chat';
import AuthProvider, { AuthContext } from './Auth';
import { PrivateRoute } from './components/PrivateRoute';
import Chats from './component/Chats';
import { Profile } from './component/Profile';
import { Book } from './pages/Book';
import { ProfileClient } from './component/ProfileClient';
import Policy from './pages/Policy';
import Privacy from './pages/Privacy';
import { Terms } from './pages/Terms';
import DCMA from './pages/DCMA';
import Billing from './pages/Billing';



function App() {

 
   return (
    <div className='con bg-gradient-to-b from-start  to-black'>
      <div className={`app `}>

    <AuthProvider >
    <Routes>
      <Route path='/login' element={<Auth />} />
      <Route path='/chat/:id' element={<PrivateRoute> <Chat  /> </PrivateRoute>} />
      <Route path='/' element={<Initial /> } />
      <Route path='/landing' element={<Home />} />
      <Route path='/home' element={<HomePage />} />
      <Route path='/2257' element={<Policy />} />
      <Route path='/privacy' element={<Privacy />} />
      <Route path='/terms' element={<Terms />} />
      <Route path='/DCMA' element={<DCMA />} />
      <Route path='/support/billing' element={<Billing />} />
      <Route path='/models/:pref' element={<HomePage />} />
      <Route path='/chats' element={<PrivateRoute><Chats /></PrivateRoute>} />
      <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path='/book/:id' element={<PrivateRoute> <Book /> </PrivateRoute>} />
      <Route path='/:id/profile' element={<PrivateRoute> <ProfileClient /> </PrivateRoute>} />
    </Routes>
    </AuthProvider>
      </div>
    </div>
  );
}


export default App;
