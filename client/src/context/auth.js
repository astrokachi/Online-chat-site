import React, {createContext, useEffect, useState } from "react";
import {onAuthStateChanged} from 'firebase/auth'
import { auth } from "../firebase";
import { db} from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export const AuthContext = createContext("")

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);



    useEffect(() => {
        onAuthStateChanged(auth, user => {
          setUser(user)
          setLoading(false)
        })
      }, []);
  
     
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
  }, [user]);


  if(loading){
    return 'Loading...'
    }


    return <AuthContext.Provider value={{user, users}}>{children}</AuthContext.Provider>
}

export default AuthProvider