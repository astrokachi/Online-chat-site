import React, {createContext, useEffect, useState } from "react";
import {onAuthStateChanged, updateProfile} from 'firebase/auth'
import { auth } from "../firebase";
import { db} from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import DotLoader from "react-spinners/DotLoader";

export const AuthContext = createContext("")

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [isActive, setIsActive] = useState('home');





    useEffect(() => {
        onAuthStateChanged(auth, user => {
          setUser(user)
          setLoading(false)
        })
      }, []);
  
      // console.log("current", auth.currentUser)
     
  useEffect(() => {
    if(user){
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('uid', 'not-in', [auth.currentUser.uid]));
        const unsub = onSnapshot(q, (querysnapshot) => {
          let users = [];
          querysnapshot.forEach((doc) => {
           users.push(doc.data());
          });
          setUsers(users);
        });
        return () => unsub();
    }
    if(!user){
      const usersRef = collection(db, 'users');
        const q = query(usersRef);
        const unsub = onSnapshot(q, (querysnapshot) => {
          let users = [];
          querysnapshot.forEach((doc) => {
           users.push(doc.data());
          });
          setUsers(users);
        });
        return () => unsub();
    }
  }, [user]);


  if(loading){
    return <div className="h-screen bg-gradient-to-b min-h-screen relative text-white p-4 from-start text-center to-black">
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
        <DotLoader color={'#1B1A6C'} loading={loading} speedMultiplier={2}  size={100} />
      </div>
      </div>
    }


    return <AuthContext.Provider value={{user, users, isActive, setIsActive}}>{children}</AuthContext.Provider>
}

export default AuthProvider